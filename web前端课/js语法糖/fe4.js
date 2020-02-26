// 自己先定义一个 log 函数
const log = console.log.bind(console)


// 一些循环例子
// 使用 while 循环计算 100 内的奇数和
let n = 1
let sum = 0
while (n <= 100) {
    if (n % 2 === 1) {
        sum = sum + n
    }
    // n += 1 是 n = n + 1 的简写
    n += 1
    // n++
    // ++n
}
log('1 到 100 的奇数和是', sum)

// 运行，输出如下
// 1 到 100 的奇数和是 2500


// break 语句
//
// break 语句可以终止循环
let i = 0
while (i < 10) {
    log('while 中的 break 语句')
    // break 语句执行后, 循环就结束了
    break
    // 因此 i += 1 这一句是不会被执行的
    i += 1
}

log('break 结束的 i 值', i)
// 运行, 输出如下
// while 中的 break 语句
// break 结束的 i 值 0
//
// 可以看到
// 循环执行了一次就结束了
// i 仍然是 0, 说明 break 后的语句的确没有被执行


// continue 语句
//
// continue 语句可以跳过单次循环
let i = 0
while (i < 10) {
    // 一定要记住改变循环条件，否则会无限循环
    i = i + 1
    // 如果 i 是偶数，则 continue 跳过这次循环
    if (i % 2 === 0) {
        continue
    }
    log('while 中的 continue 语句', i)
}

// 运行，输出如下
// while 中的 continue 语句 1
// while 中的 continue 语句 3
// while 中的 continue 语句 5
// while 中的 continue 语句 7
// while 中的 continue 语句 9
//
// 可以看到
// 只有 1 3 5 7 9 被 log 出来了
// 因为 i 是偶数的时候, 循环体中剩下的部分被跳过了


// object（对象）
//
// object 是一个非常重要的存储数据的类型
// object 和 array 是最重要的两个存储数据的工具
//
// array 通过数字下标来访问元素
// object 通过 key（键）来访问元素
// 详细请看下方资料


// 创建 object
//
let taoer = {
    'name': 'gua',
    'height': 169,
}

log('object', taoer)

// 运行，输出如下
// object  {'name': 'gua', 'height': 169}
//
// 可见, 字典的创建是花括号 {}
// 字典的内容是成对出现的，由冒号分隔开
// 左边的是 key（键），几乎所有情况下，都是字符串，这也是它的主要用途
// 右边的是 value（值），可以是任意类型，包括 number, string, boolean, array, object 等


// 访问（读取/使用） object 中的元素
//
// 通过 [] 语法可以用 key 得到 value
log('通过 key 访问 object 的元素')
log(taoer['name'])
log(taoer['height'])

// 运行，输出如下
// 通过 key 访问 object 的元素
// gua
// 169


// 还可以用 点语法 来访问元素
// 但这有限制，上课会讲
log('通过 点语法 访问 object 元素')
log(taoer.name)
log(taoer.height)


// 访问不存在的 key 会得到 undefined
// taoer 字典中并没有 'age' 这个 key，因此下面的语句会得到 undefined
// log(taoer['age'])


// 增加，修改 object 的元素
//
// 创建一个新的对象来使用
// 注意，对象的 key 可以省略引号

let gua = {
    name: 'xiaogua',
    height: 169,
}

// 增加一个元素
gua['gender'] = '男'
log('object 增加', gua)
log('object 增加', gua['gender'])

// 修改已有的元素
gua['name'] = 'gua'
log('object 修改', gua)

// 删除元素
delete gua.gender
log('object 删除', gua)

// 运行，输出如下（注意，输出不一定能保证 key 的顺序，所以你能看到的输出和我这个不一定一样）
// object 增加 {name: "xiaogua", height: 169, gender: "男"}
// object 增加 男
// object 修改 {name: "gua", height: 169, gender: "男"}
// object 删除 {name: "gua", height: 169}
//
// 注意看，增加了一个新的 key 'gender'
// 并且可以访问到它的值
// 同时，可以看到 'name' 被修改了
// 另外，key 还会被 delete 语句删除




// 递归
// 递归简而言之就是一个函数调用本身或者两个函数相互调用
// 我们只讨论第一种情况
// 需要注意的是，递归是一个比较难以理解的概念
// 看不懂，不理解，太正常了
// 这需要时间，不要急着出斧头强行非要搞懂
// 不懂这个也不影响你找工作或者工作，所以慢慢来理解
// 现在只是为了介绍这个概念


// 注意，接下来的例子都只是例子而已，实际不会这么写代码
// 递归有适用的场景，但不会用来求阶乘这样的事情
// 只是为了简化描述才用了这个例子
//
// 用递归求阶乘
//
// 阶乘的定义如下
// n! = n * (n - 1)!
// 当 n 等于 0 的时候，阶乘为 1（不要问为什么，这是规定）
// 所以可以用递归编写下面的代码
const fac = function(n) {
    // 如果 n 是 0 则返回 1
    // 这是递归终止的条件，必须要有，否则无限递归了
    if (n === 0) {
        return 1
    } else {
        // 如果 n 不为 0，返回 n * fac(n - 1)
        // 这时候 n 是已知的，fac(n - 1) 需要计算
        // 于是代码进入下一重世界开始计算
        return n * fac(n - 1)
    }
}

log('递归阶乘', fac(5))

// 运行，输出如下
// 递归阶乘 120
//
// fac5 = 5 * fac4
//             4 * fac3
//                 3 * fac2
//                     2 * fac1
//                         1 * fac0
//                             1
//

// 用递归求斐波那契数
//
// 斐波那契的定义如下
// fib(n) = fib(n - 2) + fib(n - 1)
// 当 n 等于 1 2 的时候, fib(n) 为 1
// 所以可以用递归编写下面的语句
const fib = function(n) {
    // 如果 n 是 1 或者 2 则返回 1 作为结束
    // 这是递归终止的条件，必须要有，否则无限递归了
    if (n === 1 || n === 2) {
        return 1
    } else {
        // 如果 n 不为 1 和 2，返回 fib(n - 2) + fib(n - 1)
        // 这时候 fib(n - 2) fib(n - 1) 需要计算
        // 于是代码进入下一重世界开始计算
        return fib(n - 2) + fib(n - 1)
    }
}

log('递归 fib', fib(6))
log('递归 fib', fib(7))

// 运行，输出如下
// 递归 fib 8
// 递归 fib 13
// fib6 = fib4 + fib5

// fib4 = fib2 + fib3
//      = 1    + fib1 + fib2
//      = 1    + 1    + 1
//      = 3

// fib5 = fib3 + fib4
//      = 2    + 3
//      = 5
//
// fib6 = fib4 + fib5
//      = 3    + 5
//      = 8

