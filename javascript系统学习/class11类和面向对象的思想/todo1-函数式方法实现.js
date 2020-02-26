var baseUrl = 'http://vip.cocode.cc/sandbox/todo/3400711034'

var ajax = function (method, path, data, responseCallback) {
    var r = new XMLHttpRequest()
    r.open(method, path, true)
    r.setRequestHeader('Content-Type', 'application/json')
    r.onreadystatechange = function(){
        if(r.readyState === 4){
            responseCallback(r)
        }
    }
}

var insertTodos = function(todos) {
    var container = e('#id-div-todo-container')
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i]
        var t = todoTemplate(todo)
        appendHtml(container, t)
    }
}

var loadTodos = function(){
    var method = 'GET'
    var path = '/all'
    var url = baseUrl + path
    ajax(method, url, '', function(r){
        var todos = JSON.parse(r.response)
        log(todos)
        insertTodos(todos)
    })
}

var addTodo = function(task) {
    var url = 'http://vip.cocode.cc/sandbox/todo/3400711034/todo'
    var data = {
        'task': task,
    }
    data = JSON.stringify(data)
    ajax('POST', url, data, function(r){
        var t = JSON.parse(r.response)
        console.log(t)
    })
}

var deleteTodo = function(todoId) {
    // var todoId = '965'
    var url = 'http://vip.cocode.cc/sandbox/todo/3400711034/delete/' + todoId
    ajax('GET', url, '', function(r){
        var t = JSON.parse(r.response)
        console.log(t)
    })
}

var updateTodo = function(todoId, task) {
    var url = 'http://vip.cocode.cc/sandbox/todo/3400711034/update/' + todoId
    var data = {
        'task': task,
    }
    data = JSON.stringify(data)
    ajax('POST', url, data, function(r){
        var t = JSON.parse(r.response)
        console.log(t)
    })
}