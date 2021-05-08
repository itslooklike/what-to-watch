import axios from 'axios'
import { apiUrl } from '~/utils/config'
import { isServer } from '~/utils/env'

export type { AxiosError } from 'axios'

export const api = axios.create({
  // baseURL: `${apiUrl}/wtw`, // NO-PROXY use
  baseURL: isServer ? `${apiUrl}/wtw` : `/api`,
  timeout: 5_000,
  withCredentials: true,
})
