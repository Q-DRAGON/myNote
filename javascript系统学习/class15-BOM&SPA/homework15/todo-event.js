/**
 * Created by Administrator on 2017/10/18.
 */
var log = function(){
    console.log.apply(console, arguments)
}

var bindEvent_CreateTodo = function(){
    var button = document.querySelector('#button-todo-add')
    button.addEventListener('click', function(){
        var todo = create_todo()
        var todoList = make_todo_returnList(todo)
        save_todos(todoList)
    })
}

var bindEvent_DeleteTodo = function(){
    log('delete', document)
    var DeleteButtons = document.querySelectorAll('.todo-cell-delete')
    log('delete', DeleteButtons)
    for(var i = 0; i < DeleteButtons.length; i++){
        DeleteButtons[i].addEventListener('click', function(event){
            var target = event.target
            var edit_target = target.parentElement
            var id = edit_target.querySelector('.todo-cell-id')
            delete_todos(id)
        })
    }
}

var bindEvent_EditTodo = function(){
    var EditButtons = document.querySelectorAll('.todo-cell-edit')
    for(var i = 0; i < EditButtons.length; i++){
        EditButtons[i].addEventListener('click', function(event){
            var target = event.target
            var edit_target = target.parentElement
            edit_target.insertAdjacentHTML('beforeend', `
                <input type="text" value="" class="new-content">
            `)
            var id = edit_target.querySelector('.todo-cell-id')
            var inputContent = edit_target.querySelector('.new-content')
            var content = inputContent.value
            edit_todos(id, content)
            delete content
        })
    }
}

var toggleClass = function(className, selector){
    if(selector.classList.contains(className)){
        selector.classList.remove(className)
    }else{
        selector.classList.add(className)
    }
}

var bindEvent_DoneTodo = function(){
    var StatusButtons = document.querySelectorAll('.todo-cell-done')
    for(var i = 0; i < StatusButtons.length; i++){
        StatusButtons[i].addEventListener('click', function(event){
            var done = event.target
            var status = done.innerText
            if(status == '代做'){
                status = '完成'
            }else{
                toggleClass('todo-done', done)
                status = '代做'
            }
        })
    }
}

var todoTab = document.querySelectorAll('.todo-tab')

var bindAll = function(){
    for(var i = 0; i < todoTab.length; i++){
        todoTab[i].addEventListener('click', function(event){
            var button = event.target
            var page = button.dataset.page
            log('page', page)
            showPage(page)
            pushState(page)
        })
    }
    window.addEventListener('popstate', function(event){
        var state = event.state
        var pageName = state.page
        log('state.page', pageName)
        showPage(pageName)
    })
    bindEvent_CreateTodo()
    bindEvent_DeleteTodo()
    bindEvent_DoneTodo()
    bindEvent_EditTodo()
}

var showPage = function(className){
    var pages = document.querySelectorAll('.todo-page')
    for(var i = 0; i < pages.length; i++){
        let page = pages[i]
        page.classList.add('todo-hide')
    }
    var selector = '.' + className
    var todoDiv = document.querySelector(selector)
    //log('showPage todoDiv', todoDiv)
    //log('showPage selector', selector)
    todoDiv.classList.remove('todo-hide')
    var todoList = load_todos()
    //log('todoList', todoList)
    if(className == 'todo-list') {
        insertTodoList(todoList)
    }
    if(className == 'todo-edit'){
        insertTodoEdit(todoList)
    }
}

var pushState = function(className){
    var state = {
        page: className
    }
    var pageName = className.split('-')[1]
    var url = '?page=' + pageName
    history.pushState(state, 'title', url)
    document.title = pageName
}

var __main = function(){
    bindAll()
    //bindEvent_CreateTodo()
    //bindEvent_DeleteTodo()
    //bindEvent_DoneTodo()
    //bindEvent_EditTodo()
}

__main()



