// 在浏览器 JavaScript 中，通常 window 是全局对象，
// 而 Node.js 中的全局对象是 global，
// 所有全局变量（除了 global 本身以外）都是 global 对象的属性。


// __filename 表示当前正在执行的脚本的文件名。它将输出文件所在位置的绝对路径，
// 且和命令行参数所指定的文件名不一定相同。 如果在模块中，返回的值是模块文件的路径。

console.log(__filename)

console.log(__dirname)

// setTimeout(cb, ms) 全局函数在指定的毫秒(ms)数后执行指定函数(cb)。：setTimeout() 只执行一次指定函数。
// 返回一个代表定时器的句柄值。

function printHello(){
    console.log(__dirname)
}

setTimeout(printHello, 2000)
clearTimeout(t);

// clearTimeout( t ) 全局函数用于停止一个之前通过 setTimeout() 创建的定时器。
// 参数 t 是通过 setTimeout() 函数创建的定时器。

// setInterval(cb, ms)
// setInterval(cb, ms) 全局函数在指定的毫秒(ms)数后执行指定函数(cb)。
// 返回一个代表定时器的句柄值。可以使用 clearInterval(t) 函数来清除定时器。
// setInterval() 方法会不停地调用函数，直到 clearInterval() 被调用或窗口被关闭。

// console:
// console 用于提供控制台标准输出，
// 它是由 Internet Explorer 的 JScript 引擎提供的调试工具，
// 后来逐渐成为浏览器的实施标准。Node.js 沿用了这个标准，提供与习惯行为一致的 console 对象，
// 用于向标准输出流（stdout）或标准错误流（stderr）输出字符。

console.info("程序开始执行：");

var counter = 10;
console.log("计数: %d", counter);

console.time("获取数据");
//
// 执行一些代码
//
console.timeEnd('获取数据');

console.info("程序执行完毕。")

// 执行 main.js 文件，代码如下所示:
//
//     $ node main.js
// 程序开始执行：
// 计数: 10
// 获取数据: 0ms
// 程序执行完毕

// process 是一个全局变量，即 global 对象的属性。
// 它用于描述当前Node.js 进程状态的对象，提供了一个与操作系统的简单接口。
// 通常在你写本地命令行程序的时候，少不了要 和它打交道。
// 下面将会介绍 process 对象的一些最常用的成员方法。

