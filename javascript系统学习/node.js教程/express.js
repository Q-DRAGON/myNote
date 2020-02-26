var express = require('express')
var fs = require('fs')
var multer = require('multer')
var bodyParser = require('body-parser')

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({extended: false})

var app = express()
app.use(express.static('static'))


// req.app：当callback为外部文件时，用req.app访问express的实例
// req.baseUrl：获取路由当前安装的URL路径
// req.body / req.cookies：获得「请求主体」/ Cookies
// req.fresh / req.stale：判断请求是否还「新鲜」
//     req.hostname / req.ip：获取主机名和IP地址
// req.originalUrl：获取原始请求URL
// req.params：获取路由的parameters
// req.path：获取请求路径
// req.protocol：获取协议类型
// req.query：获取URL的查询参数串
// req.route：获取当前匹配的路由
// req.subdomains：获取子域名
// req.accepts()：检查可接受的请求的文档类型
// req.acceptsCharsets / req.acceptsEncodings / req.acceptsLanguages：返回指定字符集的第一个可接受字符编码
// req.get()：获取指定的HTTP请求头
// req.is()：判断请求头Content-Type的MIME类型
//
// Response 对象 - response 对象表示 HTTP 响应，即在接收到请求时向客户端发送的 HTTP 响应数据。常见属性有：
//
// res.app：同req.app一样
// res.append()：追加指定HTTP头
// res.set()在res.append()后将重置之前设置的头
// res.cookie(name，value [，option])：设置Cookie
// opition: domain / expires / httpOnly / maxAge / path / secure / signed
// res.clearCookie()：清除Cookie
// res.download()：传送指定路径的文件
// res.get()：返回指定的HTTP头
// res.json()：传送JSON响应
// res.jsonp()：传送JSONP响应
// res.location()：只设置响应的Location HTTP头，不设置状态码或者close response
// res.redirect()：设置响应的Location HTTP头，并且设置状态码302
// res.send()：传送HTTP响应
// res.sendFile(path [，options] [，fn])：传送指定路径的文件 -会自动根据文件extension设定Content-Type
// res.set()：设置HTTP头，传入object可以一次设置多个头
// res.status()：设置HTTP状态码
// res.type()：设置Content-Type的MIME类型


// app.get('/', function(request, response){
//     console.log('rqeust的内容详情:' +
//         'app:%s' +
//         'baseUrl:%s' +
//         'body:%s',
//         request.app, request.baseUrl, request.body)
//     response.send('hello world')
// })
//
// var server = app.listen(8081, function(){
//     var host = server.address().address
//     var port = server.address().port
//     console.log('你访问的url:http//%s:%s', host, port)
// })

//
// POST 方法
//
// 以下实例演示了在表单中通过 POST 方法提交两个参数，我们可以使用 server.js 文件内的 process_post 路由器来处理输入：
// index.htm 文件代码：
// <html>
// <body>
// <form action="http://127.0.0.1:8081/process_post" method="POST">
//     First Name: <input type="text" name="first_name">  <br>
//
//     Last Name: <input type="text" name="last_name">
//     <input type="submit" value="Submit">
//     </form>
//     </body>
//     </html>

// app.get('/index.html', function(request, response){
//     response.sendFile(__dirname + '/' + "index.html")
// })
//
// app.post('/process_post', urlencodedParser, function(request, response){
//     var res = {
//         "first_name": request.body.first_name,
//         "last_name": request.body.last_name
//     }
//     console.log(res)
//     response.end(JSON.stringify(response))
// })
//
// var server = app.listen(8081, function(){
//     var host = server.address().address
//     var port = server.address().port
//     console.log("http://%s:%s", host, port)
// })


// 文件上传:
//
// 以下我们创建一个用于上传文件的表单，使用 POST 方法，表单 enctype 属性设置为 multipart/form-data。
// index.htm 文件代码：
// <html>
// <head>
// <title>文件上传表单</title>
// </head>
// <body>
// <h3>文件上传：</h3>
// 选择一个文件上传: <br />
// <form action="/file_upload" method="post" enctype="multipart/form-data">
//     <input type="file" name="image" size="50" />
//     <br />
//     <input type="submit" value="上传文件" />
//     </form>
//     </body>
//     </html>

// app.use(urlencodedParser)
// app.use(multer({dest: '/tmp/'}).array('image'))
//
// app.get('/index.html', function (request, response) {
//     response.sendFile(__dirname + '/template/' + "index.html")
// })
//
// app.post('/file_upload', function (request, response) {
//     // 上传文件的信息
//     console.log(request.files[0])
//     var des_file = __dirname + '/' + request.files[0].originalname
//     fs.readFile(request.files[0].path, function (err, data) {
//         fs.writeFile(des_file, data, function (err) {
//             if (err) {
//                 console.log(err)
//             } else {
//                 res = {
//                     message: "file uploaded successfully",
//                     filename: request.files[0].originalname
//                 }
//             }
//             console.log(res)
//             response.end(JSON.stringify(res))
//         })
//     })
// })
//
// var server = app.listen(8081, function () {
//     var host = server.address().address
//     var port = server.address().port
//     console.log("应用实例，访问地址为 http://%s:%s", host, port)
// })

// Cookie 管理:
//
// 我们可以使用中间件向 Node.js 服务器发送 cookie 信息，
// 以下代码输出了客户端发送的 cookie 信息：
// var cookieParser = require('cookie-parser')
// app.use(cookieParser)
//
// app.get('/', function(request, response){
//     console.log('cookies', request.cookies)
// })
//
// app.listen(8081)
