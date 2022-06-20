import { makeAutoObservable, runInAction } from 'mobx'
import { gql } from 'graphql-request'
import { graphQLClient } from '~/utils/api'
import type { IStore } from '~/store'
import type { IFilm } from './types'

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
      const queryFilms = gql`
        query films {
          films {
            id
            name
            description
            released
            backgroundColor
            rating
            scoresCount
            director
            videoLink
            videoPreviewLink
            runTime
            genre {
              id
              name
            }
            starring {
              id
              name
            }
            imagePoster {
              url
            }
            imagePreview {
              url
            }
            imageBackground {
              url
            }
          }
        }
      `

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
    return Array.from(new Set(this.data.map((item) => item.genre.name)))
  }

  get films() {
    return this.data
  }

  get firstFilm() {
    return this.data[0]
  }

  selectFilmsByGenre(genre: string) {
    if (genre) {
      return this.data.filter((film) => film.genre.name === genre)
    }

    return this.data
  }

  selectFilmById(id: number | string) {
    return this.data.find((film) => film.id === (typeof id === 'string' ? +id : id))
  }

  selectLikeThis(currentFilm: IFilm) {
    return this.data.filter(
      (film) => film.genre === currentFilm.genre && film.id !== currentFilm.id
    )
  }
}
