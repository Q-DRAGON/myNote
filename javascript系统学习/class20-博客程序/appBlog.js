'use strict';
var express = require('express')
var app = express()
var bodyParser = require('body-parser')

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json())

// 配置静态文件目录
//app.use是用来给path注册中间函数的，这个path默认是'/'，
// 也就是处理任何请求，同时要注意的是他会处理path下的子路径，比如如果设置path为'/hello'，
// 那么当请求路径为'/hello/'，'/hello/nihao','/hello/bye'这样的请求都会交给中间函数处理的。
// 传递一个包含静态资源的目录给 express.static 中间件用于立刻开始提供文件。
// 比如用以下代码来提供public目录下的图片、css文件和javascript文件：
// app.use(express.static('public'));
// 你可以加载 public目录下的文件了：
// http://localhost:3000/images/kitten.jpg http://localhost:3000/css/style.css
// 一次html中写href,link的时候记住路径不要在写static，直接写/css/...., /js/....
app.use(express.static('static'))
//将静态文件目录设置为项目根目录+/public，当然你也可能是这么写的
//app.use(express.static(path.join(__dirname, 'static')));
//var sendHtml = function(path, response) {
//    var fs = require('fs')
//    var options = {
//        encoding: 'utf-8'
//    }
//    path = './template/' + path
//    fs.readFile(path, options, function(err, data){
//        console.log(`读取的html文件 ${path}`)
//        response.send(data)
//    })
//}

//app.get('/blog', function(request, response){
//    console.log('query', request.query)
//    var path = 'blog_detail.html'
//    sendHtml(path, response)
//})

const routeComment = require('./routes/comment.js')
const routeBlog = require('./routes/blog.js')
const routeIndex = require('./routes/index.js')

const registerRoutes = function(routes, app){
    for(var i = 0; i < routes.length; i++){
        var route = routes[i]
        console.log('route', route)
        if(route.method == 'get'){
            app[route.method](route.path, route.func)
        }else{
            app[route.method](route.path, urlencodedParser, route.func)
        }
    }
}

registerRoutes(routeComment.routes, app)
registerRoutes(routeBlog.routes, app)
registerRoutes(routeIndex.routes, app)

var server = app.listen(8081, function(){
    var host = server.address().address
    var port = server.address().port
    console.log('url:http://www.%s:%s', host, port)
})
