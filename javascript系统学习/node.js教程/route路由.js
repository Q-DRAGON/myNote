var http = require('http')
var url = require('url')

function start(){
    function onRequest(request, response){
        var pathname = url.parse(request.url).pathname
        console.log("reqeust for" + "pathname" + "received")
        response.writeHead(200, {'Content-Type': "text/plain"})
        response.write('the first request')
        response.end()
    }
    http.createServer(onRequest).listen(8011)
    console.log('server is started')
}

// 再使用http创建的onRequest函数中，request对路由的解析：
// http://localhost:8888/start?foo=bar&hello=world
// url.parse(string).query
// url.parse(string).pathname
// url.parse(string)["foo"]
// url.parse(string).query{"helloWorld"}

