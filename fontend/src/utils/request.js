import axios from 'axios'
import { Notification } from 'element-ui'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  timeout: 1000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const code = response.status
    if (code < 200 || code > 300) {
      Notification.error({
        title: response.message
      })
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    if (error.toString().indexOf('Error: timeout') !== -1) {
      Notification.error({
        title: '网络请求超时',
        duration: 5000
      })
      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
)
export default service
