import { makeAutoObservable, runInAction } from 'mobx'

import { api } from '~/utils/api'
import type { IFilm } from '~/store/FilmsStore'

export class FavoriteStore {
  loading = false

  data: IFilm[] = []

  error = null

  constructor(initialData: Partial<FavoriteStore> = {}) {
    makeAutoObservable(this)
    this.data = initialData.data || []
  }

  hydrate() {
    return {
      data: this.data,
    }
  }

  async fetchFavorite() {
    this.loading = true

    try {
      const { data } = await api.get<IFilm[]>('/favorite')

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

  private static async changeStatus(id: number, status: 0 | 1) {
    const { data } = await api.post<IFilm>(`/favorite/${id}/${status}`)
    return data
  }

  private updateList(newFilm: IFilm) {
    const filmIndex = this.data.findIndex((film) => film.id === newFilm.id)
    this.data[filmIndex] = newFilm
  }

  async add(id: number) {
    this.loading = true
    const newFilm = await FavoriteStore.changeStatus(id, 1)
    this.updateList(newFilm)

    runInAction(() => {
      this.loading = false
    })
  }

  async remove(id: number) {
    this.loading = true
    const newFilm = await FavoriteStore.changeStatus(id, 0)
    this.updateList(newFilm)

    runInAction(() => {
      this.loading = false
    })
  }
}
