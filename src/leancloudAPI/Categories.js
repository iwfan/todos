import { AV, getErrorMessage, CATEGORIES, Categories } from './base'
import { getCurrentUser } from './User'

// 此处需要注意leancloud每次只能查询100条数据
export async function addCategories(name, order) {
  if (!name) {
    throw new TypeError('请输入正确的分类名称')
  }
  const categories = new Categories()
  categories.set('name', name)
  categories.set('order', order || '0')
  categories.set('owner', getCurrentUser())
  try {
    const cate = await categories.save()
    return { id: cate.id, name: cate.get('name'), order: cate.get('order') }
  } catch (exception) {
    throw getErrorMessage(exception)
  }
}

export async function updateCategories(id, name, order) {
  const categories = AV.Object.createWithoutData(CATEGORIES, id)
  categories.set('name', name)
  categories.set('order', order || '0')
  try {
    const cate = await categories.save()
    return { id: cate.id, name: cate.get('name'), order: cate.get('order') }
  } catch (exception) {
    throw getErrorMessage(exception)
  }
}

export async function deleteCategories(id) {
  const categories = AV.Object.createWithoutData(CATEGORIES, id)
  try {
    await categories.destroy()
  } catch (exception) {
    throw getErrorMessage(exception)
  }
}

export async function findCategories(param = {id: '', name: ''}) {
  try {
    const query = new AV.Query(CATEGORIES)
    if (param.id) {
      query.equalTo('objectId', param.id)
    }
    if (param.name) {
      query.contains('name', param.name)
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
