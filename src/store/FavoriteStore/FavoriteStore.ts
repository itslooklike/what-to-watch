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
}
