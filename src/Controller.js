var Controller = function(model, view) {

    view.update(model.getLists())

    model.on('add', function() {
        view.update(model.getLists())
    })

    model.on('remove', function() {
        view.update(model.getLists())
    })

    view.on('add', function(data) {
        model.add(data)
    })
    
    view.on('remove', function(index) {
        model.remove(index)
    })
}

export default Controller