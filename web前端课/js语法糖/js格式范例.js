// 代码格式
// 1. 缩进
一个层级统一缩进为 4 个空格
错误:
while(j<5){

  square()
  forward(30)
  j = j + 1
}

正确:
while(j<5){
    square()
    forward(30)
    j = j + 1
}



// 2. 空格
下面操作符左右各加一个空格
+ - * / %
= == !=
< <= > >=
错误:
j<5

正确:
j < 5

以逗号(,) 分隔的逗号后面加上空格，比如函数的参数
错误:
wujcxy(-120,-90,30)

正确:
wujcxy(-120, -90, 30)

错误:
var wujcxy = function(x,y,r) {

}

正确:
var wujcxy = function(x, y, r) {

}

if, while, for 后面需要加上空格
错误:
if(a > 2) {

}

正确:
if (a > 2) {

}

左花括号({) 前面需要加上空格
错误:
if (a > 2){

}

正确:
if (a > 2) {

}

错误:
var square5 = function(){

}

正确:
var square5 = function() {

}

else 前面需要加上空格
错误:
if (op == '>') {
    log(1)
}else if (op == '<') {
    log(2)
}

正确:
if (op == '>') {
    log(1)
} else if (op == '<') {
    log(2)
}


// 3. 换行
else 不要换行，要跟在 } 后面
错误:
if (op == '>') {
    log(1)
}
else if (op == '<') {
    log(2)
}

正确:
if (op == '>') {
    log(1)
} else if (op == '<') {
    log(2)
}
