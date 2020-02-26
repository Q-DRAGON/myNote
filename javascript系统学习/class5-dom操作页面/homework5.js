
//
// ============
// 作业 5
//
// 本次作业主要是 string 和 DOM API 练习
// string 题目用到的知识仍然是
// 0, 用下标引用字符串
// 2, 循环
// 3, 选择 (也就是 if)
// 1, 字符串切片
//
// 注意, 提示在文件最末尾
// 注意, 如果觉得题目有问题就直接在群里问
// ============
//
// 请以之前上课中 string 相关的内容作为参考
// 请自行编写测试
//
//
// ============
// 作业 5
//
// 本次作业主要是 string 和 DOM API 练习
// string 题目用到的知识仍然是
// 0, 用下标引用字符串
// 2, 循环
// 3, 选择 (也就是 if)
// 1, 字符串切片
//
// 注意, 提示在文件最末尾
// 注意, 如果觉得题目有问题就直接在群里问
// ============
//
// 请以之前上课中 string 相关的内容作为参考
// 请自行编写测试
//

var log = function(){
    console.log.apply(console, arguments)
}

var ensure = function(conditions, message){
    if(!conditions){
        log('测试失败', message)
    }
}

// 定义一个增强的 ensureEqual
var ensureEqual = function(a, b, message) {
    if (a != b) {
        log(`测试失败, ${a} 不等于 ${b}, ${message}`)
    }
}

// ======
// 资料
// ======
//
// String 函数可以把数字转成字符串
// 例如 String(1) 就能得到 '1'
// 注意, String 是大写开头的函数, 不要弄错大小写
//
// includes 函数可以检查一个字符串是否包含另一个字符串
// 例如 'good'.includes('o') 返回 true
// var name = 'gua'
// name.includes(1) // 返回 false

// 作业 1
/*
n 是 int 类型
width 是 int 类型
把 n 的位数变成 width 这么长，并在右对齐，不足部分用 0 补足并返回
具体请看测试, 注意, 返回的是 string 类型
返回 string 类型
*/
var zfill = function(n, width){
    var str_n = String(n)
    for(var i = str_n.length; i < width; i++){
        str_n = "0" + str_n
    }
    return str_n
}


// 作业 2
// 10 分钟做不出就看提示
//
// 注意, 这是一个新的知识点, 叫 默认参数
// fillchar 这个参数如果你不提供, 它的值默认就是 ' '
// 语法就是这样
/*
s 是 string
width 是 int
fillchar 是 长度为 1 的字符串, 默认为空格 ' '
如果 s 长度小于 width, 则在末尾用 fillchar 填充并返回
否则, 原样返回, 不做额外处理
返回 string 类型
*/
var ljust = function(s, width, fillchar=' ') {
    var str_s = s
    for(var i = str_s.length; i < width; i++){
        str_s = str_s + fillchar
    }
    return str_s
}


// 作业 3
// 10 分钟做不出就看提示
//
/*
s 是 string
width 是 int
fillchar 是 长度为 1 的字符串, 默认为空格 ' '
如果 s 长度小于 width, 则在开头用 fillchar 填充并返回
返回 string 类型
*/
var rjust = function(s, width, fillchar=' ') {
    var str_s = s
    for(var i = str_s.length; i < width; i++){
        str_s = fillchar + str_s
    }
    return str_s
}

// 作业 4
// 10 分钟做不出就看提示
//
/*
s 是 string
width 是 int
fillchar 是 长度为 1 的字符串, 默认为空格 ' '

如果 s 长度小于 width, 则在两边用 fillchar 填充并返回
如果 s.length 和 width 互为奇偶, 则无法平均分配两边的 fillchar
这种情况下, 让左边的 fillchar 数量小于右边

返回 string 类型
*/
var center = function(s, width, fillchar=' ') {
    var str_s = s
    if ((width-str_s.length) % 2 == 0){
        var i = str_s.length;
        while(i < width){
            str_s = fillchar + str_s + fillchar
            i = str_s.length
        }
    }else{
        var w = width - str_s.length - 1
        var m = str_s.length
        while(w >= 0){
            str_s = fillchar + str_s + fillchar
            m = str_s.length
            w = width - m - 1
        }
        str_s = str_s + fillchar
    }
    return str_s
}

// 作业 5
// 10 分钟做不出就看提示
// 注意, 看上面的资料, 介绍了一个 includes 函数
//
/*
     s 是 string
     检查 s 中是否只包含空格

     返回 bool, 如果 s 中包含的只有空格则返回 true, 否则返回 false
 */
var is_space = function(s){
    for(var i = 0; i < s.length; i++){
        var bool = s[i].includes('')
        if(bool == false){
            return false
        }
    }
    if(s.length == 0){return false}
    return true
}

// 作业 6
// 10 分钟做不出就看提示
//
var is_digit = function(s) {
    /*
     s 是字符串
     检查 s 中是否只包含数字
     返回: bool, 如果 s 中包含的只有数字则返回 true, 否则返回 false
     */
    var digits = '1234567890'
    for (var i = 0; i < s.length; i++) {
        var char = s[i]
        if (!digits.includes(char)) {
            return false
        }
    }
    return true
}

// 作业 10
// 10 分钟做不出就看提示
//
var findIndex = function(s1, s2) {
    var len = s2.length
    for (var i = 0; i < s1.length; i++) {
        var s = s1.slice(i, i + len)
        // log('find index', s, s2, s == s2)
        if (s === s2) {
            return i
        }
    }
}