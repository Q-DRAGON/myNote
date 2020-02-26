/**
 * Created by Administrator on 2017/10/26.
 */
// 此为第19课的上课内容
// 数据结构就是存储数据的方式
// 算法是有特定的套路

var log = function(){
    console.log.apply(console, arguments)
}

// 队列系统
// 主要有连个操作
// enqueue dequeue

var Queue = function(){
    this.data = []
}

// 使用 prototype 属性来向对象添加属性：
// 关于prototype 是给对象类增加一个新的定义函数
// 对于所有创建对象都有该方法
// 而对于a = new Queue(), a.function这样只对于a这个类对象有效
// 入队
Queue.prototype.enqueue = function(element){
    this.data.push(element)
}

// 出队
Queue.prototype.dequeue = function(){
    // 数组的splice方法，第一个参数是删除项目的起始位置
    // 第二个参数是要删除的数目
    return this.data.splice(0, 1)[0]
}

Queue.prototype.length = function(){
    return this.data.length
}

Queue.prototype.empty = function(){
    this.data = []
}

//////////////////////////////////////////
var Stack = function(){
    this.data = []
}

Stack.prototype.push = function(element){
    this.data.push(element)
}

Stack.prototype.pop = function(){
    var index = this.data.length - 1
    return this.data.splice(index, 1)[0]
}

Stack.prototype.empty = function(){
    this.data = []
}

/////////////////////////////////////////////////
// 链表
// linkedList

//时间复杂度：o(1), o(logN), o(n)， o(NlogN), o(N^2)
//空间复杂度： o(1),查找最大值， o(n)， 复制一个数组

var Node = function(e){
    this.element = e
    this.next = null
}

var LinkedList= function(){
    this.head = new Node()
    this._length = 0
}

LinkedList.prototype.append = function(element){
    var node = new Node(element)
    var n = this.head
    while(n.next != null){
        n = n.next
    }
    n.next = node
    this._length++
}

LinkedList.prototype.length = function () {
    return this._length
}

LinkedList.prototype.log = function(){
    var n = this.head.next
    while(n != null){
        log(n.element)
        n = n.next
    }
}

