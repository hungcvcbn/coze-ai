import { getCookie, deleteCookie, setCookie } from 'cookies-next'
import { REFRESH_TOKEN, TOKEN } from '@/helpers/constants'

const has = Object.prototype.hasOwnProperty
export const isEmpty = (prop: any) => {
  return (
    prop === null ||
    prop === undefined ||
    (has.call(prop, 'length') && prop.length === 0) ||
    (prop.constructor === Object && Object.keys(prop).length === 0)
  )
}

export function isEmailValid(email: string) {
  // let re = /^[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\\.]+$/
  let re = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,}$/
  return re.test(email)
}

export const saveCookie = (key: string, value: any, hasDomain?: boolean) => {
  if (hasDomain) {
    setCookie(key, value, {
      domain: process.env.NEXT_PUBLIC_DOMAIN_URL,
      maxAge: 31536000,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })
  } else setCookie(key, value)
}

export function getAccessToken() {
  return getCookie(TOKEN,)
}
export function saveAccessToken(value: string) {
  setCookie(TOKEN, value, {
    domain: process.env.NEXT_PUBLIC_DOMAIN_URL,
    maxAge: 31536000,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  })
}
export function saveRefreshToken(value: string) {
  setCookie(REFRESH_TOKEN, value)
}
export function getRefreshToken() {
  return getCookie(REFRESH_TOKEN)
}
export const userLogout = async () => {
  try {
    deleteCookie(TOKEN)
    deleteCookie(REFRESH_TOKEN)
  } catch (err) {
    console.log('--err--')
  }
}

export const numberWithCommas = (x: number | string) => {
  let result = x
    .toString()
    .split('.')
    .map((el: string, idx: number) => (idx === 0 ? el?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : el))
  return result.join('.')
}

export const isNumber = (str: string) => {
  const numberRegex = /^[0-9]+$/
  return str.match(numberRegex)
}

export const canParseJSON = (str: any) => {
  try {
    JSON.parse(str)
    return true // can be parsed to JSON
  } catch (error) {
    return false // cannot be parsed to JSON
  }
}
export const removeDuplicate = (arr: any[], key?: string) => {
  return [...new Map(arr.map((item) => [item[key || 'id'], item])).values()]
}