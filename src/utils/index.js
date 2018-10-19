import { Base64 } from 'js-base64'
import { post, get } from './request'
import { api } from './api'
import { date } from './date'
import { validate } from './validate'
import { common } from "./common";

const lazyload = (name) => (resolve) => require([`@/pages/${name}`], resolve)
const changeTitle = (title) => {
  document.title = title
  document.body.scrollTop = 0
}

const logger = {
  log (message) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(message)
    }
  }
}

const cache = {
  /**
     * userInfo: 用户信息
     */
  setItem (key, value) {
    let data = JSON.stringify(value)
    if (process.env.NODE_ENV === 'production') {
      data = Base64.encode(data)
    }
    sessionStorage.setItem(key, data)
  },
  getItem (key) {
    let data = sessionStorage.getItem(key)
    if (!data) return null
    if (process.env.NODE_ENV === 'production') {
      data = Base64.decode(data)
    }
    return data ? JSON.parse(data) : null
  },
  removeItem (key) {
    sessionStorage.removeItem(key)
  }
}

const cookieUtils = {
  set: function (name, value, days) {
    var d = new Date()
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days)
    window.document.cookie = name + '=' + value + ';path=/;expires=' + d.toGMTString()
  },
  get: function (name) {
    var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
    return v ? v[2] : null
  },
  delete: function (name) {
    this.set(name, '', -1)
  }
}

const getQueryString = (name) => {
  let url = window.location.href
  let index = url.indexOf('?')
  let search = url.substr(index + 1)
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  let r = search.match(reg)
  if (r != null) return unescape(r[2])
  return null
}

export {
  lazyload,
  changeTitle,
  logger,
  cache,
  cookieUtils,
  getQueryString,
  post,
  get,
  api,
  date,
  validate,
  common
}
