// Stream 是一个抽象接口，Node
// 中有很多对象实现了这个接口。例如，对http服务器发起请求的request
// 对象就是一个Stream，还有stdout（标准输出）。
//
// Node.js，Stream
// 有四种流类型：
// Readable - 可读操作。
// Writable - 可写操作。
// Duplex - 可读可写操作.Transform - 操作被写入数据，然后读出结果。
//
// 所有的Stream对象都是EventEmitter的实例。常用的事件有：
// data - 当有数据可读时触发。
// end - 没有更多的数据可读时触发。
// error - 在接收和写入过程中发生错误时触发。
// finish - 所有数据已被写入到底层系统时触发。

var fs = require('fs')
var data = ''
var str = 'hello node.js'
//
// var options = {
//     encoding: 'utf-8',
//     flag: 'w'
// }

// fs.writeFile('input.txt', str, options, function (err) {
//     if(err != null){
//         console.log('** write failure')
//     }else{
//         console.log('write ok')
//     }
// })

var readerStream = fs.createReadStream('input.txt')
readerStream.setEncoding('utf-8')

readerStream.on('data', function(content){
    data += content
})

readerStream.on('end',function(){
    console.log(data);
});

readerStream.on('error', function(err){
    console.log(err.stack);
});

var writersStream = fs.createWriteStream('output.txt')
writersStream.write(str, 'utf-8')
writersStream.end()

writersStream.on('finish', function(){
    console.log('写入完成')
})

writersStream.on('error', function (err){
    console.log(err.stack)
})

console.log("程序执行完毕");