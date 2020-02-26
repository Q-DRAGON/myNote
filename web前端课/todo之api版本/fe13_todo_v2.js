// const log = console.log.bind(console)

// const e = selector => document.querySelector(selector)

const appendHtml = (element, html) => element.insertAdjacentHTML('beforeend', html)

const ajax = (method, path, data, callback) => {
    let r = new XMLHttpRequest()
    r.open(method, path, true)
    r.setRequestHeader('Content-Type', 'application/json')
    r.onreadystatechange = () => {
        if (r.readyState === 4) {
            callback(r.response)
        }
    }
    r.send(data)
}

const insertInput = () => {
    let t = `
        <div>
            <input type="text" id="id-input-task">
            <button id="id-button-add" class="todo-add">add button</button>    
        </div>
    `
    let element = e('#id-div-todo-container')
    appendHtml(element, t)
}

const insertCss = () => {
    let t = `
        <style>
            .todo-cell {
                outline: 1px solid #b3aeae;
                padding: 10px 5px;
                margin: 8px 0;
            }
            
            button {
                padding: 8px 4px;
                border-radius: 5px;
            }
        </style>   
    `
    let element = e('head')
    appendHtml(element, t)
}

const templateTodo = (todo) => {
    // ES6 对象解包语法
    let { task, id } = todo
    // 相当于
    // let task = todo.task
    let t = `
        <div class="todo-cell" data-id="${id}">
            <button class="todo-delete">delete</button>
            <button class="todo-edit">edit</button>
            <span class="todo-task">${task}</span>
        </div>
    `
    return t
}

const insertTodo = (todo) => {
    let container = e('#id-div-todo-container')
    let html = templateTodo(todo)
    appendHtml(container, html)
}

const insertTodos = (todos) => {
    // for of 是 es6 的语法
    for (let t of todos) {
        insertTodo(t)
    }
}

const apiGet = (path, callback) => {
    let url = 'https://www.kuaibiancheng.com/sandbox/todo/3587405093' + path
    ajax('GET', url, '', (r) => {
        let data = JSON.parse(r)
        callback(data)
    })
}

const apiPost = (path, data, callback) => {
    let url = 'https://www.kuaibiancheng.com/sandbox/todo/3587405093' + path
    data = JSON.stringify(data)
    ajax('POST', url, data, (r) => {
        let d = JSON.parse(r)
        callback(d)
    })
}

const apiTodoAll = (callback) => {
    let path = '/all'
    apiGet(path, callback)
}

const apiTodoAdd = (data, callback) => {
    let path = '/add'
    apiPost(path, data, callback)
}

const apiTodoDelete = (todoId, callback) => {
    let path = '/delete/' + todoId
    apiGet(path, callback)
}

const apiTodoUpdate = (todoId, data, callback) => {
    let path = '/update/' + todoId
    apiPost(path, data, callback)
}


const loadTodo = () => {
    apiTodoAll((todos) => {
        insertTodos(todos)
    })
}

const bindEventDelete = () => {
    let container = e('#id-div-todo-container')
    container.addEventListener('click', (event) => {
        let self = event.target
        if (self.classList.contains('todo-delete')) {
            // log('delete button')
            // 拿到 todo_id
            let todoCell = self.closest('.todo-cell')
            let todoId = todoCell.dataset.id
            apiTodoDelete(todoId, (todo) => {
                // 删除后, 从页面移除
                todoCell.remove()
            })
        }
    })
}

const bindEventEdit = () => {
    let container = e('#id-div-todo-container')
    container.addEventListener('click', (event) => {
        let self = event.target
        if (self.classList.contains('todo-edit')) {
            // log('edit button')
            let todoCell = self.closest('.todo-cell')
            let task = todoCell.querySelector('.todo-task')
            // log('task', task)
            task.contentEditable = true
            task.focus()
        }
    })
}

const actionAdd = () => {
    // log('button click')
    // 获取 input 的输入
    let input = e('#id-input-task')
    let value = input.value
    // 组装成对象
    let data = {
        task: value,
    }
    apiTodoAdd(data, (todo) => {
        insertTodo(todo)
    })
}

const bindEventDelegates = () => {
    let container = e('#id-div-todo-container')
    container.addEventListener('click', (event) => {
        let self = event.target
        if (self.classList.contains('todo-add')) {
            actionAdd()
        } else if (self.classList.contains('todo-delete')) {
            // actionDelete()
        } else if (self.classList.contains('todo-edit')) {
            // actionEdit()
        }
    })
}

const bindEventUpdate = () => {
    let container = e('#id-div-todo-container')
    // 绑定 keydown 事件, 当用户按键的时候触发
    container.addEventListener('keydown', (event) => {
        let self = event.target
        if (self.classList.contains('todo-task')) {
            // 按了回车键
            if (event.key === 'Enter') {
                log('key down')
                // 取消事件的默认行为, 回车键会在编辑标签内容的时候默认换行
                event.preventDefault()
                self.contentEditable = false
                let todoCell = self.closest('.todo-cell')
                let todoId = todoCell.dataset.id
                let data = {
                    task: self.innerHTML,
                }
                apiTodoUpdate(todoId, data, (todo) => {
                    log('todo', todo)
                })
            }
        }
    })
}

const bindEvents = () => {
    // bindEventAdd()
    bindEventDelegates()
    bindEventDelete()
    bindEventEdit()
    bindEventUpdate()
}


const __main = () => {
    insertInput()
    insertCss()
    bindEvents()
    loadTodo()
}

__main()