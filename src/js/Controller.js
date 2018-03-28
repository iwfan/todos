const Controller = function Controller(model, view) {
    view.update(model.getLists())

    model.on('add', () => {
        view.update(model.getLists())
    })

    model.on('remove', () => {
        view.update(model.getLists())
    })

    view.on('add', (data) => {
        model.add(data)
    })

    view.on('remove', (index) => {
        model.remove(index)
    })
}

export default Controller