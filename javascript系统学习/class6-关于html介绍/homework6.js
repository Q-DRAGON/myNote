// 2016/12/04
//
// ============
// 作业 6
//
// 本次作业主要是 string 和 object 相关
//
// string 题目用到的知识还是
// 0, 用下标引用字符串
// 2, 循环
// 3, 选择 (也就是 if)
// 1, 字符串切片
//
// 注意, 提示在文件最末尾
// ============
//
// 请以之前上课中 string 相关的内容作为参考
// 请自行编写测试
//

var log = function(){
    console.log.apply(console, arguments)
}

var ensure = function(condition, message){
    if(!condition)
    {
        log('****测试失败', message)
    }
}

// 作业 1
// 实现函数
// 10分钟做不出来就看提示
var startsWith = function(s1, s2) {
    /*
     s1 是一个字符串
     s2 是一个字符串
     检查 s1 是否以 s2 开头, 返回 true 或者 false
     */
    if(s1.includes(s2)){
        var len_s2 = s2.length
        if(s1.substring(0, len_s2) == s2){
            return true
        }
    }
    return false
}

// 作业 2
// 实现函数
// 10 分钟做不出就看提示
var findIn = function(s1, s2) {
    /*
     s1 是一个字符串
     s2 是一个长度为 1 的字符串
     返回参数 s2 在 s1 中第一次出现的下标
     如果 s2 没有在 s1 中出现, 返回 -1
     */
    var index = -1
    for(var i = 0; i < s1.length; i++){
        var char = s1[i]
        if(char == s2){
            index = i
            break
        }
    }
    return index
}

// 作业 3
// 实现函数
// 10 分钟做不出就看提示
var findAllIn = function(s1, s2) {
    /*
     s1 是一个字符串
     s2 是一个长度为 1 的字符串
     返回参数 s2 在 s1 中出现的所有下标组成的 array
     如果 s2 没有在 s1 中出现, 返回空数组 []
     */
    var array = []
    for(var i = 0; i < s1.length; i++){
        var char = s1[i]
        if(char == s2){
            array.push(i)
        }
    }
    log('array', array)
    return array
}

// 作业 4
// 实现函数
// 10 分钟做不出就看提示
var findAllString = function(s1, s2) {
    /*
     s1 是一个字符串
     s2 是一个字符串, 长度未知, 不一定为 1
     返回参数 s2 在 s1 中出现的下标组成的 array
     如果 s2 没有在 s1 中出现, 返回 []
     */
    var array = []
    for(var i = 0; i < s1.length; i++){
        var s = s1.slice(i)
        if(startsWith(s, s2)){
            //log('i', i)
            array.push(i)
        }
    }
    //log('array', array)
    return array
}

// 作业 5
// 实现函数
// 10分钟做不出来就看提示
var endsWith = function(s1, s2) {
    /*
     s1 是一个字符串
     s2 是一个字符串
     检查 s1 是否以 s2 结尾, 返回 true 或者 false
     */
    if(s1.includes(s2)){
        var len_s2 = s2.length
        var len_s1 = s1.length
        if(s1.substring(len_s1-len_s2, len_s1) == s2){
            return true
        }
    }
    return false
}

// 作业 6
// 实现函数
var topStudent = function(students) {
    /*
     students 是 array
     里面的每个元素都是如下格式的 object
     {
     'name': 'gua',
     'sex': '男',
     'score': 127,
     }
     返回 score 最高的那个元素(object)
     */
    var top = students[0]
    for(var i = 0; i < students.length; i++){
        var s = students[i]
        if(top.score < s.score){
            top = s
        }
    }
    return top
}


var formatedWeekday = function(day) {
    /*
     day 是代表星期的数字, 从周一到周日分别是 1 2 3 4 5 6 7
     返回 '星期一' '星期二' 这样的描述字符串
     */
    var weekdayMap = {
        '1': '星期一',
        '2': '星期二',
        '3': '星期三',
        '4': '星期四',
        '5': '星期五',
        '6': '星期六',
        '7': '星期日',
    }
    var key = String(day)
    return weekdayMap[key]
}

// 作业 9
// 做不出尽早看提示或者到群里讨论或者发帖

var maxLength = function (array) {
    var member_top_len = 0
    for(var i = 0; i < array.length; i++){
        if(array[i].length > member_top_len){
            member_top_len = array[i].length
        }
    }
    return member_top_len
}

var nChar = function(n, char){
    var s = ''
    for(var i = 0; i < n; i++){
        s += char
    }
    return s
}

var prettyLog = function(array) {
    /*
     array 是 array 类型, 里面的元素都是字符串

     按如下的格式返回这个 array
     假设 array 是 ['python', 'js', 'objective-c']
     那么返回的数据是一个数组, 多了首尾两个元素
     [
     '+++++++++++++++',
     '+ python      +',
     '+ js          +',
     '+ objective-c +',
     '+++++++++++++++',
     ]
     返回包含了 string 的 array
     */
    var max_len = maxLength(array)
    var s = nChar(max_len + 4, '+')
    var l = []
    l.push(s)
    for(var i = 0; i < array.length; i++){
        var m = array[i]
        var space = nChar(max_len-m.length, ' ')
        var content = m + space
        var line = `+ ${content} +`
        l.push(line)
    }
    l.push(s)
    return l
}
