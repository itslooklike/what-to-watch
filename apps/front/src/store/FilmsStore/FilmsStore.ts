import { makeAutoObservable, runInAction } from 'mobx'
import { gql } from 'graphql-request'
import { graphQLClient } from '~/utils/api'
import type { IStore } from '~/store'
import { FilmFragment } from '~/store/gql'
import type { IFilm } from './types'

const queryFilms = gql`
  ${FilmFragment}
  query films {
    films {
      ...FilmFragment
    }
  }
`

export class FilmsStore {
  rootStore

  loading = false

  data: IFilm[] = []

  error = null

  constructor(initialData: Partial<FilmsStore> = {}, rootStore: IStore) {
    makeAutoObservable(this, { rootStore: false })
    this.rootStore = rootStore
    this.data = initialData.data || []
  }

  hydrate() {
    return {
      data: this.data,
    }
  }

  async fetchFilms() {
    this.loading = true

    try {
      const { films } = await graphQLClient.request(queryFilms)

      runInAction(() => {
        this.loading = false
        this.error = null
        this.data = films
      })
    } catch (error: any) {
      console.log('💥 fetchFilms', error)
      runInAction(() => {
        this.loading = false
        this.error = error
      })
    }
  }

  update(newFilm: IFilm) {
    const filmIndex = this.data.findIndex((film) => film.id === newFilm.id)
    this.data[filmIndex] = newFilm
  }

  get filmGenres() {
    return Array.from(new Set(this.data.map((item) => item.genre?.name)))
  }

  get films() {
    return this.data
  }

  get firstFilm() {
    return this.data[0]
  }

  selectFilmsByGenre(genre: string) {
    if (genre) {
      return this.data.filter((film) => film.genre?.name === genre)
    }

    return this.data
  }

  selectFilmById(id: string) {
    return this.data.find((film) => film.id === id)
  }

  selectLikeThis(currentFilm: IFilm) {
    return this.data.filter(
      (film) => film.genre?.name === currentFilm.genre?.name && film.id !== currentFilm.id
    )
  }
}
