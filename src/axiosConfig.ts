import axios from 'axios'
import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios'

const createAxiosInstance = (): AxiosInstance => {
  const baseURL = import.meta.env.VITE_BASE_URL
  const instance: AxiosInstance = axios.create({ baseURL })

  instance.interceptors.request.use(
    (config) => {
      return config
    },
    (error: AxiosError) => {
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response
    },
    (error: AxiosError) => {
      //error handler would ideally be housed here
      console.log('ERRORCHECK::', error)
      return Promise.reject(error)
    }
  )

  return instance
}

const $axios: AxiosInstance = createAxiosInstance()
export default $axios
