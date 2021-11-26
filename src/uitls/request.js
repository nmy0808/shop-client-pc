import axios from 'axios'

import config from '../config'
import router from '../router'
import store from '../store'

const TOKEN_INVALID = 'Token认证失败，请重新登录'
// const NETWORK_ERROR = '网络请求异常，请稍后重试'

const baseURL = config.baseURL

const service = axios.create({
  baseURL,
  timeout: 3000
})

// 请求拦截
service.interceptors.request.use((req) => {
  const { token } = store.state.user.profile
  if (token) {
    req.headers.Authorization = 'Bearer ' + token
  }
  return req
}, (err) => {
  return Promise.reject(err)
})
service.interceptors.response.use((res) => {
  const { result } = res.data
  if (result || result.token) {
    store.commit('user/setUser', { token: result.token })
  }
  return result
}, (err) => {
  if (err.response && err.response.status === 401) {
    setTimeout(() => {
      const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
      router.push({
        name: 'login',
        query: { redirect: fullPath }
      })
    }, 1500)
    return Promise.reject(TOKEN_INVALID)
  } else {
    return Promise.reject(err)
  }
})

// 核心
function request (options) {
  // get   => params
  // other => data
  options.method = options.method || 'get'
  if (options.method.trim().toLowerCase() === 'get') {
    options.params = options.data
  }
  //
  let isMock = config.mock
  if (typeof options.mock !== 'undefined') {
    isMock = options.mock
  }
  // 再次判断当前环境变量
  if (config.env === 'production') {
    service.defaults.baseURL = config.baseURL
  } else {
    service.defaults.baseURL = isMock ? config.mockURL : config.baseURL
  }
  return service(options)
}

// 支持 request.get ...
['get',
  'post',
  'put',
  'delete',
  'patch']
  .forEach((method) => {
    request[method] = (url, data, options) => {
      return request({
        url,
        data,
        method,
        ...options
      })
    }
  })
export default request
