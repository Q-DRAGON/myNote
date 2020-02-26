var log = function(){
    console.log.apply(console, arguments)
}

// 作业 1
//
var unique = function(a) {
    /*
     a 是一个 array
     返回一个 array, 包含了 a 中所有元素, 且不包含重复元素
     例如 a 是 [1, 2, 3, 1, 3, 5]
     返回 [1, 2, 3, 5]
     */
    var array = []
    for(var i = 0; i < a.length; i++){
        if(!array.includes(a[i])){
            array.push(a[i])
        }
    }
    return array
}

// 注意, 要自行实现 arrayEquals 来判断两个数组是否相等
// ensureEqual(unique([1, 2, 3, 1, 3, 5]), [1, 2, 3, 5]), 'test 1')
// ensureEqual(unique([1, 1, 3, 3, 1, 3]), [1, 3]), 'test 2')


// 作业 2
//
var intersection = function(a, b) {
    /*
     a b 都是 array

     返回一个 array, 里面的元素是同时出现在 a b 中的元素
     这个 array 中不包含重复元素
     */
    var array = []
    for(var i = 0; i < b.length; i++){
        if(a.includes(b[i])){
            array.push(b[i])
        }
    }
    return unique(array)
}


// 作业 3
//
var union = function(a, b) {
    /*/
     a b 都是 array

     返回一个 array, 里面的元素是所有出现在 a b 中的元素
     这个 array 中不包含重复元素
     /*/
    var array = a
    for(var i = 0; i < b.length; i++){
        if(!array.includes(b[i])){
            array.push(b[i])
        }
    }
    return array
}

// 作业 4
//
var difference = function(a, b) {
    /*/
     a b 都是 array

     返回一个 array, 里面的元素是
     所有在 a 中有 b 中没有的元素
     这个 array 中不包含重复元素
     /*/
    var array = a
    for(var i = 0; i < array.length; i++){
        for(var j = 0; j < b.length; j++){
            var n = [array[i]]
            if(n.includes(b[j])) {
                array.pop(i)
            }
        }
    }
    return array
}

// 作业 5
//
var differenceAll = function(a, b) {
    /*/
     a b 都是 array

     返回一个 array, 里面的元素是
     所有在 a b 中的非公共元素
     这个 array 中不包含重复元素
     /*/
    var array1 = union(a, b)
    var array2 = intersection(a, b)
    var array= array1 - array2
    return array
}

// 作业 6
//
var isSubset = function(a, b) {
    /*/
     a b 都是 array

     检查是否 a 中的每个元素都在 b 中出现
     返回 bool
     /*/
    var common = intersection(a, b)
    if(common != a){
        return true
    }
    return false
}


// 下面的题目都是 DOM 操作题目
// =====
//
// 作业 7
//
var appendHtml = function(element, html) {
    /*
     element 是一个标签
     html 是一段 html 字符串
     把 html 作为子元素插入到 element 的末尾
     上课一直在用这个函数
     */
    element.insertAdjacentHTML('beforeend', html)
}

// 作业 8
//
var bindEvent = function(element, eventName, callback) {
    /*
     element 是一个标签
     eventName 是一个 string, 表示事件的名字
     callback 是一个函数
     用法如下, 假设 button 是一个标签
     bindEvent(button, 'click', function(){
     log('click 事件')
     })
     */
    element.addEventListener(eventName, callback)
}

// 作业 9
//
var bindEventDelegate = function(element, eventName, callback, responseClass) {
    /*
     element 是一个标签
     eventName 是一个 string, 表示事件的名字
     callback 是一个函数
     responseClass 是一个字符串

     在 element 上绑定一个事件委托
     只会响应拥有 responseClass 类的元素
     */
    element.addEventListener(eventName, function(event){
        var target = event.target
        if(target.classList.contains(responseClass)){
            callback(event)
        }
    })
}

// 作业 10
//
var append = function(selector, html) {
    /*
     selector 是一个 string, 选择器, 有如下三种取值
     1, 标签选择器, 如 'div'
     2, class 选择器, 如 '.red'
     3, id 选择器, 如 '#id-input-name'
     html 是一段 html 字符串
     把 html 作为子元素插入到 selector 选中的所有元素的末尾
     */
    var element = document.querySelector(selector)
    appendHtml(element, html)
}

// 作业 11
//
var bindAll = function(selector, eventName, callback, responseClass) {
    /*
     selector 是一个 string, 选择器, 有如下三种取值
     1, 标签选择器, 如 'div'
     2, class 选择器, 如 '.red'
     3, id 选择器, 如 '#id-input-name'
     eventName 是一个 string, 表示事件的名字
     callback 是一个函数
     responseClass 是一个字符串, 这个参数可以为空

     给 selector 选中的所有元素绑定 eventName 事件
     当 responseClass 给出的时候, callback 只会响应拥有 responseClass 类的元素
     当 responseClass 没有给的时候, callback 直接响应

     注意, 这题做不出来就放弃
     */
    var elements = document.querySelector(selector)
    for(var i = 0; i < elements.length; i++){
        var e = elements[i]
        e.addEventListener(eventName, function(event){
            var target = event.target
            if(responseClass != undefined){
                if(target.classList.contains(responseClass)){
                callback(event)
                }
            }
            callback(event)
        })
    }
}

