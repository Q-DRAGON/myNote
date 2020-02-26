// XDM 跨文档消息传送，来自不同域的页面间相互传送消息
// 1.页面和其打开的新窗口的数据传递
// 2.多窗口之间消息传递
// 3.页面与嵌套的iframe消息传递
// 4.上面三个问题的跨域数据传递
// postMessage(message, dominate)一条消息和一个表示消息接收方来自哪个域的字符串
var iframeWindow = document.getElmentById('myframe').contentWindow
iframeWindow.postMessage('a secret', 'http://www.wrocx.com')
// 接收到 XDM 消息时，会触发 window 对象的 message 事件。
// onmessage事件对象(
// data：postMessage发送的信息
// origin  postMessage来自哪个文档域
// source 发送消息的文档的对象
// )
window.addEventListener('message', function (event) {
    if (event.origin == 'http://www.wrox.com') {
        processMessage(event.data)
        event.source.postMessage('Recieved', 'http://p2p.wrox.com')
    }
})


// JSON序列化
// 支持对象
//  简单值:使用与 JavaScript 相同的语法，可以在 JSON 中表示字符串、数值、布尔值和 null。
// 但 JSON 不支持 JavaScript 中的特殊值 undefined。
//  对象:对象作为一种复杂数据类型，表示的是一组无序的键值对儿。而每个键值对儿中的值可
//    以是简单值，也可以是复杂数据类型的值。
//  数组:数组也是一种复杂数据类型，表示一组有序的值的列表，可以通过数值索引来访问其中
// 的值。数组的值也可以是任意类型——简单值、对象或数组。
// 在序列化的时候，new Date()类型，将会自动变成JSON字符串格式，因此在反序列化的时候要
// 记得重新定义date

var now = new Date()
var strNow = now.toJSON()
var newNow = new Date(strNow)
var adjust = (String(now) == Stirng(newNow))

// Ajax
// 在使用 XHR 对象时，要调用的第一个方法是 open()，它接受 3 个参数:要发送的请求的类型
// ("get"、"post"等)、请求的 URL 和表示是否异步发送请求的布尔值
/*
 responseText:作为响应主体被返回的文本。
 responseXML:如果响应的内容类型是"text/xml"或"application/xml"，这个属性中将保
  存包含着响应数据的 XML DOM 文档。
 status:响应的 HTTP 状态。
 statusText:HTTP 状态的说明。
*/
//ajax readyState的五种状态详解
// 0 － （未初始化）还没有调用open()方法
// 1 － （载入）。已经调用 open()方法，但尚未调用 send()方法
// 2 － （载入完成）send()方法执行完成，
// 3 － （交互）正在解析响应内容
// 4 － （完成）响应内容解析完成，可以在客户端调用了
// 只要 readyState 属性的值由一个值变成另一个值，都会触发一次 readystatechange 事件。
// 可 以利用这个事件来检测每次状态变化后 readyState 的值。
// 使用get请求时候要对url进行编码
// encodeURIComponent(url)
// 新特性
// FormData


var form = document.getQuerySelector('.myform')
xhr.send(new FormData(form))
// overrideMimeType()方法,，用于重写 XHR 响应的 MIME 类型
xhr.overrideMimeType('text/html')
// onload代替onreadystatechange
// progress事件
xhr.onprogress = function (event) {

}
divStatus.innerHTML = "Received " + event.position + " of " + event.totalSize + " bytes";

var ajax = function (method, path, headers, data, runCallBack) {
    var xhr = new XMLHttpRequest()
    xhr.open(method, path, true)
    xhr.setRequestHeader(headers[0], headers[0].value)
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            // var response = JSON.parse(xhr.responseText)
            runCallBack(xhr)
        }
    }
    xhr.send(data)
}
// 调用 getAllResponseHeaders()方法则可以取得一个包含所有头部信息的长字符串
var myHeader = xhr.getResponseHeader('myheader')
var allHeaders = xhr.getALLResponseHeaders()


// 函数绑定

var handler = {
    message: "Event handled",
    handleClick: function (event) {
        alert(this.message);
    }
};
var btn = document.getElementById("my-btn");
EventUtil.addHandler(btn, "click", handler.handleClick)
// 上述代码运行回显示undefined，因为this是 btn

//// DEBUG: 加一个闭包
EventUtil.addHandler(btn, "click", function (event) {
    handler.handleClick(event);
});

// or
function bind(fn, context) {
    return function () {
        reuturn
        fn.apply(context, arguments)
    }
}

EventUtil.addHandler(btn, "click", bind(handler.handleClick, handler));
// or
EventUtil.addHandler(btn, 'click', handled.handleClick.bind(handled))


// 新特性
// 解构赋值
let [first, second, third] = [1, 2, 3]
let [, , third] = [1, 2, 3]
let [first, ...last] = [1, 2, 3]
let {name, age} = {name: "lisi", age: '20'}

//Rest
function f(x, ...y) {
    return x * y.length;
}

f(3, "hello", true) == 6

//Spread
function f(x, y, z) {
    return x + y + z;
}

f(...[1, 2, 3]) == 6

