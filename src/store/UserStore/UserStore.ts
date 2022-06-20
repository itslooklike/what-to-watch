import { makeAutoObservable, runInAction } from 'mobx'
import { gql } from 'graphql-request'

import { graphQLClient } from '~/utils/api'
import type { IStore } from '~/store'
import type { IUser, IUserSubmit } from './types'

const mutationAuth = gql`
  mutation Auth($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        sessionToken
        item {
          id
          name
          email
          favoriteFilmsCount
          favoriteActorsCount
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`

const mutationCreateUser = gql`
  mutation createUser($data: [UserCreateInput!]!) {
    createUser(data: $data) {
      name
      email
    }
  }
`

export class UserStore {
  rootStore

  loading = false

  data: IUser | null = null

  error: any = null

  constructor(initialData: Partial<UserStore> = {}, rootStore: IStore) {
    makeAutoObservable(this, { rootStore: false })
    this.rootStore = rootStore
    this.data = initialData.data || null
  }

  hydrate() {
    return {
      data: this.data,
    }
  }

  async submit({ email, password }: IUserSubmit) {
    this.loading = true

    try {
      const {
        authenticateUserWithPassword: { message, item },
      } = await graphQLClient.request(mutationAuth, {
        email,
        password,
      })

      if (message) {
        const { data, errors } = await graphQLClient.request(mutationCreateUser, {
          data: {
            name: 'coon',
            email,
            password,
          },
        })

        if (errors && errors.length) {
          throw new Error(message)
        }

        runInAction(() => {
          this.loading = false
          this.error = null
          this.data = data.createUser
        })
      } else {
        runInAction(() => {
          this.loading = false
          this.error = null
          this.data = item
        })
      }
    } catch (error: any) {
      console.log('💥 UserStore.submit', error)
      runInAction(() => {
        this.loading = false
        this.error = error
      })
    }
  }

  get user() {
    return this.data
  }
}
