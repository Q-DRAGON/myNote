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
            <button id="id-button-add" class="todo-add" data-action="todo_add">add button</button>    
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
            <button class="todo-delete" data-action="todo_delete">delete</button>
            <button class="todo-edit" data-action="todo_edit">edit</button>
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

class TodoApi {
    constructor() {
        this.baseUrl = 'https://www.kuaibiancheng.com/sandbox/todo/3587405093'
    }
    get(path, callback) {
        let url = this.baseUrl + path
        ajax('GET', url, '', (r) => {
            let data = JSON.parse(r)
            callback(data)
        })
    }
    post(path, data, callback) {
        let url = this.baseUrl + path
        data = JSON.stringify(data)
        ajax('POST', url, data, (r) => {
            let d = JSON.parse(r)
            callback(d)
        })
    }
    all(callback) {
        let path = '/all'
        this.get(path, callback)
    }
    add(data, callback) {
        let path = '/add'
        this.post(path, data, callback)
    }
    delete(todoId, callback) {
        let path = '/delete/' + todoId
        this.get(path, callback)
    }
    update(todoId, data, callback) {
        let path = '/update/' + todoId
        this.post(path, data, callback)
    }
}

class TodoAction {
    constructor() {
        this.api = new TodoApi()
    }
    add() {
        let input = e('#id-input-task')
        let value = input.value
        // 组装成对象
        let data = {
            task: value,
        }
        // 提前把 api 放在 this 里面, 这里直接拿出来
        log('this', this, this.api)
        let api = this.api
        api.add(data, (todo) => {
            insertTodo(todo)
        })
    }
    delete(event) {
        let self = event.target
        let todoCell = self.closest('.todo-cell')
        let todoId = todoCell.dataset.id
        let api = this.api
        api.delete(todoId, (todo) => {
            // 删除后, 从页面移除
            todoCell.remove()
        })
    }
    edit(event) {
        let self = event.target
        let todoCell = self.closest('.todo-cell')
        let task = todoCell.querySelector('.todo-task')
        task.contentEditable = true
        task.focus()
    }
    update(event) {
        let self = event.target
        event.preventDefault()
        self.contentEditable = false
        let todoCell = self.closest('.todo-cell')
        let todoId = todoCell.dataset.id
        let data = {
            task: self.innerHTML,
        }
        let api = new TodoApi()
        api.update(todoId, data, (todo) => {
            log('todo', todo)
        })
    }
}

const loadTodo = () => {
    let api = new TodoApi()
    api.all((todos) => {
        insertTodos(todos)
    })
}

const bindEventDelegates = () => {
    let container = e('#id-div-todo-container')
    let todoAction = new TodoAction()
    let mapper = {
        todo_add: todoAction.add,
        todo_delete: todoAction.delete,
        todo_edit: todoAction.edit,
    }
    container.addEventListener('click', function(event) {
        let self = event.target
        let action = self.dataset.action
        if (Object.keys(mapper).includes(action)) {
            // 这里需要手动指定 f 里 this 为 todoAction 这个实例
            let f = mapper[action].bind(todoAction)
            // let f = mapper[action]
            f(event)
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
                let todoAction = new TodoAction()
                todoAction.update(event)
            }
        }
    })
}

const bindEvents = () => {
    bindEventDelegates()
    bindEventUpdate()
}

const __main = () => {
    insertInput()
    insertCss()
    bindEvents()
    loadTodo()
}

__main()