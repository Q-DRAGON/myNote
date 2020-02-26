// Node.js 有多个内置的事件，我们可以通过引入 events 模块，
// 并通过实例化 EventEmitter 类来绑定和监听事件
// EventEmitter的好处是： 一直接受请求而不等待任何读写操作
// 在事件驱动模型中，会生成一个主循环来监听事件，当检测到事件时触发回调函数。
// 一个事件可以对应多个监听器listener

// 引入 events 模块，事件驱动模型中
var events  = require('events')
// 创建 eventEmitter 对象, 主循环来监听事件
var eventEmitter = new events.EventEmitter()

// 以下程序绑定事件处理程序:
// 绑定事件及事件的处理程序
// eventEmitter.on('eventName', evenetHandler)

// 我们可以通过程序触发事件：
// 触发事件
// eventEmitter.emit('eventName');

// 实例:
// 创建事件处理程序:
var connectHandler = function connected(){
    console.log('连接成功')
    eventEmitter.emit('data_received')
}

eventEmitter.on('connection', connectHandler)

eventEmitter.emit('connection')

eventEmitter.on('data_received', function(){
    console.log('数据接收成功')
})

console.log('程序执行完毕')

// Node.js 所有的异步 I/O 操作在完成时都会发送一个事件到事件队列。
// Node.js里面的许多对象都会分发事件
// ：一个net.Server对象会在每次有新连接时分发一个事件，
// 一个fs.readStream对象会在文件被打开的时候发出一个事件。
// 所有这些产生事件的对象都是 events.EventEmitter 的实例。


// EventEmitter 对象如果在实例化时发生错误，会触发 error 事件。
// 当添加新的监听器时，newListener 事件会触发，
// 当监听器被移除时，removeListener 事件被触发。

eventEmitter.on('some_event', function(){
    console.log('some_event事件触发')
})

setTimeout(function(){
    eventEmitter.emit('some_event')
}, 1000)

// 用法:

// addListener(event, listener)
// 为指定事件添加一个监听器到监听器数组的尾部。

// on(event, listener)
// 为指定事件注册一个监听器，接受一个字符串 event 和一个回调函数。

// once(event, listener)
// 为指定事件注册一个单次监听器，即 监听器最多只会触发一次，
// 触发后立刻解除该监听器。

// server.once('connection', function (stream) {
//     console.log('Ah, we have our first user!');
// });

// removeListener(event, listener)
// 移除指定事件的某个监听器，监听器必须是该事件已经注册过的监听器。
// 它接受两个参数，第一个是事件名称，第二个是回调函数名称。

// removeAllListeners([event])
// 移除所有事件的所有监听器， 如果指定事件，则移除指定事件的所有监听器。

// setMaxListeners(n)
// 默认情况下， EventEmitters 如果你添加的监听器超过 10 个就会输出警告信息。 setMaxListeners 函数用于提高监听器的默认限制的数量。

// listeners(event)
// 返回指定事件的监听器数组。

// emit(event, [arg1], [arg2], [...])
// 按参数的顺序执行每个监听器，如果事件有注册监听返回 true，否则返回 false。

// listenerCount(emitter, event)
// 返回指定事件的监听器数量。

var http = require('http')

var server = http.createServer(function(request, response){
    response.writeHead(200, {'Content-Type': 'text/plain'})
    var data = 'hello world'
    response.end(data)
}).listen(1081)


server.once('connection', function(stream){
    console.log('an, we have our first user!')
})

var callback = function(stream){
    console.log('someone connected')
}

server.on('connection', callback)

server.removeListener('connection', callback)

