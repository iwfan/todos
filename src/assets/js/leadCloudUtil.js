// export async function addTodo () {
//   var todo = new Todo()
//   todo.set('title', '代办一')
//   todo.set('content', '内容')
//   todo.set('createDate', new Date())
//   todo.set('tag', 1)
//   let result = await todo.save()
//   return result
// }
//
// export async function fillTodoData () {
//   console.log(1)
//   async function save() {
//     var tag1 = AV.Object.createWithoutData('TodoTag', '5b35ebf8ee920a003a0f7279')
//     var tag2 = AV.Object.createWithoutData('TodoTag', '5b35ebf8ee920a003a0f7277')
//     var folder = AV.Object.createWithoutData('TodoFolder', '5b35ebf8ee920a003a0f7272')
//
//     var todo = new Todo()
//     todo.set('title', 'test1')
//     todo.set('content', 'test content')
//     todo.set('folder', folder)
//     await todo.save()
//     var todoTag = new TodoTagMap()
//     todoTag.set('todo', todo)
//     todoTag.set('tag', tag1)
//     await todoTag.save()
//     var todoTag1 = new TodoTagMap()
//     todoTag1.set('todo', todo)
//     todoTag1.set('tag', tag2)
//     await todoTag1.save()
//     // AV.Object.saveAll([todo, todoTag, todoTag1])
//   }
//   // save()
//   console.log(save)
// }
//
// export async function fetchAllFolderAndTag () {
//   var result = {folders: [], tags: [], todos: {}}
//   var query = new AV.Query('TodoFolder')
//   query.select(['name'])
//   query.equalTo('owner', getCurrentUser())
//   query.include('owner')
//   query.ascending('createdAt')
//   var query1 = new AV.Query('TodoTag')
//   query1.select(['name'])
//   query1.equalTo('owner', getCurrentUser())
//   query1.include('owner')
//   query1.ascending('createdAt')
//
//   var todoQuery = new AV.Query('TodoTagMap')
//   todoQuery.include('todo')
//   todoQuery.include('todo.folder')
//   todoQuery.include('tag')
//
//   try {
//     const folders = await query.find()
//     if (folders && folders.length) {
//       [].map.call(folders, fold => result.folders.push({id: fold.id, name: fold.get('name'), icon: 'bulb'}))
//     }
//     const tags = await query1.find()
//     if (tags && tags.length) {
//       [].map.call(tags, tag => result.tags.push({id: tag.id, name: tag.get('name'), icon: 'pushpin'}))
//     }
//
//     const todoMap = await todoQuery.find()
//     if (todoMap && todoMap.length) {
//       debugger
//       [].map.call(todoMap, (todoTagMap, index) => {
//         let todo = todoTagMap.get('todo')
//         let todoId = todo.id
//         let folder = todo.get('folder')
//         let tag = todoTagMap.get('tag')
//         if (result.todos[todoId]) {
//           result.todos[todoId].tags.push({
//             id: tag.id,
//             name: tag.get('name')
//           })
//         } else {
//           result.todos[todoId] = {
//             id: todoId,
//             title: todo.get('titile'),
//             folder: { id: folder.id, name: folder.get('name') },
//             tags: [{id: tag.id, name: tag.get('name')}]
//           }
//         }
//       })
//     }
//   } catch (exception) {
//     console.error(exception)
//     throw exception.rawMessage
//   }
//   return result
// }
//
// export async function fillData () {
//   const folder = ['个人计划', '工作任务', '学习任务', '临时记录', '杂项']
//   const tags = ['待重构', '任务中', 'test', '日常']
//   const objects = []
//   for (const key of folder) {
//     let fold = new TodoFolder()
//     fold.set('name', key)
//     fold.set('owner', getCurrentUser())
//     objects.push(fold)
//   }
//
//   for (const key of tags) {
//     let tag = new TodoTag()
//     tag.set('name', key)
//     tag.set('owner', getCurrentUser())
//     objects.push(tag)
//   }
//
//   try {
//     const result = await AV.Object.saveAll(objects)
//     return result
//   } catch (exception) {
//     throw exception.rawMessage
//   }
// }
