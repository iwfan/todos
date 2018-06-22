import AV from 'leancloud-storage'

export function init () {
  const APPID = 'PwJpIXfhKL1WH0QDmdutG9Eb-gzGzoHsz'
  const APPKEY = 'RPeMx26ScrwDY2Iutozf2vR1'
  AV.init({ appId: APPID, appKey: APPKEY })
}

export function getCurrentUser () {
  return AV.User.current()
}

export function singUp ({username, password, email}) {
  var user = new AV.User()
  user.setUsername(username)
  user.setPassword(password)
  user.setEmail(email)
  return user.signUp()
}

export function login ({username, password}) {
  return AV.User.logIn(username, password)
}
export function logout () {
  AV.User.logOut()
}
