import { AV, getErrorMessage, TODO, Todo, TODOTAG, TodoTag, CATEGORIES } from './base'
import { getCurrentUser } from './User'
import escape from 'lodash/fp/escape'
import unescape from 'lodash/fp/unescape'
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
   *  option: 0 unfinished | 1 done | 2 deleted
   */
  status: 0,
  /**
   * option: 0 'none' | 1 'low' |  2 'middle' | 3 'high'
   */
  priority: 0,
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
    todo.set('title', escape(title || ''))
    todo.set('content', escape(content || ''))
    todo.set('status', status || 0)
    todo.set('priority', priority || 0)
    // todo.set('reminder', reminder || 'none')
    if (categories) {
      const cate = AV.Object.createWithoutData(CATEGORIES, categories)
      todo.set('categories', cate)
    } else {
      todo.set('categories', AV.Object.createWithoutData(CATEGORIES, 'all'))
    }
    const t = await todo.save()
    return {
      id: t.id,
      title: unescape(t.get('title')),
      content: unescape(t.get('content')),
      status: t.get('status'),
      priority: t.get('priority'),
      categories: t.get('categories') ? t.get('categories').id : 'all'
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
      prev.push({
        id: curr.id,
        title: unescape(curr.get('title')),
        content: unescape(curr.get('content')),
        status: curr.get('status'),
        priority: curr.get('priority'),
        categories: curr.get('categories') ? curr.get('categories').id : 'all'
      })
      return prev
    }, [])
  } catch (exception) {
    throw getErrorMessage(exception)
  }
}
