/*
CSS(Cascading Style Sheet) 的使用
    内联（inline style attribute）      强烈不建议使用
    <head>标签内的 <style> 标签          可以使用, 但不是很建议
    <link> 标签中的外联                   这样是最好的



三种主要的选择器
    元素选择器
    class 选择器
    id 选择器


选择器优先级（从高到低）
    !important
    内联样式
    id 选择器
    class 选择器
    元素选择器


样式优先级（从高到低）
    !important
    内联样式
    <link><style> 中的样式
    如果优先级一样, 那么后出现的覆盖先出现的



display 属性
    block
    inline
    inline-block
    none

block 占一行
默认 block 的标签有
div
p
ul ol li
h1 h2 h3 h4 h5 h6

inline 只占 content 的尺寸

inline-block 是 inline 布局， block 模式
inline-block 对外表现为 inline，所以可以和别的 inline 放一行
对内表现为 block，所以可以设置自身的宽高



float 属性


盒模型
    内容
    padding
    border
    margin



position 属性用于元素定位
    static           静态, 默认值
    relative         相对
    absolute         绝对
    fixed            固定


非 static 元素可以用 top left bottom right 属性来设置坐标
非 static 元素可以用 z-index 属性来设置显示层次
relative 是相对定位
absolute 完全绝对定位，忽略其他所有东西，往上(父元素方向)移动到 非 static 的元素
fixed 基于 window 的绝对定位，不随页面滚动改变



overflow 属性
    visible 默认
    auto 需要的时候加滚动条
    hidden 隐藏多余元素
    scroll 就算用不着也会强制加滚动条



盒模型相关的 CSS


border
    border-width
    border-style
    border-color

border-top
    border-top-width
    border-top-style
    border-top-color

border-right
    border-right-width
    border-right-style
    border-right-color

border-bottom
    border-bottom-width
    border-bottom-style
    border-bottom-color

border-left
    border-left-width
    border-left-style
    border-left-color



margin
    margin-top
    margin-right
    margin-bottom
    margin-left

padding
    padding-top
    padding-right
    padding-bottom
    padding-left

三种缩写，分别对应 4 2 3 个值的时候的解释，padding 同理
margin: top right bottom left
margin: (top/bottom) (right/left)
margin: top (right/left) bottom

border-radius 左上角为 top，右下角为 bottom

background 相关属性和缩写
    #233 是 #223333 的缩写
    background-color: #233;
    background-image: url(bg.png);
    background-repeat: no-repeat;
    // 背景图片随滚动轴的移动方式
    background-attachment: fixed;
    background: #233 url(bg.png) no-repeat;



居中写法
block 元素居中
margin: 0 auto;

inline inline-block 元素居中
text-align: center;
*/
