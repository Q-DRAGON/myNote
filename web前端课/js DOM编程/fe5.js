// 注意, 最外层只能有函数定义和 __main 函数调用
// 我们为了方便演示把函数都写到了 __main 函数里面, 实际上不应该这么写
// 自己定义一个 log 函数
const log = console.log.bind(console)

const __main = function() {
    // 在 html 文件中, js 代码放在 script 标签中
    // 我们把 script 标签放在 body 最后面，原因上课解释
    // 浏览器载入这个 html 文件后，会执行我们写在 script 标签中的代码
    log('代码开始')

    /*
    DOM（Document Object Model 文档对象模型）是浏览器对 html 文件的描述方式
    DOM API(Application Program Interface) 是浏览器提供给 JavaScript 操作 html 页面内元素的方式
    简而言之，浏览器提供了一些内置函数来让我们操作页面（增删改查）
    */

    // 查找元素
    // ===
    //
    // 查找元素使用 document.querySelector() 函数
    // 这个函数的参数是一个选择器（和 CSS 选择器一样）, 这个参数是一个字符串类型
    // 选择器语法和 CSS 选择器一样，现在只用 3 个基础选择器
    // 返回值是一个 html 元素对象或者 null

    const e = function(selector) {
        let element = document.querySelector(selector)
        if (element === null) {
            let s = `元素没找到, 选择器 ${selector} 是错的或者 js 没有放在 body 里`
            alert(s)
            return null
        } else {
            return element
        }
    }

    const es = function(selector) {
        let elements = document.querySelectorAll(selector)
        if (elements.length === 0) {
            let s = `元素没找到, 选择器 ${selector} 是错的或者 js 没有放在 body 里`
            alert(s)
        } else {
            return elements
        }
    }

    // 元素选择器
    let body = e('body')
    // class 选择器，用的是    .类名
    let form = e('.login-form')
    // id 选择器，用的是    #id
    let loginButton = e('#id-button-login')
    // log 出来看看
    log('body', body, form, loginButton)


    // 操作元素（创建，删除，修改）
    // ===
    //
    // 用 document.createElement 函数创建一个元素
    let button = document.createElement('button')
    // 用 innerHTML 设置属性
    button.innerHTML = '注册用户'

    // 修改
    // 用 appendChild 给一个元素添加子元素
    // 这里我们给 .login-form 添加刚才创建好的按钮
    form = e('.login-form')
    form.appendChild(button)

    // createElement appendChild 基本不用，因为可以直接写 HTML
    // 可以用设置 innerHTML 的方式来添加子元素
    // 例如下面两种方法都是为 div 这个元素增加 '<h1>gua</h1>'
    // 方法 1, 使用 innerHTML
    // div.innerHTML += '<h1>gua</h1>'
    // 方法 2, 使用 insertAdjacentHTML 函数
    // div.insertAdjacentHTML('beforeend', '<h1>gua</h1>')
    // 只应该使用方法 2

    // 删除元素
    let pwd = e('#id-input-password')
    form.removeChild(pwd)

    // 删除元素还可以直接使用 父元素.removeChild(子元素) 方法
    // 用选择器选到元素后, 调用 元素.remove() 就可以把元素从页面中删除



    // 事件
    // ===
    //
    // 事件是用来处理响应的一个机制
    // 这个响应可以来自于用户（点击，鼠标移动，滚动），也可以来自于浏览器
    //
    // 下面的链接描述了所有事件，不过我们先从最常用的事件学起，click 事件
    // https://developer.mozilla.org/en-US/docs/Web/Events
    //
    // 常用例子，给按钮添加一个点击的事件
    // 1. 获得按钮
    // 前面已经用 let 声明 loginButton 了, 所以这里不能用 let 再次声明
    loginButton = e('#id-button-login')
    // 2. 声明一个函数，用于在按钮点击后执行
    const clicked = function() {
        log('按钮被点击到了')
    }
    // 3. 添加事件，使用 addEventListener 函数，它有两个参数
    // 第一个是事件的名字，第二个是事件发生后会被自动调用的函数，称为回调函数
    loginButton.addEventListener('click', clicked)
    //
    // 添加完成，可以自己在浏览器试试，记得打开 console


    // 给多个元素挂上同一个事件
    // 选择多个元素使用函数 querySelectorAll
    let buttons = es('.radio-button')
    // 循环遍历每个元素，并且绑定点击事件
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i]
        button.addEventListener('click', function(event) {
            // 注意，这次我们直接定义了函数作为参数传递，这样做是合法的
            // 另外，我们增加了一个 event 参数，参数的名字无所谓，
            // 可以随便取，但是通常叫 event 比较好
            // 浏览器会给事件响应函数传递一个参数，它代表了事件本身
            // 我们可以用 event.target 取出响应事件的元素
            let self = event.target
            // clearActive 函数是我们自己定义的
            // 目的是删除其他元素的 active class
            clearActive()
            // add 可以增加一个 class
            self.classList.add('active')
        })
    }

    const clearActive = function() {
        let activeElement = e('.active')
        // 不是 null 说明找到了这个元素
        if (activeElement !== null) {
            // 使用 classList 可以访问一个元素的所有 class
            // remove 可以删除一个 class
            activeElement.classList.remove('active')
        }
    }
}

__main()