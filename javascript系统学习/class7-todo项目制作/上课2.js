var log = function(){
    console.log.apply(console, arguments)
}

var currentTime = function(){
    var time = new Date()
    var day = time.getDate()
    var month = time.getMonth() + 1
    var year = time.getFullYear()
    var hour = time.getHours()
    var min = time.getMinutes()
    var sec = time.getSeconds()
    return `${year}/${month}/${day} ${hour}:${min}:${sec}`
}

var save = function(array){
    var s =  JSON.stringify(array)
    localStorage.todos = s
}

var load = function(){
    var s = localStorage.todos
    return JSON.parse(s)
}

var saveAllTodos = function(){
    var todos = []
    var todosContent = document.querySelectorAll('.content')
    for(var i = 0; i < todosContent.length; i++){
        var c = todosContent[i];
        var cell = c.parentElement
        var done = cell.classList.contains("done")
        var time = cell.querySelector('.todo-time').innerText
        var todo = {
            content: c.innerHTML,
            //bool done
            done: done,
            time: time
        }
        todos.push(todo)
    }
    save(todos)
}

var todoTemplate = function(todo, done, time){
    var status = ''
    if(done){
        status = 'done'
    }
    r = `
        <div class="todo-cell ${status}">
            <button class="todo-done">完成</button>
            <button class="todo-delete">删除</button>
            <span contenteditable="true" class="content">${todo}</span>
            <span class="todo-time">${time}</span>
        </div>
    `
    return r
}


var addTodo = function(t){
    var todoContainer = document.querySelector('#id-div-container')
    todoContainer.insertAdjacentHTML('beforeend', t)
}

var addButton = document.querySelector("#id-button-add")

addButton.addEventListener('click', function() {
    var todoInput = document.querySelector("#id-input-todo")
    var todo = todoInput.value
    var time = currentTime()
    var t = todoTemplate(todo, false, time)
    addTodo(t)
    saveAllTodos()
})

var todoContainer = document.querySelector('#id-div-container')
todoContainer.addEventListener('click', function(event){
    var target = event.target
    if(target.classList.contains('todo-done')){
        var todoDiv = target.parentElement
        toggleClass(todoDiv, 'done')
        saveAllTodos()
    }else if(target.classList.contains('todo-delete')){
        var todoDiv = target.parentElement
        todoDiv.remove()
        saveAllTodos()
    }
})

var toggleClass = function(element, className){
    if(element.classList.contains(className)){
        element.classList.remove(className)
    }else{
        element.classList.add(className)
    }
}

var loadAllTodos = function(){
    todos = load()
    for(var i = 0; i < todos.length; i++){
        content = todos[i].content
        done = todos[i].done
        time = todos[i].time
        t = todoTemplate(content, done, time)
        addTodo(t)
    }
}

loadAllTodos()
