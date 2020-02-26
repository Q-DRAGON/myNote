1. 默认是全局对象, 严格模式下为 undefined 
2. 普通函数的 this 在调用时确定
   1. 谁调用, 谁就是 this. 
   2. 作为对象方法, 原型链方法, 对象的 getter/setter 方法时也是如此.
   3. 使用 bind call apply 可绑定 this. 替代调用时确定的规则.
3. 箭头函数的 this 继承自作用域链上层
   1. 本身没有 this, 也无法绑定 this.
4. new 构造函数, this 为正在构造的对象
   1. 构造函数默认返回 this, 返回对象时除外
5. dom 事件处理函数, this 为触发事件的元素.
6. on-event 内联函数, this 为绑定的元素.

<pre>
const log = function() {
    return console.log.apply(console, arguments)
}

const test1 = () => {
    log('=> function don not have this test 0')
    log(this, 'this')
}

function Student() {
    this.name = 'wo'
    this.grade = 17
    this.greeting = () => {
        log('=> function of this is extend of 外面 test 2')
        log(this, 'this')
    }
}

var a = new Student()
a.greeting()

function Student1() {
    this.name = 'wo'
    this.grade = 17
}

Student1.prototype.greeting = () => {
    log('=> function of this is extend of 外面 test 3')
    log(this, 'this')
}

var b = new Student1()
b.greeting()

let btn = document.createElement('button')
let body = document.querySelector('body')
btn.innerText = 'click'
body.appendChild(btn)

// btn.addEventListener('click', (event) => {
//     log('this test 4', this)
// })

btn.addEventListener('click', function (event) {
    log('this test 5', this)
})

btn.click()

let input = document.createElement('input')
body.appendChild(input)

input.onblur = function (event) {
    log('this test 6', this)
    input.onblur.bind(btn)
    log('this test 8', this)
}

input.onfocus = function (event) {
    log('this test 7', this)
}

</pre>

