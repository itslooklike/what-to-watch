import axios from 'axios'
import { apiUrl } from '~/utils/config'

export type { AxiosError } from 'axios'

export const api = axios.create({
  baseURL: `${apiUrl}/wtw`,
  timeout: 5_000,
  withCredentials: true,
})
