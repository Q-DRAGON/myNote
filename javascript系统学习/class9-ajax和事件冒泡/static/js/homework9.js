/*
 这次作业是一个大作业


 访问 vip.cocode.cc/sandbox
 把你的代码贴到终端中
 实现一个用 ajax 和后端交互数据的 todo


 注意, 本次的作业, 需要你动态构建界面
*/

/*
 todo 后端程序提供了 4 个 API, 说明如下
  1, 获得所有的 todo, 返回的是一个 JSON 格式字符串(数组)

 GET
 https://vip.cocode.cc/sandbox/todo/<你的qq号>/all

 以我为例, 我应该使用下面这个 url 来获取我的所有 todo
 https://vip.cocode.cc/sandbox/todo/3400711034/all
*/

/*
2, 发送 JSON 格式字符串来创建一个 todo
 要求设置 Content-Type 为 application/json

 POST
 {"task": "study"}
 https://vip.cocode.cc/sandbox/todo/<你的qq号>/add
 */


/*
 3, 发送 JSON 格式字符串来更新一个 todo
 要求设置 Content-Type 为 application/json

 POST
 {"task": "study"}
 https://vip.cocode.cc/sandbox/todo/<你的qq号>/update/<todo_id>
*/

/*
 3, 发送 JSON 格式字符串来更新一个 todo
 要求设置 Content-Type 为 application/json

 POST
 {"task": "study"}
 https://vip.cocode.cc/sandbox/todo/<你的qq号>/update/<todo_id>
*/

/*
 4, 删除一个 todo
 GET
 https://vip.cocode.cc/sandbox/todo/<你的qq号>/delete/<todo_id>
*/


var log = function(){
     console.log.apply(console, arguments)
 }

var test = function(){
    var r = new XMLHttpRequest()
    r.open('POST', '/', true)
    r.onreadystatechange = function() {
        log('response', r.responseText)
    }
    r.send()
}

var ajax_todoGet = function(method, path, headers, data){
    var r= new XMLHttpRequest()
    if(headers != null){
        var header = headers.join(',')
        r.setRequestHeader(header)
    }
    r.open(method, path, true)
    r.onreadystatechange = function() {
        if (r.readyState === 4) {
            var todo_get = function (r) {
                log('r', r)
                responseText = r.response
                var container = document.querySelector('#id-div-container')
                if(document.querySelector('.todo-cell') != null){
                    var todo_cell = container.querySelector('.todo-cell')
                    var todo = []
                    for (var i = 0; i < todo_cell.length; i++) {
                        t = todo_cell[i]
                        todo.push(t)
                    }
                    log('todo', todo)
                    return todo
                }

            }
            todo_get(r)
        }
    }
    r.send(data)
}


//ajax_todoGet('GET', '/', null, '')

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

var todoTemplate = function(todo){
    var status = ''
    if(todo['done']){
        status = 'done'
    }
    r = `
        <div class="todo-cell ${status}">
            <span class="col-md-6 text-center text-justify">
            <span class="todo-id">${todo.id}</span>
            <span class="todo-content">${todo.content}</span>
            <span class="todo-time">${todo.time}</span>
            </span>
            <span class="pull-right">
            <button class="todo-complete btn btn-default btn-xs">完成</button>
            <button class="todo-update btn btn-default btn-xs">更新</button>
            <button class="todo-delete btn btn-default btn-xs">删除</button>
            </span>
            <div class="clearfix"></div>
        </div>
    `
    return r
}

var addTodo = function(t){
    var todoContainer = document.querySelector('#id-div-container')
    todoContainer.insertAdjacentHTML('beforeend', t)
}

var addButton = document.querySelector('#id-button-add')

var ajax_todoAdd = function (method, path, data) {
    var dta = {}
    dta['content'] = data
    var time = currentTime()
    dta['time'] = currentTime()
    dta['done'] = false
    var r= new XMLHttpRequest()
    r.open(method, path, true)
    r.setRequestHeader('Content-Type', 'application/json')
    r.onreadystatechange = function() {
        if (r.readyState === 4) {
            var todo_Add = function (r) {
                re = JSON.parse(r.response)
                if(re.success == true){
                    todo = JSON.parse(re.data);
                    t = todoTemplate(todo)
                    addTodo(t)
                } else{
                    todo=''
                    log('error', re.message)
                }
            }
            todo_Add(r)
        }
    }
    r.send(JSON.stringify(dta))
}

addButton.addEventListener('click', function(event) {
    var todoInput = document.querySelector("#id-input-todo")
    var todo = todoInput.value
    var target = event.target
    ajax_todoAdd('post', '/api/todo/add', todo)
})


var ajax_todoDelete = function (method, path) {
    var r= new XMLHttpRequest()
    r.open(method, path, true)
    r.onreadystatechange = function() {
        if (r.readyState === 4) {
            var todo_delete = function (r) {
                re = JSON.parse(r.response)
                if(re.success == true) {
                    id = re.id
                    var todo_span = document.querySelectorAll('span.todo-id')
                    for(var i = 0; i < todo_span.length; i++){
                        if(parseInt(todo_span[i].innerText) === id){
                            var todo = todo_span[i]
                            var todo_cell = todo.parentElement.parentElement
                            todo_cell.remove()
                        }
                    }
                    //var parent = todo_cell.parentElement
                    //parent.removeChild(todo_cell)
                }
            }
            todo_delete(r)
        }
    }
    r.send()
}


var todoContainer = document.querySelector('#id-div-container')

todoContainer.addEventListener('click', function(event){
    target = event.target
    log('target', target)
    if(target.classList.contains('todo-delete')){
        var todo_cell = target.closest('.pull-right').closest('.todo-cell')
        //var todo_parent = target.parentElement
        //var todo_cell = todo_parent.parentElement
        log('todo_cell', todo_cell)
        var todo_span = todo_cell.childNodes[1]
        var todo = todo_span.childNodes[1].innerText
        ajax_todoDelete('post', 'api/todo/delete/' + todo)
    }
})