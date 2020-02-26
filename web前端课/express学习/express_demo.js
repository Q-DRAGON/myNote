// express_demo.js 文件
const fs = require('fs')

// 引入 express 并且创建一个 express 实例赋值给 app
const express = require('express')
// 首先引入 bodyParser 这个库
const bodyParser = require('body-parser')
// 这个是 Node 的语法, CommonJS
const { log } = require('./utils')

// {
//     log: log,
// }

// 下面是 ES6 的语法, ES6 Module
// import { log } from './utils'

// HTTP 协议
// 客户端按照约定格式发送请求到服务器
// 服务器处理客户端的请求，按照约定格式发送响应到客户端
// 客户端收到响应并且处理（显示、下载）

const app = express()

const todoList = []

// 配置静态文件目录
app.use(express.static('static'))
// 配置 bodyParser 库
// 这样会把前端发送过来的数据自动用 json 解析
app.use(bodyParser.json())

const sendHtml = (path, response) => {
    let options = {
        encoding: 'utf-8',
    }
    fs.readFile(path, options, (error, data) => {
        log(`读取的 html 文件 ${path} 内容是\n`, data, error)

        // response.send 是把响应发送到客户端
        response.send(data)
    })
}

const sendJSON = (data, response) => {
    let r = JSON.stringify(data, null, 2)
    // response.send 的参数 r 就是 ajax 中 r.response 的值
    response.send(r)
}

// 用 get 定义一个给用户访问的网址
// request 是浏览器发送的请求
// response 是我们要发给浏览器的响应

// 当用户用 GET 方法访问 / 路由的时候, 会执行第二个参数（也就是回调函数）
app.get('/', (request, response) => {
    let path = 'index.html'
    sendHtml(path, response)
})

app.get('/todo/all', (request, response) => {
    sendJSON(todoList, response)
})

const todoAdd = (form) => {
    // 给新增的 todo 加上 id 属性
    // 在 todoList.push 之前
    // 如果 todoList.length 为 0, 说明没有数据
    // todo 的 id 为 1
    // 如果 todoList.length 大于 0, 说明已经有数据
    // todo 的 id 为最后一个元素的 id + 1
    if (todoList.length === 0) {
        form.id = 1
    } else {
        let tail = todoList[todoList.length - 1]
        form.id = tail.id + 1
    }
    todoList.push(form)
    return form
}

// 当用户用 POST 方法访问 /todo/add 的时候, 会执行回调函数
app.post('/todo/add', (request, response) => {
    let form = request.body
    let todo = todoAdd(form)
    sendJSON(todo, response)
})

const todoDelete = (id) => {
    id = Number(id)
    let index = -1
    for (let i = 0; i < todoList.length; i++) {
        let todo = todoList[i]
        if (todo.id === id) {
            index = i
            break
        }
    }

    // 判断 index 的值来查看是否找到了相应的数据
    if (index > -1) {
        // 先保存这个数据
        let t = todoList[index]
        todoList.splice(index, 1)
        return t
    } else {
        // 没找到
        return {}
    }
}

// delete 这个路由函数用了一个叫做动态路由的概念
// 其中 :id 是一个动态的变量
// 它可以匹配如下 url
// /todo/delete/1
// /todo/delete/2

// 甚至下面这种也可以匹配, 只不过是错误的
// /todo/delete/error
app.get('/todo/delete/:id', (request, response) => {
    // 动态路由的变量是通过 request.params.id 的方式获取
    // 注意, 这个值永远是 string 类型
    let id = request.params.id
    log('delete id', id, typeof id)
    let todo = todoDelete(id)
    sendJSON(todo, response)
})

const main = () => {
    // listen 函数的第一个参数是我们要监听的端口
    // 这个端口是要浏览器输入的
    // 默认的端口是 80
    // 所以如果你监听 80 端口的话，浏览器就不需要输入端口了
    // 但是 1024 以下的端口是系统保留端口，需要管理员权限才能使用
    let server = app.listen(5000, () => {
        let host = server.address().address
        let port = server.address().port

        log(`应用实例，访问地址为 http://${host}:${port}`)
    })
}

// 这个是套路写法, 上课会讲
if (require.main === module) {
    main()
}