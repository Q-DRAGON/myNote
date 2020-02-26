// 时间、空间复杂度(空间复杂度一般不考虑)
// 复杂度是对一个操作的大致估计
// 复杂度从小到大依次如下
/*
五种常见时间复杂度
复杂度用 大 O 记法 来描述(大 O 记法是描述算法复杂度的符号)

算法随着数据规模的增长而产生的变化


O(1)
    常数复杂度，最快速的算法。
    取数组第 1000000 个元素
    字典和集合的存取都是 O(1)
    数组的存取是 O(1)

O(lgN) O(log2(N))
    对数复杂度
    假设有一个有序数组，以二分法查找

O(n)
    线性复杂度
    假设有一个数组，以遍历的方式在其中查找元素

O(nlgn)
    求两个数组交集，其中一个是有序数组
    假设 A 数组的长度是 M, 无序
    假设 B 数组的长度是 N, 有序
    A 数组每一个元素都要在 B 数组中进行查找操作
    每次查找如果使用二分法则复杂度是 lgN
    M 个元素加起来就是 M * lgN
    所以时间复杂度就是 NlgN

O(N²)
    平方复杂度
    求两个无序数组的交集

    假设 A 数组的长度是 M, 无序
    假设 B 数组的长度是 N, 无序
    A 数组每一个元素都要在 B 数组中进行查找操作
    每次查找只能使用遍历操作, 所以每次查找都是 N
    M 个元素加起来就是 M * N
    所以时间复杂度就是 N²

*/


/*
数据结构
===
针对常用的操作，我们发明了一套常用的数据结构
四大数据结构
1，数组
    连续的一块内存
    读取元素时间是 O(1)
    插入、删除是 O(n)

123456789
12345 789
123457 89
1234578 9
12345789

12345789
1234578 9
123457 89
12345 789
1234 5789
123405789


2，链表
    手拉手的盒子，一个盒子只能访问左右手的盒子
    以下标方式读取元素的时间是 O(n)
    插入、删除是 O(1)
    栈和队列是链表的特定场景应用(当然, 不用链表也能实现栈和队列)


3，字典（哈希表 Hash Table）
    读取、插入、删除都是 O(1)
    把字符串转为数字作为下标存储到数组中
    字符串转化为数字的算法是 O(1)
    所以字典的存取操作都是 O(1)
    除非对数据有顺序要求，否则字典永远是最佳选择
    字符串转化为数字的算法
        1，确定数据规模，这样可以确定容器数组的大小 Size
        2，把字符当作 N 进制数字得到结果
            10 ** 0 表示 10 的 0 次方
            'gua' 被视为 g * 10 ** 0 + u * 10 ** 1 + a * 10 ** 2 得到结果 n
            n % Size 作为字符串在数组中的下标
            通常 Size 会选一个 素数
            用链表法解决碰撞

4，搜索树（我们只用，不写，甚至只是隐含在用，你并不知道你用的是树）
AVL
红黑树(red black tree)


额外的，图是一种有时候有用但你一辈子都可能写不到的数据结构
只了解，不用学习如何实现
图的应用举例
    地图导航
    全国几个大城市之间的出行方案(有价格/时间/路途等权重)
*/
const log = console.log.bind(console)


// 队列结构
// 主要有 2 个操作
// enqueue dequeue
//
class Queue {
    constructor() {
        // data 是存储元素的数组
        this.data = []
    }

    // 入队
    enqueue(element) {
        this.data.push(element)
    }

    // 出队
    dequeue() {
        return this.data.splice(0, 1)[0]
    }

    // 队列长度
    length() {
        return this.data.length
    }

    // 清空队列
    empty() {
        this.data = []
    }
}

// let q = new Queue()
// q.enqueue(1)
// q.enqueue(2)
// q.enqueue(3)
// log('length', q.length())
// log(q.dequeue())
// q.enqueue(4)
// log(q.dequeue())
// log(q.dequeue())
// log(q.dequeue())


// Stack 栈
// 常见的 3 个操作
// push pop top
//

class Stack {
    constructor() {
        this.data = []
    }
    // push 添加一个元素
    push(e) {
        this.data.push(e)
    }

    // pop 删除并返回最新添加的元素
    pop() {
        let index = this.data.length - 1
        return this.data.splice(index, 1)[0]
    }

    // top 仅返回最新添加的元素
    top() {
        let index = this.data.length - 1
        return this.data[index]
    }
}

