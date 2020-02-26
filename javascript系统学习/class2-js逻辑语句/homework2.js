// 1
// 实现一个矩形函数
// x y 是矩形左上角坐标
// w h 是宽高
// rect(x, y, w, h)

var rect = function (x, y, w, h) {
    jump(x, y);
    setHeading(0);
    var i = 0;
    while(i < 2){
        i = i + 1
        forward(w);
        right(90);
        forward(h);
        right(90);
    }
}

rect(0, 0, 10, 20)
rect(10, 10, 10, 20)

// 2
// 实现一个矩形函数
// x y 是矩形中心的坐标
// w h 是宽高
// center_rect(x, y, w, h)
var center_rect = function (x, y, w, h) {
    var start_x = x - w/2
    var start_y = y + h/2
    rect(start_x, start_y, w, h)
}

// 3
// 实现一个正五角星(国旗大星星那种)函数
// x y 是五角星顶部横边的左边点坐标
// length 是一条线的长度
// 这是一个正五角星
// vgwujcxy(x, y, length)

var vgwujcxy = function(x, y, length){
    var n = 5
    var angle = (180 - ((n - 2) * 180 / n)) / 2
    jump(x, y)
    setHeading(0)
    var i = 0
    while(i < n){
        i = i + 1
        forward(length)
        right(180 - angle)
    }
}
vgwujcxy(0, 0, 50)


// 4
// 实现一个函数画日本国旗
// 调用 2 个函数画日本国旗
// 一个画背景的白色矩形
// 一个画中间的红色圆
// japan()

var circle = function(x, y, r){
    var n = 36;
    var angle = (180 - ((n - 2) * 180) / n);
    var C = 2 * 3.14 * r;
    var l = C / n;
    var i = 0;
    jump(x, y);
    setHeading(0);
    jump(x, y+r)
    hide();
    while(i < n){
        i = i + 1;
        forward(l);
        right(angle);
    }
}

var japan = function(){
    var x = 0
    var y = 0
    var w = 150
    var h = 100
    var centerX = x + w / 2
    var centerY = y - h / 2
    center_rect(centerX, centerY, w, h)
    setPenColor('red')
    circle(centerX, centerY, h * 0.3)
}

//画画时间速度最快
setDelay(0)
japan()

// 5
// 实现一个五角星函数
// x y 是五角星的中心点坐标
// r 是五角星的外接圆半径
// rorate 是正五角星顺时针偏移的角度
// wujcxy(x, y, r, rorate)
// 为了实现这个函数, 你需要使用三角函数计算顶点在圆上的坐标
// 如果你不懂这个数学计算过程, 可以在论坛提问
// 我帮你实现了正弦余弦函数如下
var sin = function(degree) {
    // 如上课所述, 数学库里面的 sin 函数接受弧度作为参数
    // 我们这个函数接受角度, 下面是弧度转角度的公式
    var radians = degree * Math.PI / 180
    return Math.sin(radians)
}

var cos = function(degree) {
    var radians = degree * Math.PI / 180
    return Math.cos(radians)
}
