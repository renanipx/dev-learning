import axios from "axios"
import type { InternalAxiosRequestConfig } from "axios"

/**
 * Central Axios instance
 * All HTTP requests in the app must use this instance
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3333",
})

/**
 * Request interceptor
 * Automatically attaches the auth token to every request
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token")

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

/**
 * Response interceptor
 * Handles global authentication errors
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/"
    }

    return Promise.reject(error)
  }
)
