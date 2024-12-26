import { getCookie, deleteCookie, setCookie } from 'cookies-next'
import { REFRESH_TOKEN, TOKEN } from '@/helpers/constants'
import { FieldError } from 'react-hook-form'

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
  return getCookie(TOKEN)
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

export const getHelperText = (error?: FieldError) =>
  Array.isArray(error) ? error[error.length - 1].message : error?.message

export const stringNoSign = (str: string) => {
  if (str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
    str = str.replace(/đ/g, 'd')
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A')
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E')
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I')
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O')
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U')
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y')
    str = str.replace(/Đ/g, 'D')
  }

  return str
}