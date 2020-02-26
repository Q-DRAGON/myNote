/*
Promise 是抽象异步处理对象以及对其进行各种操作的对象
简而言之，就是让异步操作变得好看一些

Promise 的用法如下
*/

// 将 fs.readFile 的操作封装成 promise，
// 这样就可以使用 promise 的 api 了
const fs = require('fs')

const readFile = (filename) => {
    // 一般前端的写法
    // return new Promise((resolve, reject) => {})
    let p = new Promise((resolve, reject) => {
        let options = {
            encoding: 'utf8',
        }
        fs.readFile(filename, options, (error, content) => {
            if (error != null) {
                reject(error)
            } else {
                resolve(content)
            }
        })
    })
    return p
}

const log = console.log.bind(console)

// 使用 promise 读取文件就不用写成回调的形式了
// 直接按照同步的写法就好了
// 可以无限 then，只要你保证上一个 then 返回了东西即可
let promise = readFile('foo.txt')
promise.then((content) => {
    log('file content', content)
    let c = content + ' suffix1'
    return c
}, (error) => {
    log('error message', error)
}).then((c1) => {
    log('second then', c1)
    let c = c1 + ' suffix2'
    return c
}).then((c) => {
    log('third then', c)
})

// 上面的写法也可以写成下面这样
// 把 reject 的操作放在 catch 里面
promise.then((content) => {
    log('file content', content)
}).catch((error) => {
    log('error message', error)
})

// 有时候会碰到批量执行异步操作，如果直接用循环 + 调用函数的形式会比较麻烦
// 使用 Promise.all 就很方便了
// all 方法是直接挂在 Promise 类上的，而 then catch 这些方式是挂在原型上的
let fileList = [
    '1.txt',
    '2.txt',
    '3.txt',
]
let list = fileList.map((item) => {
    let r = readFile(item)
    return r
})
//
// 数组.map 相当于下面的写法
// let list = []
// for (var i = 0; i < fileList.length; i++) {
//     var f = fileList[i]
//     list.push(f)
// }
Promise.all(list).then((content) => {
    log('content', content)
})
/*
这是一个完整的参考, 如果有兴趣以后可以翻翻看, 但是现在没必要看了
http://liubin.org/promises-book/
*/
