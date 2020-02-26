// 定律
// 每个对象都有 __proto__ 属性，但只有函数对象才有 prototype 属性
// 万物皆对象

const log = console.log.bind(console)

// 普通对象
var o1 = {}
var o2 = new Object()
var o3 = new f1()

// 函数对象
function f1() {
}

var f2 = new Function('str', '')
var f3 = function () {
}


// 构造函数
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function () {
        alert(this.name)
    }
}

// person1 和 person2 都是 Person 的实例。这两个实例都有一个 constructor （构造函数）属性
// 该属性（是一个指针）指向 Person
var person1 = new Person('Zaxlct', 28, 'Software Engineer');
var person2 = new Person('Mick', 23, 'Doctor');

// 原型对象
// 每个函数对象都有一个prototype 属性，这个属性指向函数的原型对象
// 在默认情况下，所有的原型对象都会自动获得一个 constructor（构造函数）属性，
// 这个属性（是一个指针）指向 prototype 属性所在的函数（Person）
// A 有一个默认的 constructor 属性，这个属性是一个指针，指向 Person。即：
Person.prototype.constructor == Person

function Person() {
}

Person.prototype.name = 'Zaxlct';
Person.prototype.age = 28;
Person.prototype.job = 'Software Engineer';
Person.prototype.sayName = function () {
    log(this.name);
}


// __proto__
// JS 在创建对象（不论是普通对象还是函数对象）的时候，都有一个叫做__proto__ 的内置属性，
// 用于指向创建它的构造函数的原型对象。
// 对象 person1 有一个 __proto__属性，创建它的构造函数是 Person，构造函数的原型对象是 Person.prototype ，所以：
person1.__proto__ == Person.prototype

// 构造器
var obj = new Object()
// obj 是构造函数（Object）的一个实例。所以：
obj.constructor === Object
obj.__proto__ === Object.prototype

