/**
 * Created by Administrator on 2017/10/17.
 */
var create_todo = function(){
    var todo_content = document.querySelector('#input-todo').value
    var todo = {
        content: todo_content,
        done: false,
    }
    return todo
}

var todo_template_list = function(todo){
    let template = `
        <div class="todo-cell-list">
            <span class="todo-cell-content">${todo.content}</span>
        </div>
    `
    return template
}

var todo_template_edit = function(todo, done){
    var status = '代做'
    if(done){
        status = '完成'
    }
    //log('todo_template', todo)
    let template = `
        <div class="todo-cell-edit-div">
            <span class="todo-cell-id">${todo.id}</span>
            <button class='todo-cell-done' type="button">${status}</button>
            <button class='todo-cell-delete' type="button">delete</button>
            <button class="todo-cell-edit" type="button">edit</button>
            <span class="todo-cell-content">${todo.content}</span>
        </div>
    `
    return template
}

var insertTodoList = function(todoList){
    var todoListDiv = document.querySelector('.todo-list')
    //log('todoListDiv', todoListDiv)
    todoListDiv.innerHTML = ''
    for(var i = 0; i < todoList.length; i++){
        var todo = todoList[i]
        var t = todo_template_list(todo)
        todoListDiv.insertAdjacentHTML('beforeend', t)
    }
}

var insertTodoEdit = function(todoList, done=false){
    var todoEditDiv = document.querySelector('.todo-edit')
    todoEditDiv.innerHTML = ''
    for(var i = 0; i < todoList.length; i++){
        var todo = todoList[i]
        var t = todo_template_edit(todo, done)
        todoEditDiv.insertAdjacentHTML('beforeend', t)
    }
}

