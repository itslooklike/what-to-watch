import { makeAutoObservable, runInAction } from 'mobx'

import { api, AxiosError } from '~/utils/api'
import { IUser, IUserSubmit, IUserResponseError } from './types'

export class UserStore {
  loading = false

  data: IUser | null = null

  error: AxiosError<IUserResponseError> | null = null

  constructor(initialData: Partial<UserStore> = {}) {
    makeAutoObservable(this)
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
    } catch (error) {
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
