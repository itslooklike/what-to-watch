import axios from 'axios'
import { apiUrl, withProxy } from '~/utils/config'
import { isServer } from '~/utils/env'

export type { AxiosError } from 'axios'

const apiPrefix = `${apiUrl}/wtw`

const baseURL = (() => {
  if (isServer) {
    return apiPrefix
  }

  if (withProxy) {
    return `/api`
  }

  return apiPrefix
})()

export const api = axios.create({
  baseURL,
  timeout: 5_000,
  withCredentials: true,
})

if (withProxy) {
  api.interceptors.response.use((response) => {
    let newData = JSON.stringify(response.data)

    newData = newData.replace(`${apiPrefix}/static`, '/api/static')
    newData = JSON.parse(newData)
    response.data = newData

    return response
  })
}
