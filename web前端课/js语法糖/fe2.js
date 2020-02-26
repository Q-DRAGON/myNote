// 数据类型
//
// 程序中的数据不仅仅只有数字一种
// 还有很多其他类型的数据
// 还可以把它们显示出来

// x 是一个数字类型的变量
// 数字类型是 Number
// 数字类型又可以分为 整型 和 浮点型
// 整型就是整数, 浮点型就是小数
let x = 10
let y = 10.1
let a = 12.0
let b = 0.21
// 下面的 c 和 d 两个变量是合法的
// 因为当你小数点左右只有 0 的时候
// js 规定可以省略 0
// 但一定不要这样写
let c = 12.
let d = .21

// name 是一个字符串类型的变量
// 双引号或者单引号包起来的字符就是字符串
// 双引号和单引号
let name = 'gua'
let gender = "male"
// 混合使用单双引号是错误的
// let a = 'b+c"

// 可以使用一个特殊的函数 console.log 来显示变量的值
// 这个函数可以接受任意多的参数
console.log(x, y, name)
// 会在终端显示 10 10.1 "gua"
// 查看终端显示的值的方法在下方


// 打开并使用浏览器的终端(用于调试)
//
// 在浏览器页面空白处点击鼠标右键
// 点击弹出的菜单中最下方的选项「检查元素」
// 浏览器会弹出一个独立窗口「检查器」
// 在检查器窗口中选择「终端」标签

// 在代码中用 console.log 函数输出的内容会在终端显示
// 主要用于调试代码


// 选择控制
//
// if 可以根据情况选择性执行某些语句
// 例如下方代码
//
// 定义一个变量 grade 代表年级
let grade = 3
// 如果 grade 小于 7
if (grade < 7) {
    // 这句 console.log 只在 grade 小于 7 这个条件满足的情况下会被执行
    console.log('小学生')
}

// 选择控制有多种不同的用法
// 只有 if
if (1 > 2) {
    console.log('条件成立')
}

// if 带 else
// if else 必定会执行一个语句
if (1 > 2) {
    console.log('条件成立')
} else {
    console.log('条件不成立')
}

// 多个 if else
let grade = 8
if (grade < 7) {
    console.log('小学生')
} else if (grade < 10) {
    console.log('初中生')
} else {
    console.log('高中生')
}

// 例子
// 求绝对值
let n = -1
if (n < 0) {
    n = -n
}

// 判断奇偶
// % 是求模运算符(取余数)
let n = 1
if (n % 2 === 0) {
    console.log('偶数')
} else {
    console.log('奇数')
}


// 比较运算和逻辑操作
//
// if 判断的条件(括号里的表达式)其实是一个值, 这种值叫 布尔值(bool, Boolean)
// 这种值只有两种结果, 一个是真, 一个是假
// 在 JavaScript 中, 这两种值分别是 true 和 false
//
// 1 > 2 实际上是一个值, false
// if 是根据这个值来决定执行的语句的
//
// 一共有 7 种比较运算
// 分别是
// 严格相等, 相等, 不等, 小于, 大于, 小于等于, 大于等于
// ===
// ==
// !==
// <
// >
// <=
// >=

// 例子
// 1 === '1'
// 1 == 1
// 1 == 2
// 1 != 1
// 1 != 2
// 1 < 2
// 1 > 2
// 1 <= 1
// 1 >= 1

// 除了比较运算, 还有三种逻辑操作
// 三种逻辑操作分别是 与, 或, 非
// 在 JavaScript 中分别如下
// &&
// ||
// !
//
// 用到的地方很广, 比如登录网站的时候, 服务器做如下判断
// if (用户名存在 && 密码验证成功) {
//     登录成功
// } else {
//     登录失败
// }

// 注意
// 比较运算和逻辑操作的结果是 bool(布尔类型), 结果是 true 和 false

// 例子
// 1 === 1 && 2 === 2    // true
// 1 === 1 && 1 === 2    // false
// 1 === 1 || 1 === 2    // true
// !1 === 1

// 可以加括号来让代码更直观一点
// ((1 === 1) && (2 === 2)) || (1 === 2)


// 函数返回值
//
// 函数不仅可以合并操作重复性的代码
// 还可以通过计算得到一个结果, 结果就是返回值
// 函数可以有「返回值」
// 返回值的意思是函数调用的结果是一个值, 可以被赋值给变量

// 例
// 定义一个函数 add
// 接受 a b 两个参数
const add = function(a, b) {
    // 用 return 语句来得到一个返回值
    // 函数执行到 return 语句的时候就结束了
    return a + b
}

// 用法
console.log('add 函数的返回值', add(1, 2))
let number = add(2, 3)
console.log('add 函数的返回值 number', number)

// 注意看上面的语句, add(2, 3) 被当做一个值赋值给了变量 number
// 也就是说这个函数调用是一个数值, 数值的值就是函数的返回值
// 例如, 使用函数来求绝对值
const abs = function(n) {
    if (n < 0) {
        n = -n
    }
    return n
}

console.log(abs(0))
console.log(abs(-8))
console.log(abs(3))

// 函数执行遇到 return 就结束
const minus = function(a, b) {
    return a - b
    console.log('这一句是不会被执行的, 因为 return 的时候函数就结束了')
}

// 例子
// 使用函数检查一个数字是否是奇数(奇数对 2 取余数不等于 0)
const idOdd = function(n) {
    // 取余数的操作符是 %
    // if (n % 2 !== 0) {
    //     return true
    // } else {
    //     return false
    // }
    return n % 2 !== 0
    // return n % 2 ? true : false
}

console.log(idOdd(1))
console.log(idOdd(2))
console.log(idOdd(3))
console.log(idOdd(4))

// 练习, 实现 isEven 函数, 偶数返回 true, 奇数返回 false
const isEvent = function(n) {
    return n % 2 === 0
}

// 返回两个参数中较小的一个
const min = function(a, b) {
    if (a < b) {
        return a
    } else {
        return b
    }
}

console.log(min(1, 2))
console.log(min(3, 2))

// 练习, 实现 max 函数, 接收两个参数, 返回较大的那一个值
const max = function(a, b) {
    if (a > b) {
        return a
    } else {
        return b
    }
}


// 标准库
// 库 是一个编程术语, 意思是一系列函数的集合
//
// 标准库 也是一个术语, 指的是语言自带的库
//
// JavaScript 的文档(以 MDN 为例)有所有标准库的文档(当然, 不那么容易看懂)
// 我们可以用标准库实现很多功能
//
// 使用标准库就是直接使用即可(因为自带了)
// 例如, 标准数学库可以这样用

// 得到一个随机的小数(0 - 1 之间)
Math.random()

// 求正弦
const floatEqual = function(a, b) {
    let delta = 0.00001
    return Math.abs(a - b) < delta
}
let radian = 30 * Math.PI / 180
let sin30 = Math.sin(radian)
console.log('30 度的正弦应该是 0.5', sin30 === 0.5, floatEqual(sin30, 0.5))

// Math.floor(3.9)
// Math.ceil(3.1)


// 但是结果并不是这样
// 所以应该查看文档
//
// JavaScript 有很多有用的标准库, 所以应该大致翻阅一下目录
// 这样遇到某件事/问题你就知道改用什么方法去解决了
