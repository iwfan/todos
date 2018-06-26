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
