import AV from 'leancloud-storage'
const TodoFolder = AV.Object.extend('TodoFolder')
const TodoTag = AV.Object.extend('TodoTag')
// const Todo = AV.Object.extend('Todo')

// 当前用户
let currentUser = null

export function init () {
  const APPID = 'PwJpIXfhKL1WH0QDmdutG9Eb-gzGzoHsz'
  const APPKEY = 'RPeMx26ScrwDY2Iutozf2vR1'
  AV.init({ appId: APPID, appKey: APPKEY })
  if (process.env.NODE_ENV === 'development') {
    localStorage.setItem('debug', 'leancloud*')
  }
  debugger
  const user = AV.User.current()
  if (user && user.isAuthenticated()) {
    currentUser = user
  }
}

export function getCurrentUser () {
  return currentUser
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
    loginedUser.refreshSessionToken()
    currentUser = loginedUser
    return loginedUser
  } catch (err) {
    throw err.rawMessage
  }
}
export async function logout () {
  currentUser = null
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
  // 不能超过50个
  const folder = new TodoFolder()
  folder.set('name', name)
  folder.set('priority', priority)
  return folder.save().then(function (todo) {
    console.log('objectId is ' + todo.id)
  }, function (error) {
    console.error(error)
  })
}

export async function fetchAllFolderAndTag () {
  var result = {folders: [], tags: [], todos: []}
  var query = new AV.Query('TodoFolder')
  query.select(['name'])
  query.equalTo('owner', getCurrentUser())
  query.include('owner')
  query.ascending('createdAt')
  var query1 = new AV.Query('TodoTag')
  query1.select(['name'])
  query1.equalTo('owner', getCurrentUser())
  query1.include('owner')
  query1.ascending('createdAt')

  try {
    const folders = await query.find()
    if (folders && folders.length) {
      [].map.call(folders, fold => result.folders.push({id: fold.id, name: fold.get('name'), icon: 'bulb'}))
    }
    const tags = await query1.find()
    if (tags && tags.length) {
      [].map.call(tags, tag => result.tags.push({id: tag.id, name: tag.get('name'), icon: 'pushpin'}))
    }
  } catch (exception) {
    throw exception.rawMessage
  }
  return result
}

export async function fillData () {
  const folder = ['个人计划', '工作任务', '学习任务', '临时记录', '杂项']
  const tags = ['待重构', '任务中', 'test', '日常']
  const objects = []
  for (const key of folder) {
    let fold = new TodoFolder()
    fold.set('name', key)
    fold.set('owner', getCurrentUser())
    objects.push(fold)
  }

  for (const key of tags) {
    let tag = new TodoTag()
    tag.set('name', key)
    tag.set('owner', getCurrentUser())
    objects.push(tag)
  }

  try {
    const result = await AV.Object.saveAll(objects)
    return result
  } catch (exception) {
    throw exception.rawMessage
  }
}
