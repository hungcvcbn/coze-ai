import axios from 'axios'
import { userLogout, getAccessToken, getRefreshToken, saveAccessToken, saveRefreshToken, saveCookie } from '@/helpers/utils/common'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dev-gwapi.hasagi.xyz'

const Api = axios.create({
  baseURL: API_URL,
  responseType: 'json',
})

let isRefreshing = false
let subscribers: Array<any> = []

function addSubscriber(callback: any) {
  subscribers.push(callback)
}

function onRrefreshed(new_token: any) {
  subscribers = subscribers.map((callback) => callback(new_token))
  subscribers = []
}

function logout() {
  subscribers = []
  userLogout()
}

Api.defaults.timeout = 600000
Api.defaults.headers.post['Content-Type'] = 'application/json'

// request api
Api.interceptors.request.use(
  async function (config: any) {

    const token = getAccessToken()
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    if (config.url.indexOf('/login') !== -1) {
      delete config.headers.Authorization
    }
    let headers = {
      ...config.headers,
      'Accept-Language': 'vi',
      tcode: process.env.NEXT_PUBLIC_TCODE,
      'm-platform': 'WEB',
    }
    config.headers = headers
    config.baseURL = API_URL
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// response api
Api.interceptors.response.use(
  (response) => {
    return response.data
  },
  async (error) => {
    console.log("error", error);
    if (!error.response) {
      // network error
      logout()
      // return Promise.reject({
      //   status: 429,
      //   message: 'Suspicious activity detected. Your account has been temporarily locked.',
      // })
    }
    const originalRequest = error.config
    const resError = error.response?.data?.error || error.response?.data
    if (resError.statusCode === 401) {
      logout()
      const refreshToken = getRefreshToken()
      const token = getAccessToken()
      if (token && error.config.url.indexOf('refresh-token') !== -1) {
        logout()
      }
      if (token) {
        if (refreshToken && !originalRequest._retry) {
          originalRequest._retry = true
          if (!isRefreshing) {
            isRefreshing = true
            try {
              const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/iam/v1/auth/refresh-token', {
                token: refreshToken,
              })
              const { data } = res.data
              isRefreshing = false
              saveAccessToken(data.token)
              saveRefreshToken(data.refreshToken)
              onRrefreshed(data.token)
              return new Promise((resolve) => {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token
                originalRequest.headers['Authorization'] = 'Bearer ' + data.token
                resolve(axios(originalRequest))
              }).then((res: any) => res.data)
            } catch (error) {
              logout()
            }
          }
          return new Promise((resolve) => {
            addSubscriber((new_token: any) => {
              originalRequest.headers.Authorization = `Bearer ${new_token}`
              resolve(axios(originalRequest))
            })
          }).then((res: any) => res.data)
        } else {
          logout()
        }
      }
    }
    return error.response ? Promise.reject(error.response.data) : Promise.reject(error)
  }
)

export default Api
