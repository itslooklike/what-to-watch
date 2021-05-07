import { makeAutoObservable, runInAction } from 'mobx'

import { api } from '~/utils/api'
import { IComment, ICommentAdd } from './types'

interface ICommentsStoreData {
  [_: number]: IComment[]
}

export class CommentsStore {
  loading = false

  data: ICommentsStoreData = {}

  error = null

  constructor(initialData: Partial<CommentsStore> = {}) {
    makeAutoObservable(this)
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
    } catch (error) {
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
    } catch (error) {
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
