var log = function(){
    console.log.apply(console, arguments)
}
// 事件流: 从页面中接收事件的顺序
// 时间冒泡，事件捕获，DOM事件流
/*
DOM2 级事件处理程序：addEventListener() 和 removeEventListener()
接受 3 个参数:要处 理的事件名、作为事件处理程序的函数和一个布尔值。
最后这个布尔值参数如果是 true，表示在捕获 阶段调用事件处理程序;
如果是 false，表示在冒泡阶段调用事件处理程序。默认是false
*/
var btn = document.getElementById("myBtn");

btn.addEventListener("click", function(){
    alert(this.id);
}, false);

btn.addEventListener("click", function(){
    alert("Hello world!");
}, false);

// 使用stopPropagation取消事件 捕获或冒泡
var btn = document.getElementById("myBtn");
    btn.onclick = function(event){
        alert("Clicked");
        event.stopPropagation();
};
document.body.onclick = function(event){
        alert("Body clicked");
};
// 事件委托 （事件委托利用了事件冒泡，只指定一个事 件处理程序，就可以管理某一类型的所有事件。）
<ul id="myLinks">
    <li id="goSomewhere">Go somewhere</li>
    <li id="doSomething">Do something</li>
    <li id="sayHi">Say hi</li>
</ul>
var item1 = document.getElementById("goSomewhere");
var item2 = document.getElementById("doSomething");
var item3 = document.getElementById("sayHi");
EventUtil.addHandler(item1, "click", function(event){
    location.href = "http://www.wrox.com";
});
EventUtil.addHandler(item2, "click", function(event){
    document.title = "I changed the document's title";
});
EventUtil.addHandler(item3, "click", function(event){
    alert("hi");
});
// 改进
var list = document.getElementById("myLinks");
var list = document.getElementById("myLinks");
EventUtil.addHandler(list, "click", function(event){
      event = EventUtil.getEvent(event);
      var target = EventUtil.getTarget(event);
      switch(target.id){
          case "doSomething":
              document.title = "I changed the document's title";
              break;
          case "goSomewhere":
              location.href = "http://www.wrox.com";
              break;
    case "sayHi": alert("hi");
break; }
});


// 事件类型
/*
ui：用户与页面上的元素交互时触发
{ load,
  unload:用户从一个页面切换到另一个页面
  abort, resize, scroll
}
焦点事件{
blur: 失去焦点
focusout: 失去焦点
focus,focusin(支持冒泡)
}
鼠标事件{
clicked=>存在坐标获取(clientX,screenX),鼠标按钮获取(button)
[mousedown  mouseup] 鼠标按钮释放与按下
[mouseenter mouseleave] 鼠标光标从元素外部首次移动到元素范围之内时触发
mouseout 在鼠标指针位于一个元素上方，然后用户将其移入另一个元素时触发
mousemove 在鼠标指针位于一个元素外部，然后用户将其首次移入另一个元素边界之内时触 发。
mouseover 事件会在鼠标指针移动到指定的对象上时发生
}
滚轮事件 mousewheel
文本事件 textInput=>data
键盘事件{
keydown keyup 当用户按下键盘上的任意键时触发=>keyCode, key
keypress 当用户按下键盘上的字符键时触发
}
合成事件
变动事件 readystatechange =>readyState{
 uninitialized(未初始化):对象存在但尚未初始化。
 loading(正在加载):对象正在加载数据。
 loaded(加载完毕):对象加载数据完成。
 interactive(交互):可以操作对象了，但还没有完全加载。
 complete(完成):对象已经加载完毕。
}
*/

// form
/*{
事件：submit, form.submit()
焦点: focus, blur()
textarea:{
选择了文本框中的文本时，就会触发 select 事件
取得用户在文本框中选择的文本:selectionStart, selectionEnd
textbox.value = "Hello world!"
//选择所有文本
textbox.setSelectionRange(0, textbox.value.length); //"Hello world!"
//选择前 3 个字符 textbox.setSelectionRange(0, 3); //"Hel"
//选择第4到第6个字符 textbox.setSelectionRange(4, 7); //"o w"
}
表单序列化: 表单转对象，自用模板字符串转成a=b&c=d的格式，在JSON.stringfy
富文本编辑: iframe, 常用于菜鸟，w3c在线编译
}
*/
// 自动切换焦点
var form = document.querySelector('#myForm')
form.addEventListener('submit', function(event){
  var target = event.target
  if(target.value.length == target.maxLength){
    for(var i = 0; i < form.elements.length; i++){
      if(form.elements[i] == target){
        if(form.elements[i+1]){
          form.elements[i+1].focus()
        }
      }
    }
  }
})

// 拖放事件(文档，图片)
// 将要拖动到的对象的事件
// dragenter, dragover, dragleave/drop
// <img dragable="true>:拖动源的拖动事件
// dragstart drag dragend()
// 在拖放操作完成drop实现数据交换 dataTransfer,方法setData,getData
// effectAllowed定义了在源对象上的操作,可定义在ondragstart事件中.
// dropEffect定义了在目标对象上的操作,可定义在ondrop,ondragenter,ondragover事件中.
// effectAllowed可以定义all操作,但是dropEffect可以定义copy操作.
// event.dataTransfer.setData('text', 'someText')
// HTML5 规范规定 dataTransfer 对象还应该包含下列方法和属性。
// addElement, clearData, setDragImage, types


var text = event.dataTransfer.getData('text')
var img = document.querySelector('#dragImg')
    img.addEventListener('dragstart', function(event){
        var target = event.target
        var dataTransefer = event.dataTransfer
        dataTransefer.setData('url', target.src)
        event.stopPropagation()
    })

var dragTarget = document.querySelector('.dragTarget')
dragTarget.addEventListener('dragenter', function(event){
        log('enter')
        event.preventDefault()
})

dragTarget.addEventListener('dragover', function(event){
        event.preventDefault()
})

dragTarget.addEventListener('drop', function(event){
        log('leave')
        var data = event.dataTransfer.getData('url')
        var img = document.createElement('img')
        img.src = data
        event.target.appendChild(img)
        event.preventDefault()
})

// 媒体元素, 音频事件
// 重要的属性
// duration, autoplay, paused, playbackRaete, readyState, currentTime
// 事件
// audio 载入音乐需要时间, 载入完成后会触发 'canplay' 事件
// 媒体每次变更当前播放时间currentTime事件 ’timeupdate'
// ended 播放结束事件
// 检测 canPlayType
