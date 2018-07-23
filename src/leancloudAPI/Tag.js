import { AV, getErrorMessage, TAG, Tag } from './base'
import { getCurrentUser } from './User'

export async function addTag(name, order) {
  try {
    const tag = new Tag()
    tag.set('name', name)
    tag.set('order', order || 0)
    tag.set('owner', getCurrentUser())

    const acl = new AV.ACL()
    acl.setReadAccess(getCurrentUser(), true)
    acl.setWriteAccess(getCurrentUser(), true)
    tag.setACL(acl)
    const t = await tag.save()
    return { id: t.id, name: t.get('name'), order: t.get('order') }
  } catch (exception) {
    throw getErrorMessage(exception)
  }
}

export async function updateTag(id, name, order) {
  try {
    const tag = AV.Object.createWithoutData(TAG, id)
    if (name) {
      tag.set('name', name)
    }
    if (order) {
      tag.set('order', order)
    }
    const t = await tag.save()
    return { id: t.id, name: t.get('name'), order: t.get('order') }
  } catch (exception) {
    throw getErrorMessage(exception)
  }
}

export async function deleteTag(id) {
  try {
    const tag = AV.Object.createWithoutData(TAG, id)
    await tag.destroy()
  } catch (exception) {
    throw getErrorMessage(exception)
  }
}

export async function findTag({ id, name } = { id: '', name: '' }) {
  try {
    const query = new AV.Query(TAG)
    query.exists('owner')
    if (id) {
      query.equalTo('objectId', id)
    }
    if (name) {
      query.contains('name', 'name')
    }
    query.equalTo('owner', getCurrentUser())
    query.select(['name', 'order'])
    query.ascending('order')
    query.limit(999)
    const tags = await query.find()
    return [].reduce.call(tags, (prev, curr, index, arr) => {
      prev[curr.id] = { id: curr.id, name: curr.get('name'), order: curr.get('order') }
      return prev
    }, {})
  } catch (exception) {
    throw getErrorMessage(exception)
  }
}
