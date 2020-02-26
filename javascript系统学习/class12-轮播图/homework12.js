// 2016/12/18
//
// 此为第 12 课的作业
// 在上课代码的基础上完成下面的功能
// 有不会实现的效果完全没关系, 讨论或者跳过
// 尽力能做多少做多少, 不懂早点问, 不要闷头造车浪费时间


/*
 作业 1
 实现标签页效果, 步骤如下(标签页效果就是 chrome 浏览 器的多页面效果)
 0, 假设一共有 3 个标签页
 1, 用 3 个 button 当做标签切换的按钮(加上 class)
 2, 用 3 个 div 来显示内容(加上 class), 并且加上隐藏显示的样式(默认不显示)
 3, 给这 3 个 button 添加 data-index 属性来标记他们代表的 div
 4, 给 3 个 button 绑定 click 事件, 点击的时候让它们所代表的 div 显示(加上某个 class)
 并且把之前显示的 div 隐藏掉(删掉那个用于显示的 class)
*/
var bindEventNav = function(){
    var element = e('.heads')
    bindEvent(element, 'click', function(event){
        log('click', event.target)
        var target = event.target
        var index = target.dataset.index
        var selector = '.content-' + String(index)
        var c = find(target.parentElement, selector)
        removeClassAll('navbar-active')
        if(target.classList.contains('navbar')){
            target.classList.add('navbar-active')
            removeClassAll('active')
            toggleClass(c, 'active')
        }
    })
}

bindEventNav()
/*
 作业 2
 点击切换图片的相册
 0, 相册分上下两栏, 上面用来显示当前的大图, 下面用来显示一排缩略图
 当用户点击下面的缩略图的时候, 上面的大图切换为被点击的缩略图
 1, 先写出 html, 假设有 3 张图片, 上面是一个 img 标签, 下面是 3 个 img 标签
 2, 给下面的 img 标签绑定上 click 事件
 3, 通过 img.src 这个属性来读取/设置 img 标签的图片, 这样就能实现功能了
*/

/*
 作业 3
 切换皮肤（主题）功能
 0, 不同的皮肤就是不同的 css, 换肤就是切换 css 文件, 假设我们做 2 套皮肤切换
 1, 最简单方便的换肤方式是把两套皮肤写在 2 个 css 文件中
 2, 页面中添加 2 个按钮用于切换 2 套皮肤
 3, 点击按钮的时候在 head 中添加一个 link 标签(引用 css)
 并且需要删除之前皮肤的 link 标签
 4, 如果不明白就等答案
*/
var bindEventCss = function(){
    var selector = '.theme-change'
    bindAll(selector, 'click', function(event){
        log('click change theme')
        var css = event.target.dataset.css
        var link = e('.theme1.css')
        if(link != null){
            link.remove()
        }
        var head = e('head')
        var linkTag = `<link rel="stylesheet" href="${css}">`
        appendHtml(head, linkTag)
    })
}

bindEventCss()
/*
 作业 4
 实现轮播图 上一张 按钮
 0, 在上课代码的基础上实现这个功能
 1, 添加一个 上一张 按钮(不需要设置它的 css)
 2, 给它绑定一个 click 事件
 3, 在 click 的时候, 根据上课中 下一张 按钮的事件响应来实现 上一张 的功能


 作业 5
 在上课代码的基础上实现轮播图的小圆点切换显示
 0, 在上课代码的基础上实现这个功能
 1, 在 下一张/上一张 按钮的事件处理函数中也给对应 index 的小圆点加上相应的 class
 2, 如果有问题, 可以在群里讨论
*/

/*
 作业 6
 使用定时器实现轮播图的自动播放（等我的资料）
 0, 在上课代码的基础上实现这个功能
 1, 把 下一张 功能做成一个函数 playNext()
 2, 使用 setInterval 函数来实现定时触发功能, 例子如下

 这个函数接受两个参数
 第一个参数是一个函数
 第二个函数是一个以毫秒为单位的数字
 下面的代码会每 1000 毫秒(1 秒)执行一次第一个参数提供的函数(也就是输出 时间到 )
 setInterval(function(){
 console.log('时间到')
 }, 1000)
 */
