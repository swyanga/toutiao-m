/**
 * 请求模块
 */

import axios from 'axios'
const request = axios.create({
  baseURL: 'http://www.liulongbin.top:8000'
})

// 请求拦截器

// 响应拦截器

export default request
