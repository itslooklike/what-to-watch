import { makeAutoObservable, runInAction } from 'mobx'

import { api, AxiosError } from '~/utils/api'
import type { IStore } from '~/store'
import type { IUser, IUserSubmit, IUserResponseError } from './types'

export class UserStore {
  rootStore

  loading = false

  data: IUser | null = null

  error: AxiosError<IUserResponseError> | null = null

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
      const { data } = await api.post<IUser>('/login', { email, password })

      runInAction(() => {
        this.loading = false
        this.error = null
        this.data = data
      })
    } catch (error: any) {
      console.log('💥 UserStore.submit', error)
      runInAction(() => {
        this.loading = false
        this.error = error
      })
    }
  }

  async checkAuth() {
    this.loading = true

    try {
      const { data } = await api.get<IUser>('/login')

      runInAction(() => {
        this.loading = false
        this.error = null
        this.data = data
      })
    } catch (error: any) {
      runInAction(() => {
        this.loading = false
        this.error = error
      })
    }
  }

  get user() {
    return this.data
  }

  get getError() {
    return this.error?.response?.data.error
  }
}
