import { makeAutoObservable, runInAction } from 'mobx'
import { gql } from 'graphql-request'

import { graphQLClient } from '~/utils/api'
import type { IStore } from '~/store'
import type { IFilm } from '~/store/FilmsStore'

export class FavoriteStore {
  rootStore

  loading = false

  loadingUpdate = false

  data: IFilm[] = []

  error = null

  constructor(initialData: Partial<FavoriteStore> = {}, rootStore: IStore) {
    makeAutoObservable(this, { rootStore: false })
    this.rootStore = rootStore
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
      // const { data } = await api.get<IFilm[]>('/favorite')
      // runInAction(() => {
      //   this.loading = false
      //   this.error = null
      //   this.data = data
      // })
    } catch (error: any) {
      runInAction(() => {
        this.loading = false
        this.error = error
      })
    }
  }

  private static async changeStatus(id: number, status: 0 | 1) {
    // const { data } = await api.post<IFilm>(`/favorite/${id}/${status}`)
    const data = { id, status }

    return data
  }

  private updateList(newFilm: IFilm) {
    const filmIndex = this.data.findIndex((film) => film.id === newFilm.id)
    this.data[filmIndex] = newFilm
    this.rootStore.filmsStore.update(newFilm)
    this.loadingUpdate = false
  }

  async add(id: number) {
    this.loadingUpdate = true
    const newFilm = await FavoriteStore.changeStatus(id, 1)
    this.updateList(newFilm)
  }

  async remove(id: number) {
    this.loadingUpdate = true
    const newFilm = await FavoriteStore.changeStatus(id, 0)
    this.updateList(newFilm)
  }
}
