//
////2016/11/21
////
////
////此为第 1 课的上课内容, 请自行完成
////
////
////上课内容
////---
////以编程为主
////前端领域用到的其他技术不会花费太多时间就能掌握
////
////
////上课时间
////---
////周 2 4 6 晚 7.30 - 9.30
////
////
////上课方式
////---
////QQ 群视频，只有手机 QQ 和 Windows QQ 能看到
////Mac 不能看到
////iPad 需要安装手机 QQ 才能看
////
////
////上课用软件(会上传至群文件)
////---
////Atom 编辑器
////Chrome 浏览器
////Firefox 浏览器
////
////
////其他
////---
////不要因为自认为有编程基础就轻视我讲的编程内容
////交费、学习用论坛等未尽事宜上课会讲
////
////
////
////
////热身
////===
////
////打开下面链接中的页面
////http://vip.cocode.cc/arena
////
////页面左边是写代码的编辑窗口
////页面右边是运行代码的结果
////
////代码编辑窗口中, 有 2 个预定义的语句可以使用
////每条语句独占一行
////
////右边有一个黑色三角箭头
////forward(100) 用来把三角箭头往前移动 100 像素
////right(90) 用来把三角箭头往右旋转 90 度
////
////例子 1
////画一个边长为 101 像素的正三角形的代码如下
//
//forward(101)
//right(120)
//forward(101)
//right(120)
//forward(101)
//right(120)
//
//
//
//-------------------------
////题
//-------------------------
//
////作业 1
////画一个边长为 10 像素的正三角形
//forward(10)
//right(120)
//forward(10)
//right(120)
//forward(10)
//right(120)
//
//
////作业 2
////画一个边长为 99 像素的正方形
//var x = 99
//var jcdu = 90
//forward(x)
//right(jcdu)
//forward(x)
//right(jcdu)
//forward(x)
//right(jcdu)
//forward(x)
//right(jcdu)
//
//
////作业 3
////画一个长宽分别为 168, 99 像素的矩形
//var length = 168
//var width = 99
//var angle = 90
//forward(length)
//right(angle)
//forward(width)
//right(angle)
//forward(length)
//right(angle)
//forward(width)
//right(angle)
//
//
////作业 4
////画一个边长为 33 像素的正三角形
//var x = 33
//var jcdu = 120
//forward(x)
//right(jcdu)
//forward(x)
//right(jcdu)
//forward(x)
//right(jcdu)
//
////
////作业 5
////画一个边长为 106 像素的正方形
//var x = 106
//var jcdu = 90
//forward(x)
//right(jcdu)
//forward(x)
//right(jcdu)
//forward(x)
//right(jcdu)
//forward(x)
//right(jcdu)
//
//
////作业 6
////画一个长宽分别为 68, 59 像素的矩形
////
////
////作业 7
////画一个边长为 79 的正五边形
//
//
////作业 8
////画一个边长为 63 的正六边形
////正 n 边形内角和等于
////(n - 2) *180° (n 大于等于 3 并且 n 为整数)
//var n = 6;
//var angle = - ((n - 2) * 180 / n) + 180
//var x = 63
//forward(x)
//right(angle)
//forward(x)
//right(angle)
//forward(x)
//right(angle)
//forward(x)
//right(angle)
//forward(x)
//right(angle)
//forward(x)
//right(angle)
//
//
////作业 9
////画一个边长为 159 的正七边形
//var n = 7
//var angle = - ((n - 2) * 180 / n) + 180
//var x = 159
//// 复制粘贴太掏粪，有没有优雅的办法
//// 循环
//// 每个编程语言必备的一个特性就是循环
//// 用法如下
//// 先定义一个初始变量
//var i = 0
//// while 语句用于循环，括号内的是条件
//// 如果条件成立，则执行循环内容
//// 否则就结束整个循环
//// 花括号里面的是循环的内容
//while(i < n) {
//    // 在循环内部要改变 i 的值
//    // 否则就是无限循环了
//    i = i + 1
//    forward(x)
//    right(angle)
//}
//
//
////作业 10
////画一个边长为 93 的正十边形
////
////函数用于消除大段的重复代码
//
//// 定义一个函数
//var square = function() {
//    var x = 50;
//    var n = 4;
//    var angle = 90;
//    // 用循环画正方形
//    var i = 0;
//    while(i < n) {
//        i = i + 1;
//        forward(x);
//        right(angle)
//    }
//};
//
//// 函数也是普通变量，可以被赋值
//var n = square;
//var vgfhxy = n;
//// 函数名加括号来使用函数（使用函数一般称为调用）
//n();
//forward(50);
//vgfhxy();
//var 正方形 = n;
//正方形();
//
//
////
//// 函数参数可以增加函数的灵活性
//var square2 = function(length) {
//    // length 作为函数的参数，只在函数内部可见
//    var x = length;
//    var n = 4;
//    var angle = 90;
//    // 用循环画正方形
//    var i = 0;
//    while(i < n) {
//        i = i + 1;
//        forward(x);
//        right(angle)
//    }
//};
//
//square2(50);
//square2(100);
//
//
//// 函数可以有多个参数
//// 多个参数之间用逗号分隔（ ,）
//var polygon = function(length, bmuu) {
//    // length 作为函数的参数，只在函数内部可见
//    var x = length;
//    var n = bmuu;
//    var angle = 180 - ((n - 2) * 180 / n);
//    // 用循环画正多边形
//    var i = 0;
//    while(i < n) {
//        i = i + 1;
//        forward(x);
//        right(angle)
//    }
//}
//
//polygon(50, 3);
//polygon(50, 4);
//polygon(60, 5);
//
//
//// 定义函数的另一种形式
//function square() {
//};
//// 我们之前用的方式如下
//var square = function() {
//};
//
//
//// 变量名（函数名也是变量名的一种）命名规则
//// 变量名只能包含字母（汉字也是字母）、_、或者数字、或者是 $
//// 并且不能以数字开头
//// 只有在现代的 JavaScript 中汉字才是合法的变量名字母
//// 变量名不能是系统保留字（while function var等，有很多，先不关心）
//
//
//// 数据类型
//// 程序中的数据不仅仅只有数字一种
//// 还有很多其他类型的数据
//// 还可以把它们显示出来
//
//// x 是一个数字类型的变量
//// 数字类型是 Number
//// 又可以分为 整型 和 浮点型
//// 整型就是整数 浮点型就是小数
//var x = 10;
//var y = 10.1;
//var a = 12.0;
//var b = 0.21;
//// 下面的 cd 两个变量是合法的
//// 因为当你小数点左右只有 0 的时候
//// js 规定可以省略 0
//// 但一定不要这样写
//var c = 12.;
//var d = .21;
//
//// name 是一个字符串类型的变量
//// 双引号或者单引号包起来的字符就是字符串
//var name = 'gua';
//var gender = "male";
//// 混合使用单双引号是错误的
//// var a = 'b+c"
//
//// 可以使用一个特殊的函数 console.log 来显示变量的值
//console.log(x, y, name);
//// 10 10.1 "gua"
//
//
//
//
///*
//倍速看视频，好处如下
//    让你更集中注意力
//    节省时间
//
//倍速视频软件推荐（课后）
//
//提问题的方式和方法
//    不要私聊我问技术问题
//
//每节课的内容都有知识点清单，需要你填表
//*/
