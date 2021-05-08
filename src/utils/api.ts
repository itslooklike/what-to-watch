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

// polifill
function replaceAll(string: string, search: string, replace: string) {
  return string.split(search).join(replace)
}

if (withProxy) {
  api.interceptors.response.use((response) => {
    let newData = JSON.stringify(response.data)

    // need 15+ node on vercel support
    // newData = newData.replaceAll(`${apiPrefix}/static`, '/api/static')

    newData = replaceAll(newData, `${apiPrefix}/static`, '/api/static')
    newData = JSON.parse(newData)
    response.data = newData

    return response
  })
}
