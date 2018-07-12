import { AV, getErrorMessage } from './base'

let currentUser = null

export function getCurrentUser() {
  return currentUser
}

export async function afterInit() {
  try {
    const user = AV.User.current()
    if (user && await user.isAuthenticated()) {
      currentUser = user
      return currentUser
    }
  } catch (exception) {
    throw getErrorMessage(exception)
  }
}

export async function hasUser(code) {
  const query = new AV.Query('User')
  let hasU = false
  try {
    hasU = await query.get(code)
  } catch (exception) {
    throw getErrorMessage(exception)
  }
  return hasU
}

export async function singUp({ username, password, email }) {
  const user = new AV.User()
  user.setUsername(username)
  user.setPassword(password)
  user.setEmail(email)
  user.set('nickname', username)
  try {
    const loginUser = await user.signUp()
    currentUser = loginUser
    return loginUser
  } catch (exception) {
    throw getErrorMessage(exception)
  }
}

export async function login({ username, password }) {
  try {
    const loginedUser = await AV.User.logIn(username, password)
    // 刷新session 做单点登录
    await loginedUser.refreshSessionToken()
    currentUser = loginedUser
    return currentUser
  } catch (exception) {
    throw getErrorMessage(exception)
  }
}

export async function logout() {
  await AV.User.logOut()
  currentUser = null
}

export async function forgotPass(email) {
  try {
    return AV.User.requestPasswordReset(email)
  } catch (exception) {
    throw getErrorMessage(exception)
  }
}
