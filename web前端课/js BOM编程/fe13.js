/*
网址组成（四部分）
    协议      http, https（https 是加密的 http）
    主机      g.cn  zhihu.com之类的网址
    端口      HTTP 协议默认是 80, HTTPS 协议的默认端口是 443, 因此一般不用填写
    路径      下面的「/」和「/question/31838184」都是路径
http://www.zhihu.com/
http://www.zhihu.com/question/31838184


https://www.zhihu.com/


电脑通信靠IP地址，IP地址记不住就发明了域名（domain name），然后电脑
自动向DNS服务器（domain name server）查询域名对应的IP地址

比如g.cn这样的网址，可以通过电脑的ping程序查出对应 IP 地址
➜    ping g.cn
PING g.cn (203.208.41.55): 56 data bytes



端口是什么？
一个比喻：
用邮局互相写信的时候，ip相当于地址（也可以看做邮编，地址是域名）
端口是收信人姓名（因为一个地址比如公司、家只有一个地址，但是却可能有很多收信人）
端口就是一个标记收信人的数字。
端口是一个 16 位的数字，所以范围是 0-65535（2**16）


web 开发

linux/mac -> windows




——HTTP协议——

一个传输协议，协议就是双方都遵守的规范。
为什么叫超文本传输协议呢，因为收发的是文本信息。
1，浏览器（客户端）按照规定的格式发送文本数据（请求）到服务器
2，服务器解析（浏览器发送的）请求，按照规定的格式返回文本数据（响应）到浏览器
3，浏览器解析得到的数据（响应），并做相应处理

请求和返回是一样的数据格式，分为4部分：
1，请求行或者响应行
2，Header（请求的 Header 中 Host 字段是必须的，其他都是可选）
3，\r\n\r\n（连续两个换行回车符，用来分隔Header和Body）
4，Body（可选）

请求的格式，注意大小写（这是一个不包含Body的请求）：
原始数据如下
'GET / HTTP/1.1\r\nhost:g.cn\r\n\r\n'
打印出来如下
GET / HTTP/1.1
Host: g.cn


其中
1， GET 是请求方法（还有POST等，这就是个标志字符串而已）
2，/ 是请求的路径（这代表根路径）
3，HTTP/1.1  中，1.1是版本号，通用了20年

具体字符串是 'GET / HTTP/1.1\r\nhost:g.cn\r\n\r\n'


返回的数据如下
HTTP/1.1 301 Moved Permanently
Alternate-Protocol: 80:quic,p=0,80:quic,p=0
Cache-Control: private, max-age=2592000
Content-Length: 218
Content-Type: text/html; charset=UTF-8
Date: Tue, 07 Jul 2015 02:57:59 GMT
Expires: Tue, 07 Jul 2015 02:57:59 GMT
Location: http://www.google.cn/
Server: gws
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block



Body部分太长，先不贴了
其中响应行（第一行）：
1，HTTP/1.1 是版本
2，301 是「状态码」，参见文末链接
3，Moved Permanently 是状态码的描述
浏览器会自己解析Header部分，然后将Body显示成网页




--前端掌握 HTTP 协议有什么用--

可以用 JS 动态抓取内容构建页面
比如动态评论、加载数据
比如天气预报程序
比如壁纸图片库
浏览器提供了使用 HTTP 协议收发数据的接口，名为 AJAX
这是一个重要的技术





--浏览器安全问题--
跨域请求问题和解决方案
1. 服务器设置 HTTP 协议头


// AJAX 和使用方法
// ajax 就是浏览器提供的用 js 获取链接内容的 API
// 你可以理解为发送网络请求的标准库

// 获取登录页面
// 创建 AJAX 对象
let r = new XMLHttpRequest()
// 设置请求方法和请求地址
r.open('GET', '/login', true)
// 注册响应函数
r.onreadystatechange = function() {
    console.log('state change', r)
}
// 发送请求
r.send()



// 发送登录数据
let r = new XMLHttpRequest()
// 设置请求方法和请求地址
r.open('POST', '/api/user/login', true)
// 设置发送的数据的格式
r.setRequestHeader('Content-Type', 'application/json')
// 注册响应函数
r.onreadystatechange = function() {
    if (r.readyState === 4) {
        console.log('state change', r, r.status, r.response)
        let response = JSON.parse(r.response)
        console.log('response', response)
    } else {
        console.log('change')
    }
}
// 发送请求
let account = {
    phone: '123',
    password: '123',
}
let data = JSON.stringify(account)
r.send(data)


// 可以封装成这样的一个函数
const ajax = function(method, path, data, responseCallback) {
    // 发送登录数据
    let r = new XMLHttpRequest()
    // 设置请求方法和请求地址
    r.open(method, path, true)
    // 设置发送的数据的格式
    r.setRequestHeader('Content-Type', 'application/json')
    // 注册响应函数
    r.onreadystatechange = function() {
        if (r.readyState === 4) {
            responseCallback(r.response)
        }
    }
    // 发送请求
    r.send(data)
}

let method = 'POST'
let path = '/api/user/login'
// 发送请求
let account = {
    phone: '123',
    password: '123',
}
let data = JSON.stringify(account)
ajax(method, path, data, (r) => {
    log('r is', typeof r, r)
})



// BOM

BOM(browser object model) 包含 5 个东西
location        管理 URL
navigator       管理浏览器
history         管理历史记录
screen          管理屏幕
window          管理浏览器的所有东西




location 对象用来管理 URL 的，下面是例子
改变 href 属性就可以跳转页面
hash: ""
host: "s.taobao.com"
hostname: "s.taobao.com"
href: "https://s.taobao.com/search?q=3ds&imgfile=&js=1&stats_click=search_radio_all&ie=utf8"
search: "?q=3ds&imgfile=&js=1&stats_click=search_radio_all&ie=utf8"
origin: "https://s.taobao.com"
pathname: "/search"
port: ""
protocol: "https:"
reload: 函数, 刷新当前页面
replace: 函数, 替换当前页面, 有参数



navigator 对象是用来查询浏览器的信息的
比如当前的操作系统平台, 浏览器型号厂商等等
例如
navigator.userAgent
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36"
navigator.platform
"MacIntel"



history 对象
在 HTML5 它增加了一些 API 使得它也可以做单页应用（SPA，single page app）

history.length      // 历史列表中的 url 数量

history.back()      // 相当于点击后退按钮
history.forward()   // 相当于点击前进
history.go(-2)      // 相当于点击两次后退按钮

// 下面是 HTML5 新函数

history.pushState(null, 'title', '/profile')
三个参数分别是
    自定义对象
    新页面的标题，但是现在还没有浏览器实现这个功能
    新页面的地址

let state = {
    page: 'settings',
}
history.pushState(state, 'settings', '/settings')

用户点击 前进 后退 按钮的时候，会触发 window 的 popstate 事件
于是可以在这里操作
window.addEventListener('popstate', function(e) {
    let state = e.state
    // state 就是 pushState 的第一个参数
    console.log('pop state', state)
})


还有一个 replaceState 函数，它的作用和 pushState 一样，只是不生成一条历史记录



其他
只能在相同域名下
可以使用 queryString
主要作用是用来做 SPA（single page application 单页应用）
*/
