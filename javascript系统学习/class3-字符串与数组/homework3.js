var log = function () {
    console.log.apply(console, arguments)
}

var sum = function(array){
    var s = 0;
    for(var i = 0; i < array.length; i++){
        var n = array[i]
        s = s + n
    }
    return s
}

var a = [1, 2, 3, 4]
log('sum', sum(a))

// 作业 1
// 参数是一个只包含数字的 array
// 求 array 的乘积
// 函数定义是
var product = function (array) {
    var s = 1
    for(var i = 0; i < array.length; i++){
        var n = array[i]
        s = s * n
    }
    return s
}

var a = [1, 2, 3, 4]
log('product', product(a))

// 作业 2
// 返回一个数的绝对值
// 函数定义是
var abs = function(n) {
    if(n > 0){
        return n
    }
    return -n
}

log('abs', abs(-10))


// 作业 3
// 参数是一个只包含数字的 array
// 求 array 中所有数字的平均数
// 函数定义是
var average = function(array) {
    var average = 0;
    var s = sum(array)
    average = s / array.length
    return average
}

log('average', average([1, 2, 3, 4, 5]))

// 作业 4
// 参数是一个只包含数字的 array
// 求 array 中最小的数字
// 函数定义是
var min = function(array) {
    for(var i = 0; i < array.length; i++){
        var min = array[i]
        if(min > array[i+1]){
            min = array[i+1]
        }
        //log('i and min', i, min)
    }
    return min
}

log('min', min([5, 4, 3, 2, 1]))

// 作业 5
/*
 参数是一个数字 n
 返回以下序列的结果
 1 - 2 + 3 - 4 + 5 ... n
 */
var sum1 = function(n) {
    var odd_array = []
    var even_array = [1]
    for(var i = 2; i <= n; i++){
        if (i % 2 != 0){
            odd_array.push(i)
        }
        else{
            even_array.push(i)
        }
    }
    log('odd_array', odd_array)
    log('even_array', even_array)
    sum_odd_array = sum(odd_array)
    sum_even_array = sum(even_array)
    var s = 0
    s = sum_even_array - sum_odd_array
    return s
}

log('sum1_test1', sum1(5))

// 作业 7
/*
 实现 fac 函数
 接受一个参数 n
 返回 n 的阶乘, 1 * 2 * 3 * ... * n
 */
var fac = function(n) {
    var s = 1
    for(var i = n; i >= 1; i--){
        s *= i
    }
    return s
}

log('fac', fac(5))

/*
 注意 下面几题中的参数 op 是 operator(操作符) 的缩写

 作业 8
 实现 apply 函数
 参数如下
 op 是 string 类型, 值是 '+' '-' '*' '/' 其中之一
 a b 分别是 2 个数字
 根据 op 对 a b 运算并返回结果(加减乘除)
 */
var apply = function(op, a, b) {
    if(op == '+') {
        return a + b
    }
    if(op == '-') {
        return a - b
    }
    if(op == '*') {
        return a * b
    }
    if(op == '/') {
        return a / b
    }
}

log('apply', apply('*', 1, 3))

/*
 作业 9
 实现 applyList 函数
 op 是 '+' '-' '*' '/' 其中之一
 oprands 是一个只包含数字的 list
 根据 op 对 oprands 中的元素进行运算并返回结果
 例如, 下面的调用返回 -4
 var n = applyList('-', [3, 4, 2, 1])
 log(n)
 // 结果是 4, 用第一个数字减去所有的数字
 */
var applyList = function(op, oprands) {
    var start = oprands[0]
    var result = start
    for(var i = 1; i < oprands.length; i++){
        var n = oprands[i]
        result = apply(op, start, n)
        start = result
    }
    return result
}

log('applyList', applyList("/", [16, 4, 2, 1]))

/*
 作业 10
 实现 applyCompare 函数
 参数如下
 expression 是一个 array(数组), 包含了 3 个元素
 第一个元素是 op, 值是 '>' '<' '==' 其中之一
 剩下两个元素分别是 2 个数字
 根据 op 对数字运算并返回结果(结果是 true 或者 false)
 */
var compare = function(op, a, b){
    if(op == '>'){
        return a > b
    }
    if(op == '<'){
        return a < b
    }
    if(op == '=='){
        return a == b
    }
}

var applyCompare = function(expression) {
    var op = expression[0]
    a = expression[1]
    b = expression[2]
    var result = compare(op, a, b)
    return result
}