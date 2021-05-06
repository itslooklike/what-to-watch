import { makeAutoObservable, runInAction } from 'mobx'

import { api } from '~/utils/api'
import { IFilm } from '~/store/FilmsStore/types'

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
    const newFilm = await FavoriteStore.changeStatus(id, 1)
    this.updateList(newFilm)
  }

  async remove(id: number) {
    const newFilm = await FavoriteStore.changeStatus(id, 0)
    this.updateList(newFilm)
  }
}
