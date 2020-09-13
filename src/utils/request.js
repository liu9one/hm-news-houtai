import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui'
import router from '../router'

Vue.prototype.$axios = axios
const URL = 'http://localhost:3000'
axios.defaults.baseURL = '/api'
// axios.defaults.baseURL = URL
Vue.prototype.$base = URL

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

axios.interceptors.response.use(res => {
  // 对响应数据做点什么
  if (res.data.statusCode === 401 && res.data.message === '用户信息验证失败') {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    Message.error('用户验证信息过期')
    router.push('/login')
  }
  return res
})

Vue.prototype.$url = function (url) {
  if (url.startsWith('http')) {
    return url
  } else {
    return URL + url
  }
}
