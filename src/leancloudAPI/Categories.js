import { AV, getErrorMessage, TODO, CATEGORIES, Categories } from './base'
import { getCurrentUser } from './User'

// 此处需要注意leancloud每次只能查询100条数据
export async function addCategories(name, order) {
  const categories = new Categories()
  categories.set('name', name)
  categories.set('order', order || 0)
  categories.set('owner', getCurrentUser())

  const acl = new AV.ACL()
  acl.setReadAccess(getCurrentUser(), true)
  acl.setWriteAccess(getCurrentUser(), true)
  categories.setACL(acl)
  try {
    const cate = await categories.save()
    return { id: cate.id, name: cate.get('name'), order: cate.get('order') }
  } catch (exception) {
    throw getErrorMessage(exception)
  }
}

export async function updateCategories(id, name, order) {
  const categories = AV.Object.createWithoutData(CATEGORIES, id)
  if (name) {
    categories.set('name', name)
  }
  if (order) {
    categories.set('order', order || '0')
  }
  try {
    const cate = await categories.save()
    return { id: cate.id, name: cate.get('name'), order: cate.get('order') }
  } catch (exception) {
    throw getErrorMessage(exception)
  }
}

export async function deleteCategories(id) {
  const categories = AV.Object.createWithoutData(CATEGORIES, id)
  await resetTodoFolder(categories)
  try {
    await categories.destroy()
  } catch (exception) {
    throw getErrorMessage(exception)
  }
}

async function resetTodoFolder(categories) {
  try {
    const query = new AV.Query(TODO)
    query.equalTo('owner', getCurrentUser())
    query.equalTo('categories', categories)
    query.select(['categories'])
    const todos = await query.find()
    if (todos && todos.length) {
      todos.forEach(todo => {
        todo.set('categories', AV.Object.createWithoutData(CATEGORIES, 'all'))
      })
      await AV.Object.saveAll(todos)
    }
  } catch (exception) {
    throw getErrorMessage(exception)
  }
}

export async function findCategories({ id, name } = { id: '', name: '' }) {
  try {
    const query = new AV.Query(CATEGORIES)
    query.exists('owner')
    if (id) {
      query.equalTo('objectId', id)
    }
    if (name) {
      query.contains('name', name)
    }
    query.equalTo('owner', getCurrentUser())
    query.select(['name', 'order'])
    query.ascending('order')
    query.limit(999)
    const cates = await query.find()
    return [].reduce.call(cates, (prev, curr, index, arr) => {
      prev[curr.id] = {id: curr.id, name: curr.get('name'), order: curr.get('order')}
      return prev
    }, {})
  } catch (exception) {
    throw getErrorMessage(exception)
  }
}
