var id1 = document.querySelector('#id1')
var id2 = document.querySelector('#id2')
var id3 = document.querySelector('#id3')

// 事件捕获是 addEventListener 的第三个参数 useCapture
id3.addEventListener('click', function(event){
     console.log('click id3', event)
     // 吃掉冒泡事件
     event.cancelBubble = true
 })
id1.addEventListener('click', function(event){
    console.log('capture click id1', event)
}, true)
id2.addEventListener('click', function(event){
    console.log('capture click id2', event)
}, true)

