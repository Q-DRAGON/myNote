const log = console.log.bind(console)

const ensure = function(condition, message) {
    if (!condition) {
        log('*** 测试失败', message)
    } else {
        log('+++ 测试成功')
    }
}

class Stack {
    constructor() {
        this.data = []
    }
    push(e) {
        this.data.push(e)
    }
    pop() {
        let index = this.data.length - 1
        return this.data.splice(index, 1)
    }
    top() {
        let index = this.data.length - 1
        return this.data[index]
    }
    size() {
        return this.data.length
    }
}

const validPair = function(s) {
    let stack = new Stack()
    for (var val of s) {
        if (val === '(') {
            stack.push(val)
        }
        if (val === ')') {
            if (stack.size() === 0) {
                return false
            }
            stack.pop(val)
        }
    }
    if (stack.size() === 0) {
        return true
    }
    return false
}

class Node {
    constructor(e) {
        this.element = e
        this.next = null
    }
}

class LinkedList {
    constructor() {
        this.head = new Node()
        this._length = 0
    }

    append(e) {
        let node = new Node(e)
        let n = this.head
        while (n.next !== null) {
            n = n.next
        }
        n.next = node
        this._length++
    }

    indexOf(e) {
        let index = -1
        let n = this.head
        let i = 0
        while (n !== null) {
            if (e === n.element) {
                index = i
                break
            }
            n = n.next
            i++
        }
        return index
    }

    length() {
        return this._length
    }

    toString() {
        let n = this.head
        let s = ''
        while (n !== null) {
            s += (n.element + ' > ')
            n = n.next
        }
        return s
    }

    log() {
        let n = this.head.next
        log('遍历链表')
        while (n !== null) {
            log(' > ', n.element)
            n = n.next
        }
    }

    prepend(e) {
        let node = new Node(e)
        node.next = this.head.next
        this.head.next = node
        this._length++
    }

    removeFirst() {
        let p = this.head.next
        this.head.next = p.next
        this._length--
    }

    removeLast() {
        if (this._length == 0) {
            return
        }
        let n = this.head
        let p = n
        while (n.next != null) {
            p = n
            n = n.next
        }
        p.next = null
        this._length--
    }
}

const testRemoveLast = () => {
    let l = new LinkedList()
    l.head = new Node('head')

    l.append(111)
    l.append(222)
    l.append(333)

    l.removeLast()
    ensure(l.toString() === 'head > 111 > 222 > ', 'test remove last 1')
    l.removeLast()
    ensure(l.toString() === 'head > 111 > ', 'test remove last 2')
}

testRemoveLast()