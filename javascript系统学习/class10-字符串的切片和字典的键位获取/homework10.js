var log = function () {
    console.log.apply(console, arguments)
}

var ensure = function (condition, message) {
    if(!condition){
        log('*****测试失败:', message)
    }
}

// 作业 1
//
var isPrime = function(n) {
    /*
     n 是 int
     判断 n 是否是素数(质数)
     */
    for(var i = 2; i < n; i++){
        if(n % i == 0){
            return false
        }
    }
    return true
}

// 作业 2
//
var primeNumbers = function() {
    /*
     返回 100 内的素数列表
     */
    var numbers = []
    for (var i = 2; i < 100; i++) {
        // 直接使用上面写好的函数检查
        if (isPrime(i)) {
            numbers.push(i)
        }
    }
    return numbers
}


var split = function(s, delimiter=' ') {
    /*
     s 是 string
     delimiter 是 string, 默认为空格 ' '

     以 delimiter 为分隔符号, 返回一个 array
     例如
     split('1 2 3') 返回 ['1', '2', '3']
     split('a=b&c=d', '&') 返回 ['a=b', 'c=d']
     注意, 测试 array 是否相等得自己写一个函数用循环来跑
     */
    var l = []
    var space = delimiter.length;
    var start = 0
    for(var i = 0; i < s.length; i++){
        if(s.slice(i, i+space) == delimiter){
            l.push(s.slice(start, i))
            start = i + space
        }
    }
    l.push(s.slice(start))
    return l
}

var find = function(s1, s2){
    var index = -1
    for(var i = 0; i < s1.length; i++){
        if(s1[i] == s2){
            index = i
        }
    }
    return index
}

var lower = 'abcdefghijklmnopqrstuvwxyz'
var upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

var lowercase = function(s){
    var result = ""
    for(var i = 0; i < s.length; i++){
        var index = find(upper, s[i])
        result += lower[index]
    }
    return result
}

var uppercase = function (s) {
    var u = ''
    for(var i = 0; i < s.length; i++){
        var index = find(lower, s[i])
        u += upper[index]
    }
    return u
}

// 作业 3
//
var capString = function(str) {
    /*
     给定一个英文句子 str（一个只有字母的字符串）
     返回「将句中所有单词变为有且只有首字母大写的形式」的 string
     */
    var s = lowercase(str)
    var words = split(s, ' ')
    var sentence = []
    for(var i = 0; i < words.length; i++){
        word = words[i]
        w = word[0]
        var index = find(upper, w)
        word[0] = upper[index]
        sentence.push(word)
    }
    return sentence
}

// 作业 4
//
var letterCount = function(str) {
    /*
     给定一个只包含字母的字符串，返回单个字母出现的次数
     考察字典的概念和使用
     返回值为包含数组的数组，格式如下（对数组中数组的顺序不做要求）

     // 可以使用 Object.keys 函数
     var obj = {
     foo: 1,
     bar: 2,
     }
     Object.keys(obj)
     ["foo", "bar"]

     参数 "hello"
     返回值 [['h', 1], ['e', 1], ['l', 2], ['o', 1]]
     */
    var count = {}
    for(var i = 0; i < str.length; i++){
        var c = str[i]
        var keys = Object.keys(count)
        if(keys.includes(c)){
            count[c] += 1
        }else{
            count[c] = 1
        }
    }
    return count
}



//作业五
var queryFromObject = function(param) {
    /*
     param 是一个 object
     例子如下
     param 是 {
     'foo': 1,
     'bar': 'far',
     }
     返回如下 string, 顺序不做要求(foo bar 的顺序)
     foo=1&bar=far

     注意, 使用 Object.keys 函数
     */
    // kvs 意思是 keyvalues
    var kvs = []
    var keys = Object.keys(param)
    for(var i = 0; i < keys.length; i++){
        var key = keys[i]
        var value = param[key]
        var kv = key + '=' + value
        kvs.push(kv)
    }
    var query = kvs.join('&')
    return query
}

//作业 6
//
var argsFromQuery = function(querystring){
    /*
     queryString 是一个 string
     例子如下
     queryString 是 foo=1&bar=far
     返回如下 object, 顺序不做要求(foo bar 的顺序)
     {
     'foo': '1',
     'bar': 'far',
     }
     */
    // 字符串也有一个 split 函数, 和作业 7 中的 split 一样
    var args = {}
    var kvs = querystring.split("&")
    for(var i = 0; i < kvs.length; i++){
        var kv = kvs[i]
        var key = kv.split('=')[0]
        var value = kv.split('=')[1]
        args[key] = value
    }
    return args
}