let s = new Stack()
s.push('hello')
s.push('world')
log(s.pop())
log(s.pop())

let str = 'hello'
for (let i = 0; i < str.length; i++) {
    s.push(str[i])
}

let str1 = ''
for (let i = 0; i < str.length; i++) {
    str1 += s.pop(str[i])
}
log(str1)

/*
((1 + 2) * 3)
作业 验证括号匹配
*/



// 链表
// LinkedList
// [1, 2, 3, 4, 15, 16, 27]
// [1, 2, 3, 0, 4, 5, 6, 7]


// 链表实现
//
class Node {
    constructor(e) {
        this.element = e
        this.next = null
    }
}

// let n1 = new Node(1)
// let n2 = new Node(2)
// let n3 = new Node(3)
// n1.next = n2
// n2.next = n3
//
// 参考 closestId, closestClass, closestTagName 作业代码
// let n = n1
// while (n !== null) {
//     log('遍历链表', n.element)
//     n = n.next
// }


class LinkedList {
    constructor() {
        this.head = new Node()
        this._length = 0
    }

    // 在链表末尾增加一个元素
    append(e) {
        let node = new Node(e)
        let n = this.head
        // 找到链表末尾元素的套路
        while (n.next !== null) {
            n = n.next
        }
        // 循环结束后, n 就是最后一个元素
        n.next = node
        //
        this._length++
    }

    // 返回一个元素的 index
    indexOf(e) {
        let index = -1
        let n = this.head
        let i = 0
        while (n.next !== null) {
            if (e === n.element) {
                index = i
                break
            }
            n = n.next
            i++
        }
        return index
    }

    // 返回链表的长度
    length() {
        return this._length
    }

    log() {
        let n = this.head.next
        log('遍历链表')
        while (n !== null) {
            log(' > ', n.element)
            n = n.next
        }
    }
}

let list = new LinkedList()
list.append('hello')
list.append('gua')
list.append('你好')
list.log()
log(list.length())

/*
面向对象 多态 继承 大致讲一下

多态
在某些语言里面 比如 java
你函数定义的参数必须有类型 类型不匹配就是错误的
let add = function(a, b) {
    return a + b
}

// 在其他语言里面可能是这样的 比如 java c
let add = function(int:a, int:b) {
    return a + b
}

add(1.1, 2.2)
// 报错， 类型不匹配

let add = function(float:a, float:b) {
    return a + b
}

add(1.1, 1)

let add = function(int:a, float:b) {
    return a + b
}

let add = function(float:a, int:b) {
    return a + b
}

// 现在就不会报错了
add(1.1, 1)

// 在 js 中没这个问题
// 我们称之为 duck type




继承
继承是说 子类拥有父类的某些东西

定义一个类 人

再定义 男人 女人
然后设置 男人 女人的 prototype = 人

ES6 的继承
class 人 {
    constructor(name, height) {
        this.name = name
        this.height = height
    }
}

class 男人 extends 人 {
    constructor(...args) {
        this.super(args)
    }
}

ES5 的继承
function 人(name, height) {
    this.name = name
    this.height = height
}

function 男人() {

}

男人.prototype = new 人()
*/

function Api() {

}

Api.prototype.get = function() {

}

function TodoApi() {

}

TodoApi.prototype = new Api()

let todo = new TodoApi()
todo.get()


/*
现在想调用 todo.get 方法
先去 todo 的实例上面找 get 方法
如果没有找到, 就会去 todo 的类(TodoApi)的 prototype 上面找
因为 TodoApi.prototype 是一个实例
单独考虑这个实例
TodoApi.prototype.get
如果没有找到, 就是去 TodoApi.prototype 的类(Api)的 prototype 上面找
*/


/*
其他数据结构

hash table  哈希表（散列表）
tree        树
set         集合
graph       图


哈希表就是用 字符串 当下标，也就是 js 中的对象的实现方式
也就是其他语言中的 字典

原理是用字符串 算出一个数字 然后用这个数字当下标存东西
比如 gua 这个字符串 我们用每个字符乘以一个数字最后求余得到下标
从字符串到数字的操作叫做 hash
// hash('gua') = 1
// hash('hs') = 3
【坑1， 坑2， 坑3， 坑4， 坑5， 坑6】
  gua       hs              wh
  xiao      lj
            bl



树一般是用来实现二叉搜索树的，应用范围不多
     6
    / \
   4   8
    \ / \
    57  9

*/
