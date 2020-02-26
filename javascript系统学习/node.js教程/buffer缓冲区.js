// buffer创建方法
//但在处理像TCP流或文件流时，必须使用到二进制数据。
// 因此在 Node.js中，定义了一个 Buffer 类，
// 该类用来创建一个专门存放二进制数据的缓存区。
// Buffer 类是随 Node 内核一起发布的核心库。
// Buffer 库为 Node.js 带来了一种存储原始数据的方法，
// 可以让 Node.js 处理二进制数据，
// 每当需要在 Node.js 中处理I/O操作中移动的数据时，
// 就有可能使用 Buffer 库。
// 原始数据存储在 Buffer 类的实例中。
// 一个 Buffer 类似于一个整数数组，
// 但它对应于 V8 堆内存之外的一块原始内存。
// var buf1 = new Buffer(10)

// var buf2 = new Buffer([10, 20, 30])

// var buf3 = new Buffer("www.runoob.com", 'utf-8')

// 写入 Node 缓冲区的语法如下所示：
// string - 写入缓冲区的字符串。
// offset - 缓冲区开始写入的索引值，默认为 0 。
// length - 写入的字节数，默认为 buffer.length
// encoding - 使用的编码。默认为 'utf8'
// buf.write(string[, offset[, length]][, encoding])

// 最多存储246个二进制字节
buf = new Buffer(246)
// 写入了14个字节长度的字符串
len = buf.write('www.runoob.com')
console.log('写入字节数: ' + len)


// 读取 Node 缓冲区数据的语法如下所示：
// buf.toString([encoding[, start[, end]]])
// encoding - 使用的编码。默认为 'utf8' 。
// start - 指定开始读取的索引位置，默认为 0。
// end - 结束位置，默认为缓冲区的末尾。

buf1 = new Buffer(26)
for(var i = 0; i < 26; i++){
    buf[i] = i + 97
}

console.log( buf.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
console.log( buf.toString('ascii',0,5));   // 输出: abcde
console.log( buf.toString('utf8',0,5));    // 输出: abcde
console.log( buf.toString(undefined,0,5)); // 使用 'utf8' 编码, 并输出: abcde

// 将 Node Buffer 转换为 JSON 对象的函数语法格式如下：
// buf.toJSON()

var buf3 = new Buffer('www.runoob.com')
var json = buf3.toJSON(buf3)
console.log(json)

// Node 缓冲区合并的语法如下所示：
// Buffer.concat(list[, totalLength])
// list - 用于合并的 Buffer 对象数组列表。
// totalLength - 指定合并后Buffer对象的总长度。

var buffer1 = new Buffer('菜鸟教程 ');
var buffer2 = new Buffer('www.runoob.com');
var buffer3 = Buffer.concat([buffer1,buffer2]);
console.log("buffer3 内容: " + buffer3.toString());

// Node Buffer 比较的函数语法如下所示, 该方法在 Node.js v0.12.2 版本引入：
// buf.compare(otherBuffer);
var buffer4 = new Buffer('ABC');
var buffer5 = new Buffer('ABCD');
var result = buffer1.compare(buffer2);

if(result < 0) {
    console.log(buffer1 + " 在 " + buffer2 + "之前");
}else if(result == 0){
    console.log(buffer1 + " 与 " + buffer2 + "相同");
}else {
    console.log(buffer1 + " 在 " + buffer2 + "之后");
}

// Node 缓冲区拷贝语法如下所示：
// buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])
var buffer6 = new Buffer('ABC');
// 拷贝一个缓冲区
var buffer7 = new Buffer(3);
buffer1.copy(buffer2);
console.log("buffer2 content: " + buffer2.toString());

