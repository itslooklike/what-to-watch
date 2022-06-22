import { makeAutoObservable, runInAction } from 'mobx'
import { gql } from 'graphql-request'

import { graphQLClient, api } from '~/utils/api'
import type { IStore } from '~/store'
import type { IComment, ICommentAdd } from './types'

const queryCommentsById = gql`
  query comments($id: ID!) {
    comments(where: { film: { id: { equals: $id } } }) {
      id
      comment
      rating
      date
      user {
        name
      }
    }
  }
`

export class CommentsStore {
  rootStore

  loading = false

  data: Record<string, IComment[]> = {}

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

  async fetchComments(filmId: string) {
    this.loading = true

    try {
      const { comments } = await graphQLClient.request(queryCommentsById, { id: filmId })

      runInAction(() => {
        this.loading = false
        this.error = null
        this.data[filmId] = comments
      })
    } catch (error: any) {
      runInAction(() => {
        this.loading = false
        this.error = error
      })
    }
  }

  async addComment(filmId: string, comment: ICommentAdd) {
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

  getComment(filmId: string) {
    return this.data[filmId]
  }
}
