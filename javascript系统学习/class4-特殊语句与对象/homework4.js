var log = function () {
    console.log.apply(console, arguments)
}

var ensure = function(condition, message){
    if(!condition){
        log('测试失败', message)
    }
}

/*
     s1 s2 都是 string
     但 s2 的长度是 1

     返回 s2 在 s1 中的下标, 从 0 开始, 如果不存在则返回 -1
*/
var find = function(s1, s2){
    var index = -1
    for(var i = 0; i < s1.length; i++){
        if(s1[i] == s2){
            index = i
        }
    }
    return index
}

/*
 返回字符串的小写形式的函数
 注意, 这里假设了 s 字符串全是大写字母
 */
// 这里是两个字符串, 包含了大写字母和小写字母
var lower = 'abcdefghijklmnopqrstuvwxyz'
var upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

var lowercase = function(s){
    var result = ""
    for(var i = 0; i < s.length; i++){
        var index = find(upper, s[i])
        result += lower[index]
    }
}

/*
 作业 2

 定义一个函数
 参数是一个字符串 s
 返回大写后的字符串
 注意, 假设 s 字符串全是小写字母

 注意, 自行实现测试函数, 之后的题目都要求自行实现测试函数
 */
var uppercase = function (s) {
    var u = ''
    for(var i = 0; i < s.length; i++){
        var index = find(lower, s[i])
        u += upper[index]
    }
}

/*
 作业 5
 实现一个叫 凯撒加密 的加密算法, 描述如下
 对于一个字符串, 整体移位, 就是加密
 以右移 1 位为例
 原始信息 'afz' 会被加密为 'bga'
 实现 encode1 函数, 把明文加密成密码并返回
 右移 1 位
 */
var encode = function(e){
    var result = ''
    for(var i = 0; i < s.length; i++){
        var index = find(lower, s[i])
        if(index != 25){
            result += lower[index+1]
        }else{
            result += lower[0]
        }
    }
    return result
}

