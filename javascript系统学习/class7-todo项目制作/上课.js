// 此为第 7 课的上课内容 1
//
// 这部分的主要内容有
//
// 数据类型
// 多行字符串和转义符号
// 高阶函数
// 匿名函数
//
// 应该都能看懂, 不懂的稍微做个笔记, 等上课讲解(也可以提前在群/私聊问我)

// 定义 log 函数
var log = function(){
    console.log.apply(console, arguments)
}


// =====
// 数据类型
// =====
//
// 在 js 中, 每一个变量(也就是每一个值)都有一个类型
// 内置的基本数据有以下几种类型
// number          数字
// string          字符串
// boolean         布尔变量（只有两个值 true 或 false）
// object          对象, 是高级一点的内容
/*
null 和 undefined
undefined:一个上没有被定义分配，就被使用的值
null:一个空值，不存在的引用
这两个东西很相似, 有这么两个东西主要是历史原因造成的
具体细节可看这个链接, 不过不需要关心
http:// www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html
*/

//
// 函数也是一个变量, 稍微特殊点, 但在 js 中没什么本质不同, 它的类型是函数
//
// 为一个变量赋值就创建了一个变量
// Python 中, 变量只是对值的一个引用
// 比如下面, 分别把 3 个不同类型的值赋值给变量 a
var a
a = 1       // a 是 number
a = 1.1     // number
a = 'good'  // string

// 可以用 typeof 语句得到一个变量的类型
a = 10
b = true
c = 'I am good'
log('type a', typeof a)
log('type b', typeof b)
log('type c', typeof c)

// =====
// 多行字符串
// =====
//
//  多行字符串又称模板字符串
//  使用反引号, 键盘左上角波浪线
var a = `多
行
字符串`

log('多行字符串', a)

a = `
i
am
good
`

log('多行字符串 2', a)

// 多行字符串可以用作 docstring
// 也可以用作多行注释(你只要不用它 相当于注释了)

// 不同的数据类型是不能混用的
// 比如 float 就不能当下标


// =====
// 转义符
// =====
//
// 在代码中表示字符串的时候, 很多东西不方便表示, 因此我们使用转义符的方式来表示
// 转义符是字符串中的特殊符号，由反斜杠（backslash）开始，接另一个字符结束
// 常用的转义符有
// 还有一些别的转义符，但极少使用，对于这种东西，不必记忆，知道有这么回事就好了。
// \n     // 表示一个换行符
// \t     // 表示一个 TAB（制表符）
// \\     // 表示一个反斜杠 \
// \a     // 表示系统警铃声，有的系统不会响
// \'     // 表示一个单引号
// \"     // 表示一个双引号
//
// 例子：
log('I\'am\tgood\n')
//
//
// =====
// 高阶函数
// =====
//
// 高阶函数这个名字很唬人, 实际上概念很简单——函数可以作为参数传递
//
// 有什么用呢？灵活性高，舒适度佳
// 请看例子
//
// String 函数是用来把数据转换成 string 类型的一个函数
log('string ', String(6.3))

var process = function(array, processor){
    var l = []
    for(var i = 0; i < array.length; i++){
        var a = array[i]
        var element = processor(a)
        l.push(element)
    }
    return l
}

var array = [1.1, -2.2, 3.3]

var stringList = process(array, String)
log('string', stringList)

// Math.floor 函数可以把小数转成整数, 可以自行试试
var integerList = process(array, Math.floor)
log('integer', integerList)


// =====
// 匿名函数
// =====
//
// 有时候要传递高阶函数的时候, 函数很短, 可能就一行
// 如果去定义一个新函数有人觉得划不来, 就想了一个偷懒的办法
// 那就是匿名函数
// 匿名函数的意思是没有函数名, 一般定义了就用
// 实际上我们之前写的函数都是匿名函数, 只不过把它赋值给了一个变量而已

// 例子
// 定义一个 square 函数求平方
var square = function(n){
    return n * n
}




