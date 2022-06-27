import { makeAutoObservable, runInAction } from 'mobx'
import { gql } from 'graphql-request'

import { graphQLClient } from '~/utils/api'
import { CommentFragment } from '~/store/gql'
import type { IStore } from '~/store'
import type { IComment, ICommentAdd } from './types'

const queryCommentsById = gql`
  ${CommentFragment}
  query comments($id: ID!) {
    comments(where: { film: { id: { equals: $id } } }) {
      ...CommentFragment
    }
  }
`

const createComment = gql`
  ${CommentFragment}
  mutation createComment($data: CommentCreateInput!) {
    createComment(data: $data) {
      ...CommentFragment
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
      const data = await graphQLClient.request(createComment, {
        data: {
          comment: comment.comment,
          rating: comment.rating,
          film: { connect: { id: filmId } },
          user: { connect: { id: this.rootStore.userStore.user?.id } },
        },
      })

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
