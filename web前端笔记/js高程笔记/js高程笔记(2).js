/*
BOM(browser object model) 包含5个东西
location        管理 URL
navigator       管理浏览器
history         管理历史记录
screen          管理屏幕
window          管理浏览器所有的东西
*/


//location 对象是用来管理URL的，下面那是例子
//改变 href 属性就可以跳转页面
//hash: ""
//host: "s.taobao.com"
//hostname: "s.taobao.com"
//href: "https://s.taobao.com/search?q=3ds&imgfile=&js=1&stats_click=search_radio_all&ie=utf8"
//search: "?q=3ds&imgfile=&js=1&stats_click=search_radio_all&ie=utf8"
//origin: "https://s.taobao.com"
//pathname: "/search"
//port: ""
//protocol: "https:"
//reload: 函数, 刷新当前页面
//replace: 函数, 替换当前页面, 有参数


//navigator 对象是用来查询浏览器的信息的
//比如当前的操作系统平台, 浏览器型号厂商等等
//例如
//navigator.userAgent
//"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36"
//navigator.platform
//"MacIntel"


//history 对象是用来处理历史纪录的
//在 HTML5 它增加了一些 API 使得它也可以做单页应用(SPA, single page app)
//
//history.length      // 历史列表中的 url 数量
//
//history.back()      // 相当于点击后退按钮
//history.forward()   // 相当于点前进
//history.go(-2)      // 相当于点击两次后退按钮

// 下面是 HTML5 新函数

//history.pushState(null, 'title', "/profile")
//三个参数分别是
//自定义对象
//新页面的标题, 但是现在还没有浏览器实现这个功能
//新页面的地址
//
//var state = {
//    page: "settings"
//}
//history.pushState(state, "settings", "/settings")
//也可以通过history.state获取状态，第一页state为null
//
//用户点击 前进 后退 按钮的时候, 会触发 window 的 popstate 事件
//于是可以在这里操作
//window.addEventListener("popstate", function(e) {
//    var state = e.state;
//    // state 就是 pushState 的第一个参数
//    console.log('pop state', state)
//})
//
//
//还有一个 replaceState 函数, 它的作用和 pushState 一样, 只是不生成一条历史纪录
//
//
//
//其他
//只能在相同域名下
//可以使用 queryString
//主要作用是来做 SPA


/*
* 节点坐标
元素边框与上一元素边框的距离 offsetLeft, offsetTop
元素上边框到下边框的距离 offsetHeight, offsetWidth
元素客户区大小，元素内容与内边距所占的空间大小 clientHight, clinetWdith

带有滚动条的元素:
//  scrollHeight:在没有滚动条的情况下，元素内容的总高度。
//  scrollWidth:在没有滚动条的情况下，元素内容的总宽度。
//  scrollLeft:被隐藏在内容区域左侧的像素数。通过设置这个属性可以改变元素的滚动位置。
//  scrollTop:被隐藏在内容区域上方的像素数。通过设置这个属性可以改变元素的滚动位置。
 */
