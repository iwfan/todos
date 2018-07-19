import { AV, getErrorMessage, TODO, Todo, TODOTAG, TodoTag, CATEGORIES } from './base'
import { getCurrentUser } from './User'
console.log(TODOTAG, TodoTag)
export async function addTodo({
  title,
  content,
  status,
  priority,
  reminder,
  categories
} = {
  title: '',
  content: '',
  /**
   *  option: false | true
   */
  status: false,
  /**
   * option: 'none' | 'low' | 'middle' | 'high'
   */
  priority: 'none',
  reminder: 'none',
  categories: ''
}) {
  try {
    const acl = new AV.ACL()
    acl.setWriteAccess(getCurrentUser(), true)
    acl.setReadAccess(getCurrentUser(), true)
    const todo = new Todo()
    todo.setACL(acl)
    todo.set('owner', getCurrentUser())
    todo.set('title', title || '')
    todo.set('content', content || '')
    todo.set('status', status || false)
    todo.set('priority', priority || 'none')
    todo.set('reminder', reminder || 'none')
    if (categories) {
      const cate = AV.Object.createWithoutData(CATEGORIES, categories)
      todo.set('categories', cate)
    }
    const t = await todo.save()
    return {
      id: t.id,
      title: t.get('title'),
      content: t.get('content'),
      status: t.get('status'),
      priority: t.get('priority'),
      categories: t.get('categories')
    }
  } catch (exception) {
    throw getErrorMessage(exception)
  }
}

export async function updateTodo() {
  // try {

  // } catch (exception) {
  //   throw getErrorMessage(exception)
  // }
}

export async function deleteTodo() {
  // try {

  // } catch (exception) {
  //   throw getErrorMessage(exception)
  // }
}

export async function findTodo({
  id,
  keyword,
  categories
} = {
  id: '',
  keyword: '',
  categories: ''
}) {
  try {
    var query = new AV.Query(TODO)
    query.exists('owner')
    if (id) {
      query.equalTo('objectId', id)
    }
    if (keyword) {
      query.contains('title', keyword)
      query.contains('content', keyword)
    }
    if (categories) {
      const cate = AV.Object.createWithoutData(CATEGORIES, categories)
      query.equalTo('categories', cate)
    }
    query.equalTo('owner', getCurrentUser())
    query.select(['title', 'content', 'status', 'priority', 'categories'])
    query.descending('createdAt')
    query.limit(999)
    const todos = await query.find()
    return [].reduce.call(todos, (prev, curr, index, arr) => {
      prev[curr.id] = {
        id: curr.id,
        title: curr.get('title'),
        content: curr.get('content'),
        status: curr.get('status'),
        priority: curr.get('priority'),
        categories: curr.get('categories') ? curr.get('categories').id : undefined
      }
      return prev
    }, {})
  } catch (exception) {
    throw getErrorMessage(exception)
  }
}
