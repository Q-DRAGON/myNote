// 有一次定义我们的 log 函数
const log = console.log.bind(console)

//
// =====
// 类 与 面向对象
// =====
//
// 语言自带的数据类型有限，要表示复杂的数据，必须有复杂的数据类型
// 我们可以用对象表示复杂类型
//
// 类，就是语言提供的自定义数据类型的机制，也就是自定义对象
// 例子如下
//

// 在一些语言中会有 class 关键字来声明类
// 但是 js(es5) 的处理方式并不是 class，而是下面这种
// 虽然看上去怪异，但无非是个套路罢了
//
// Student 是类名，一般首字母大写（驼峰命名法（搜））
// 类看起来就是一个函数而已
const Student = function(name, height) {
    // 用 this.变量名 来创造一个只有类的实例才能访问的变量
    this.name = name
    this.height = height
}

// 使用方式如下
// 使用 new 函数名(参数)初始化一个类的实例
// 赋值给 s1
// 这时候 s1 引用的是一个 Student 类型（也就是对象 Student 的实例）
// 也称之为对象
let s1 = new Student('gua', 169)

// 可以通过 . 语法访问对象的属性（也就是函数中用 this.变量名 创造的变量）
// 类的变量叫做 属性（单纯只是叫法不同）
log('class, s1', s1.name, s1.height)


// ==
// 可以改变 s1 的属性
s1.name = 'xiaogua'
s1.height = 1.69
log('class, s1 属性', s1.name, s1.height)
// 输出如下
// class, s1 属性 xiaogua 1.69

// ==
// 可以创建多个互相独立的实例
let s2 = new Student()
let s3 = new Student()
s2.name = 'gua II'
s3.name = '三代瓜'
log(s2.name, s3.name)


// ==
// 可以给类增加一些方法（函数）
// 给类定义方法（想想标准库中 String 类的 length）
// prototype 在这里是一个套路，上课会解释
Student.prototype.greeting = function() {
    console.log(`hello, I'm ${this.name}`)
}

Student.prototype.update = function(name, age) {
    this.name = name
    this.age = age
}

// 可以调用实例的方法
s1.greeting()

// 调用 update 方法
s1.update('xiao', 169.98)
s1.greeting()

const greeting = function(o) {
    log(`hello, I'm ${o.name}`)
}


// ==
// 封装，上面 greeting 和 update 就是封装的例子
// 意思是说把一些操作做好，对外部来说只需要简单调用即可
//


// ==
// ES6 的类的写法
// ES5 里面，类看起来像函数
// 在 ES6 中，大家认为 类 应该看起来像类
// 所以做了一套新语法，如下
// 注意，只有新浏览器可以这样用
class Student {
    // 构造器方法
    // 在调用 new Student 的时候, 会自动调用 constructor 方法
    constructor(name, height) {
        this.name = name
        this.height = height
    }

    greeting() {
        console.log(`hello, I'm ${this.name}`)
    }

    update(name, age) {
        this.name = name
        this.age = age
    }
}

let s1 = new Student('gua', 169)


// this 以及 3 个关联函数
// this 是在程序运行的时候才能确定的
// 谁调用了函数谁就是 this
// 仔细观察下面的例子
const greeting = function() {
    // 注意，这个 this.name 取决于谁调用了 greeting() 函数
    // xx.greeting . 左边的对象就是 this
    console.log('Hi, ', this.name)
}

let o1 = {
    name: 'gw',
}
let o2 = {
    name: 'xc',
}
// 让 o1 o2 分别调用
o1.hello = greeting
o2.hello = greeting
// 调用者就是函数前面的 . 左边的对象
o1.hello()      // 调用者是 o1
o2.hello()      // 调用者是 o2
// 直接调用 greeting() 是函数的话
// 调用者是全局对象
// 浏览器的全局对象是 window
// node.js 中全局对象是 global
// 所以在浏览器中直接调用 greeting() 的话，this 指的是 window
greeting()      // 调用者是 window
// 相当于 window.greeting()

// apply call bind 是用来给函数指定 this 用的
// 但是用法稍有区别，以我们长久以来使用的 log 为例
const log = function() {
    // log 是一个函数
    // js 中的函数是一个对象
    // 所以函数可以有方法
    // apply, call, bind 都是函数的方法，用来指定 this
    //
    // apply 接受两个参数
    // 第一个参数是函数里面的 this，这里指定了是 console，这样就相当于 console.log
    // 第二个参数是要传给函数的参数列表，类型是 数组，apply 会把数组拆成一个个的参数传给函数
    // 假设你调用 log(1, 2, 3, 4)
    // 那么 arguments 是 [1, 2, 3, 4] 这样的一个数组
    // (实际上 arguments 不是数组，但是表现和数组一模一样，你就暂时当它是一个数组)
    // 下面这句就相当于调用 console.log(1, 2, 3, 4)
    console.log.apply(console, arguments)

    // call 和 apply 类似，但是小有区别，如下
    // 第一个参数和 apply 一样
    // 第 2, 3, 4, 5, ... 个参数依次作为参数传给函数
    console.log.call(console, 1, 2, 3, 4)
}

const logApply = function() {
    console.log.apply(console, arguments)
}

logApply(1, 2, 3, 4)

const logCall = function() {
    // ... 语法是用来把数组展开
    console.log.call(console, ...arguments)
}

logCall(1, 2, 3, 4)

log(1, 2, 3, 4)


// 这三个是等价的
// console.log(1, 2, 3)
// console.log.apply(console, [1, 2, 3])
// console.log.call(console, 1, 2, 3)

// const log = console.log
// const log = console.log.bind(console)
// log(1, 2, 3)


// bind 函数不直接调用，而是返回一个函数让你来调用
// 第一个参数是用来指定函数里面的 this，和 apply call 一样
// 用法就是这样，返回一个指定了 this 的函数
const log = console.log.bind(console)
log('hello', 1, 2, 3)
// hello 1 2 3


// bind 还可以有额外的参数，效果如下
// 给返回的函数加上部分参数
const error = console.log.bind(console, '*** ERROR')
// 下面的调用相当于 console.log('*** ERROR', '错误')
error('错误')
// *** ERROR 错误




// ==
// 类主要的优势就是 可批量制造 object 和 可封装方法
// this 等，比较复杂，需要上课讲
