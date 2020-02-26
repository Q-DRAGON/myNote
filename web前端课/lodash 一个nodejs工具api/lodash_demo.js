/*
Lodash 是一个非常实用的 js 工具库
官方描述是 Lodash 是一个具有一致接口、模块化、高性能等特性的JavaScript 工具库
在 node 中可以安装
也可以自己下载来导入

在 浏览器 中, 可以通过 CDN 的方式使用

中文文档在这里, 课中只是简要讲述重要的东西
http://lodashjs.com/docs/
*/
// _ 是 lodash 的套路用法
const _ = require('./lodash.js')


// each 用法
const list = [
    'a',
    'b',
    'c',
]

const dict = {
    k1: 'a',
    k2: 'b',
    k3: 'c',
}

_.each(list, (v, k) => {
    // each 方法的两个参数
    // 如果 list 是 列表，那么 v 和 k 分别是指 list 的 element/index
    // 如果 list 是 对象（字典），那么 v 和 k 分别是指 object 的 value/key
    console.log('element and index', v, k)
})

_.each(dict, (v, k) => {
    console.log('value and key', v, k)
})



// map 用法
// 用 map 可以用一个旧数组生成一个新数组
// 比如旧数组为
const list1 = [
    10,
    20,
    30,
]

const list2 = _.map(list1, (v, k) => {
    const r = v * v
    return r
})
console.log('list2', list2)



// filter
// 遍历数组/对象，返回符合判断函数中的元素
let us = [
    {
        'name': 'a',
        'score': 70,
    },
    {
        'name': 'b',
        'score': 90,
    },
    {
        'name': 'c',
        'score': 80,
    },
    {
        'name': 'd',
        'score': 70,
    },
]

let u = _.filter(us, (e) => {
    let b = e.score > 70
    return b
})
console.log('filter u', u)



// orderBy
// 根据条件排序
// 先按照 score 升序，如果有 score 一样的
// 再按照 name 降序
let users = _.orderBy(us, ['score', 'name'], ['asc', 'desc'])
console.log('order by users', users)



// flatten
// 减少一层嵌套数组
// 也就是可以直接将二维数组拍成一维数组

let l = [
    1,
    [2],
    [3, [4]],
    [5, [6], [7]],
]
let f = _.flatten(l)
console.log('flatten result', f)



// compact
// 剔除数组中的假值元素
// js 中假值元素分别为
// false null 0 NaN '' undefined

// 这个方法可以和 map 配合使用
// 剔除返回数组的数组中的假值元素
let l = [
    0,
    1,
    NaN,
    '',
    'hello',
    false,
    undefined,
    null,
    {},
]
let result = _.compact(l)
console.log('compact result', result)



// isEqual
// 比较两个对象是否相等
// 数组也可以用这个方法比较
let o1 = {
    'key': 1,
}

let o2 = {
    'key': 1,
}

let result = _.isEqual(o1, o2)
console.log('isEqual result', result)



// 获取嵌套对象的值
let o = {
    'k1': {
        'k2': {
            'k3': {
                'k4': 'value in nested dict'
            }
        }
    }
}

let path = 'k1.k2.k3.k4'
let result = _.result(o, path)
console.log('result nested result', result)



// 生成数组
// 使用 range 生成数组后，就可以使用
// each map filter 这些方法操作数组了
let l = _.range(10)
console.log('range l', l)



// cloneDeep
// 深拷贝
let o = {
    'a': [1],
    'b': [2],
}

let deep = _.cloneDeep(o)
console.log('deep', deep)



// random
// 返回给定范围的随机值
let a = 10
let b = 20

// 返回 a 和 b 之间的一个整数
let r1 = _.random(a, b)
console.log('random r1', r1)


// 如果指定第三个参数为 true，这个参数的意思是指 floating
// 那么返回的就是一个浮点数
let r2 = _.random(a, b, true)
console.log('random r2', r2)



// shuffle
// 返回打乱顺序后的数组
let l = [1, 2, 3, 4,]
const s = _.shuffle(l)
console.log('shuffle l', s)
