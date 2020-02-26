// 2016/12/16
//
// ============
// 作业 11
//
//
// 注意, 提示在文件最末尾
// ============
//


// 定义我们的 log 函数
var log = function() {
    console.log.apply(console, arguments)
}


// ======
// 测试
// ======
//
// 定义我们用于测试的函数
// ensure 接受两个参数
// condition 是 bool, 如果为 false, 则输出 message
// 否则, 不做任何处理
var ensure = function(condition, message) {
    // 在条件不成立的时候, 输出 message
    if(!condition) {
        log('*** 测试失败:', message)
    }
}


// 作业 1
//
var ascii = function(char) {
    /*
     char 是一个长度为 1 的 string
     这个函数返回这个字符的 ASCII 码

     这个答案用到了 s.charCodeAt(index) 函数, 例子如下
     'A'.charCodeAt(0) 返回 65
     'a'.charCodeAt(0) 返回 97

     字符在电脑中的存储是以数字的方式
     每个字符其实是用一个数字代表的, 这个方式叫做编码
     ASCII 码是一个通用的编码, 包含英文字符数字和常见符号

     这个作业答案我给了, 理解一下这件事就好, 不懂搜一下或者问群里
     */

    return char.charCodeAt(0)
}


// 作业 2
//
var charFromAscii = function(code) {
    /*
     code 是一个 int
     返回 code 所表示的字符

     这个答案用到了 String.fromCharCode(code) 函数, 例子如下
     String.fromCharCode(97) 返回 'a'
     String.fromCharCode(65) 返回 'A'
     */
    return String.fromCharCode(code)
}


// 作业 3
//
var rjust = function(s, width, fillchar=' ') {
    var nChar = function(char, n) {
        var s = ''
        for (var i = 0; i < n; i++) {
            s += char
        }
        return s
    }

    var len = width - s.length
    return nChar(fillchar, len) + s
}

var binary = function(n) {
    /*
     n 是一个不大于 255 的 int
     返回 n 的 8 位二进制形式的字符串
     例如 binary(7) 返回 '00000111'

     进制转换自行搜索或者论坛提问大家讨论吧
     */
    var s = ''
    while(n != 0){
        var digital = n % 2
        s = String(digital) + s
        n = Math.floor(n / 2)
    }
    var b = rjust(s, 8, '0')
    return b
}

// 作业 4
//
var int = function(bin) {
    /*
     bin 是一个 8 位二进制形式的字符串
     返回 bin 代表的数字
     例如 int('00000111') 返回 7
     进制转换自行搜索或者论坛提问大家讨论吧
     */
    var chars = bin.split('')
    var s = chars.reverse()
    var n = 2
    var value = 0
    for(var i = 0; i < s.length; i++){
        var c = Math.floor(chars[i])
        var v = Math.pow(n, i) * c
        value += v
    }
    return value
}


// 作业 5
//
var binaryStream = function(s) {
    /*
     s 是一个 string
     返回 s 的二进制字符串
     例如 binaryStream('Man') 返回
     '010011010110000101101110'
     使用上面的函数
     */
    var chars = s.split('')
    var integer = 0
    var stream = ''
    for(var i = 0; i < chars.length; i++){
        var c = chars[i]
        integer = c.charCodeAt(0)
        stream += binary(integer)
    }
    return stream
}

var c = binaryStream('Man')



// 作业 6
//
var stringFromBinary = function(bins) {
    /*
     bins 是一个二进制形式的字符串
     返回 bins 代表的原始字符串
     例如 stringFromBinary('010011010110000101101110') 返回 'Man'
     使用上面的函数
     */
    var s = ''
    for(var i = 0; i < bins.length; i+=8){
        var bin = bins.slice(i, i+8)
        var n = int(bin)
        var c = String.fromCharCode(n)
        s += c
    }
    return s
}


// 作业 7
//
var base64Encode = function(s) {
    /*
     s 是一个 string
     返回 s 的 base64 编码

     Base64是一种基于 64 个可打印字符来表示数据的方法
     它用每6个比特为一个单元，对应某个可打印字符
     ASCII 码一个字符是 8 比特, 也就是一字节
     3 个字节就有 24 个比特, 对应了 4 个 base64 单元

     如下所示
     原始信息        M        a        n
     ASCII         77       7        110
     二进制         01001101 01100001 01101110
     4 个单元       010011 010110 000101 101110
     每个单元转换后  19  22  5  46

     转换后每个 base64 单元都是一个 0-63 的数字
     因为 6 比特表示的范围就是这么大
     然后数字到字符串的转换是下面这段字符串取下标所得
     'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

     那么 Base64 编码结果就是    T   W   F  u

     所以 base64Encode('Man') 返回 'TWFu'


     既然 3 个字节转换为 4 个 base64 单元
     那么 1 个字节怎么办呢?
     答案是用 0 补出 3 字节, 如下所示
     原始信息    M
     ASCII     77       0        0
     二进制     01001101 00000000 00000000
     4 个单元   010011 010000 000000 000000
     单元转换后  19 16 0 0
     所以 base64Encode('M') 返回 'TQ=='
     */
    var stream = binaryStream(s)
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
    var r = ''
    var add = '00000000'
    for(var i = 0; i < stream.length; i+=6){
        var bin = stream.slice(i, i+6)
        var value = int(bin)
        var v = str[value]
        r += v
    }
    return r
}


// 作业 8
//
var base64Decode = function(s) {
    /*
     s 是一个 base64 编码后的字符串
     解码 s 并返回
     例如 base64Decode('TWFu') 返回 'Man'
     */
}
