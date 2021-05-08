import { makeAutoObservable, runInAction } from 'mobx'

import { api } from '~/utils/api'
import type { IStore } from '~/store'
import type { IFilm, TGenre } from './types'

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
      const { data } = await api.get<IFilm[]>('/films')

      runInAction(() => {
        this.loading = false
        this.error = null
        this.data = data
      })
    } catch (error) {
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
    return Array.from(new Set(this.data.map((item) => item.genre)))
  }

  get films() {
    return this.data
  }

  get firstFilm() {
    return this.data[0]
  }

  selectFilmsByGenre(genre: TGenre) {
    if (genre) {
      return this.data.filter((film) => film.genre === genre)
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
