import { makeAutoObservable, runInAction } from 'mobx'

import { api } from '~/utils/api'
import type { IStore } from '~/store'
import type { IComment, ICommentAdd } from './types'

interface ICommentsStoreData {
  [_: number]: IComment[]
}

export class CommentsStore {
  rootStore

  loading = false

  data: ICommentsStoreData = {}

  error = null

  constructor(initialData: Partial<CommentsStore> = {}, rootStore: IStore) {
    makeAutoObservable(this, { rootStore: false })
    this.rootStore = rootStore
    this.data = initialData.data || {}
  }

  hydrate() {
    return {
      data: this.data,
    }
  }

  async fetchComments(filmId: number) {
    this.loading = true

    try {
      const { data } = await api.get<IComment[]>(`/comments/${filmId}`)

      runInAction(() => {
        this.loading = false
        this.error = null
        this.data[filmId] = data
      })
    } catch (error: any) {
      runInAction(() => {
        this.loading = false
        this.error = error
      })
    }
  }

  async addComment(filmId: number, comment: ICommentAdd) {
    this.loading = true

    try {
      const { data } = await api.post<IComment[]>(`/comments/${filmId}`, comment)

      runInAction(() => {
        this.loading = false
        this.error = null
        this.data[filmId] = data
      })
    } catch (error: any) {
      runInAction(() => {
        this.loading = false
        this.error = error
      })
    }
  }

  getComment(filmId: number) {
    return this.data[filmId]
  }
}
