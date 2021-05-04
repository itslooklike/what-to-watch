import { makeAutoObservable, runInAction } from 'mobx'
import { api } from '../../services/api'
import { IFilm, TGenre } from './types'

export class FilmsStore {
  loading = false
  data: IFilm[] = []
  error: any = null

  constructor(initialData: Partial<FilmsStore> = {}) {
    makeAutoObservable(this)
    this.data = initialData.data || []
  }

  hydrate() {
    return {
      data: this.data,
      // error: this.error,
    }
  }

  async fetchFilms() {
    return api.get<IFilm[]>('/films')
  }

  async getFilms() {
    this.loading = true

    try {
      const { data } = await this.fetchFilms()

      runInAction(() => {
        this.loading = false
        this.error = null
        this.data = data
      })
    } catch (error) {
      runInAction(() => {
        this.loading = false
        this.error = error
      })
    }
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
