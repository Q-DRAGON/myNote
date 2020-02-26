// 注意, 这个是基于 node 官网的例子修改的 https://nodejs.org/zh-cn/about/
// 因为 history.pushState 在 file 协议下使用有限制, 所以我们起一个 http 服务
// 注意因为只需要起一个非常简单的服务, 所以使用标准库的 http 模块就可以

// 这里的代码如果不能看懂没有关系

// http 模块用来发送 http 请求
// 官网文档 https://nodejs.org/dist/latest-v12.x/docs/api/http.html
// 文档不建议看, 强行看的话不答疑

const http = require('http')
const fs = require('fs')

const configuredServer = () => {
    const server = http.createServer((request, response) => {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html')

        // 读取 spa_history.html 文件的内容并且发送给客户端
        let html = fs.readFileSync('spa_history.html')
        response.end(html)
    })
    return server
}


const __main = () => {
    const server = configuredServer()

    const hostname = '127.0.0.1'
    const port = 5500

    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`)
    })
}

if (require.main === module) {
    __main()
}
