import { AV, APPID, APPKEY } from './base'

import { afterInit } from './User'

export async function init() {
  AV.init({ appId: APPID, appKey: APPKEY })
  localStorage.removeItem('debug')
  if (process.env.NODE_ENV === 'development') {
    // localStorage.setItem('debug', 'leancloud*')
  }
  const user = await afterInit()
  return user
}

export { getCurrentUser, hasUser, login, logout, singUp, forgotPass } from './User'

export { addCategories, updateCategories, deleteCategories, findCategories } from './Categories'
