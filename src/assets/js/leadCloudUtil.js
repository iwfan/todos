import AV from 'leancloud-storage'
const TodoFolder = AV.Object.extend('TodoFolder')
// const Todo = AV.Object.extend('Todo')

export function init () {
  const APPID = 'PwJpIXfhKL1WH0QDmdutG9Eb-gzGzoHsz'
  const APPKEY = 'RPeMx26ScrwDY2Iutozf2vR1'
  AV.init({ appId: APPID, appKey: APPKEY })
  if (process.env.NODE_ENV === 'development') {
    localStorage.setItem('debug', 'leancloud*')
  }
}

export function getCurrentUser () {
  return AV.User.current()
}

export async function hasUser (code) {
  const query = new AV.Query('User')
  let hasU = false
  try {
    hasU = query.get(code)
  } catch (exception) {

  }
  return hasU
}

export async function singUp ({username, password, email}) {
  const user = new AV.User()
  user.setUsername(username)
  user.setPassword(password)
  user.setEmail(email)
  user.set('nickname', username)
  try {
    const loginUser = await user.signUp()
    return loginUser
  } catch (exception) {
    throw exception.rawMessage
  }
}

export async function login ({username, password}) {
  try {
    const loginedUser = await AV.User.logIn(username, password)
    return loginedUser
  } catch (err) {
    throw err.rawMessage
  }
}
export async function logout () {
  await AV.User.logOut()
}

export async function forgotPass (email) {
  try {
    return AV.User.requestPasswordReset(email)
  } catch (exception) {
    throw exception.rawMessage
  }
}

export function addFolder ({name, priority}) {
  const folder = new TodoFolder()
  folder.set('name', name)
  folder.set('priority', priority)
  return folder.save().then(function (todo) {
    console.log('objectId is ' + todo.id)
  }, function (error) {
    console.error(error)
  })
}
