import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://htmlacademy-react-2.appspot.com/wtw',
  timeout: 5_000,
})
