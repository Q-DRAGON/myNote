var log = function () {
    console.log.apply(console, arguments)
}


// 严格模式
"use strict"

// undefined类型:
// 声明变量但是没有初始化

// null类型
// 一个空对象指针


// NaN,非数值，not a number
// 表示一个本来要返回数值的操作数未返回数值的情况

// 转换
// var num1 = parseInt('10', 2)
// var num2 = parseInt('af', 16)
// var num3 = 10
// num3 = num3.toString(2)
// num3 = nums.toString()
// var num4
// num4 = String(num4)

// 位操作
// 求一个数的二进制补码
// 将数值转换为二进制码
// 求反码
// 反码加一

// 特殊语句
// for in
// label
// with

// 数组的队列与栈方法
// 栈
// push, pop
// 队列
// push, shift
// reverse, osrt

// 数组迭代方法
// every():对数组中的每一项运行给定函数，如果该函数对每一项都返回 true，则返回 true。
// filter():对数组中的每一项运行给定函数，返回该函数会返回 true 的项组成的数组。
// forEach():对数组中的每一项运行给定函数。这个方法没有返回值。
// map():对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组。
// some():对数组中的每一项运行给定函数，如果该函数对任一项返回 true，则返回 true。
// 以上方法都不会修改数组中的包含的值。
var numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1]

var everyResult = number.every(function (item, index, array) {
    return (item > 2)
})

// 归并方法:reduce(), reduceRight()
var values = [1, 2, 3, 4, 5]
var sum = values.reduce(function (prev, cur, index, array) {
    return prev + cur
})

// 字符串操作
// slice(), trim(), indexof(), substring(),
// substr(), concat(), replace(), charAt(), charCodeAt()

var s = String.fromCharCode(104, 101, 108, 111)
var cmp = 'yellow'.localeCompare('brick')

// 使用 encodeURI()编码后的结果是除了空格之外的其他字符都原封不动，只有空格被替换成了 %20。
// 而 encodeURIComponent()方法则会使用对应的编码替换所有非字母数字字符

var uri = "http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.htm%23start";
uri1 = decodeURIComponent(uri)
log(uri1)
uri2 = decodeURI(uri)
log(uri2)

// eval() 方法就像是一个完整的ECMAScript解析器
var msg = "hello world";
eval("alert(msg)");

eval("function sayHi() { alert('hi'); }");
sayHi();

// math
// ceil, floor, round, random
// abs, log, pow, sqrt, cos, sin....
function selectFrom(loewrValue, upperValue){
    var choices = upperValue = loewrValue
    return Math.floor(Math.random() * choices + loewrValue)
}

// assign,对象复制，对象合并
var obj1 = {
    'a': 1,
    'b': 2
}

var copyObj1 = Object.assign({}, obj1)
const o1 = { a: 1 };
const o2 = { b: 2 };
const o3 = { c: 3 };

const obj = Object.assign(o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
console.log(o1);  // { a: 1, b: 2, c: 3 }

// 对象的声明方法
// 推荐使用构造函数声明属性，原型模式声明方法
//工厂模式
var person1 = new Object()

var person2 = {
    'name': 'tom',
    sayName: function(){
        return
    }
}

class person3 {
    name = 'tom'
}

// 构造函数模式
var Person4 = function(name){
    this.name = name
    this.age = '12'
}

// 原型模式
person4.prototype.sayName = function(){
    return
}

// 原型模式改进
person4.prototype = {
    name: "nicholas",
    age: 29,
    job: "software engineer"
}

// 对象属性修改, 访问器defineProperty
// 把 configurable 设置为 false，表示不能从对象中删除属性
// delete person.name
// 访问器属性有如下 4 个特性
// Configureable, Enumerable, Get, Set
var person = {}

Object.defineProperty(person, 'name', {
    writable: false,
    configurable: false,
    value: "nicholas"
})

alert(person.name); //"Nicholas"
person.name = "Greg";
alert(person.name); //"Nicholas"

var book = {
    _year: 2004,
    edition: 1
};

Object.defineProperty(book, "year", {
    get: function(){
        return this._year;
    },
    set: function(newValue){
        if (newValue > 2004) {
            this._year = newValue;
            this.edition += newValue - 2004;
} }
});

book.year = 2005; alert(book.edition); //2

// 对象继承(原生链继承，借助构造函数继承，组合继承)
// 推荐使用组合式继承，属性用构造函数继承，方法用原生链继承
function SuperType(){
    this.colors = ['red', 'blue', 'green']
}

function subType(){
    SuperType.call(this)
}

function SuperType(name){
    this.name = name
    this.colors = ['red', 'blue', 'green']
}

SuperType.prototype.sayName = function(){
    alert(this.name)
}

function subType(name, age){
    // 继承属性
    SuperType.call(this, name)
    this.age = age
}

// 继承方法
subType.prototype = new SuperType()
subType.prototype.constructor = subType
subType.prototype.sayAge = function(){
    alert(this.age)
}
var instance = new subType('nicaloas', 29)
instance.colors.push('black')
alert(instance.colors)
instance.sayName()
instance.sayAge()
