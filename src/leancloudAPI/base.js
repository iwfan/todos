import AV from 'leancloud-storage'

const [CATEGORIES, TAG, TODO, TODOTAG] = ['Categories', 'Tag', 'Todo', 'TodoTag']
const APPID = 'PwJpIXfhKL1WH0QDmdutG9Eb-gzGzoHsz'
const APPKEY = 'RPeMx26ScrwDY2Iutozf2vR1'

const Categories = AV.Object.extend(CATEGORIES)
const Tag = AV.Object.extend(TAG)
const Todo = AV.Object.extend(TODO)
// 使用关联表存储todo与tag的关联关系
const TodoTag = AV.Object.extend(TODOTAG)
// 获取错误消息
const getErrorMessage = err => {
  if (process.env.NODE_ENV === 'development') {
    console.error(err)
  }
  return (err.rawMessage) || (err.message) || (err.stack) || err
}

export { AV, APPID, APPKEY, CATEGORIES, TAG, TODO, TODOTAG, Categories, Tag, Todo, TodoTag, getErrorMessage }
