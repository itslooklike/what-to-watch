import { makeAutoObservable, runInAction } from 'mobx'
import { gql } from 'graphql-request'

import { graphQLClient } from '~/utils/api'
import type { IStore } from '~/store'
import type { IUser, IUserSubmit } from './types'

const UserFragment = gql`
  fragment UserFragment on User {
    id
    name
    email
    favoriteFilmsCount
    favoriteActorsCount
  }
`

const mutationAuth = gql`
  ${UserFragment}
  mutation Auth($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        sessionToken
        item {
          ...UserFragment
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`

const mutationCreateUser = gql`
  ${UserFragment}
  mutation createUser($data: UserCreateInput!) {
    createUser(data: $data) {
      ...UserFragment
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
      const { authenticateUserWithPassword } = await graphQLClient.request(mutationAuth, {
        email,
        password,
      })

      if (authenticateUserWithPassword.message) {
        const resp = await graphQLClient.request(mutationCreateUser, {
          data: {
            name: 'coon' + Date.now(),
            email,
            password,
          },
        })

        if (resp.errors && resp.errors.length) {
          throw new Error(resp.data.message)
        }

        runInAction(() => {
          this.loading = false
          this.error = null
          this.data = resp.createUser
        })
      } else {
        runInAction(() => {
          this.loading = false
          this.error = null
          this.data = authenticateUserWithPassword.item
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
