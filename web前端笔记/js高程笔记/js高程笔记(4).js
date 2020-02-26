// MIME 是一种标准化的方式来表示文档的性质和格式。
/*
text/plain
text/html
image/jpeg
image/png
audio/mpeg
audio/ogg
audio/*
video/mp4
application/*
application/json
application/javascript
application/ecmascript
application/octet-stream
*/

// 画布 canvas
/*
使用 toDataURL()方法，可以导出在<canvas>元素上绘制的图像,接受一个MIME参数
描边 strokeStyle, 填充 fillStyle
绘图:
图形
 stokeRect, fillRect, clearRect
 arc(x, y, radius, startAngle, endAngle, counterclockwise):
 arcTo(x1, y1, x2, y2, radius)
 lineTo(x, y), moveTo,rect,
 closepath, fill,
 beginPath, stroke


 文本
 font textAlign textBaseline
 fillText, storkeText, measureText

变换
rotate, 围绕原点旋转图像 angle 弧度
scale,在 x 方向乘以 scaleX，在 y 方向乘以 scaleY。
translate 将坐标原点移动到(x,y)
transform

变换属性的存储和还原save(), restore()
画图
drawImage 参数
要绘制的图像、源图像的 x 坐标、源图像的 y 坐标、
源图像的宽度、源 图像的高度、目标图像的 x 坐标、
目标图像的 y 坐标、目标图像的宽度、目标图像的高度。

阴影
 shadowColor:用 CSS 颜色格式表示的阴影颜色，默认为黑色。
 shadowOffsetX:形状或路径 x 轴方向的阴影偏移量，默认为 0。
 shadowOffsetY:形状或路径 y 轴方向的阴影偏移量，默认为 0。
 shadowBlur:模糊的像素数，默认 0，即不模糊。

渐变 gradient, addColorStop--色标位置和 CSS 颜色值 0(开始的颜色)到 1(结束的颜色)之
var gradient = context.crateLinearGradient(30, 30, 70. 70)
gradient.addColorStop(0, 'white')
gradient.addColorStop(1, "black")
context.fillStyle = gradient

模式
pattern = context.createPattern(image, 'repeat')
context.fillStyle = pattern

使用图像数据(将像素文件解压成图片){
  通过 getImageData(x, y, w, h)取得原始图像数据
  putImageData(imageData, x, y)图像数据绘制到画布上
  var imageData = context.getImageData(10, 5, 50, 50)
  每个 ImageData 对象都有三个属性:width、height 和 data
  其中 data 属性是一个数组，保存着图像中每一个像素的数据
  第一个像素的数据就保存在数组的第 0 到第 3 个元素中,红 绿 蓝 透明度
}

合成 globalAlpha, globComposition-Operation, globalCompositionOperation

WebGL
var buffer = new ArrayBuffer(20)
var view = new DataView(buffer, 9, 20)

*/

// 画布转图像
var canvas = document.getQuerySelector('.drawing')
if(canvas.getContext){
  var imgUrl = drawing.toDataURL('image/png')
  var image = document.createElement('img')
  img.src = imgUrl
  document.body.appendChild(image)
}

// 图像变成灰度图
var filterColor = function(){
  var img = document.images[0]
  var imageData, data, i, len, average, red, green, blue, alpha

  context.drawImage(img, 0, 0)
  imageData = context.getImageData(0, 0, img.width, img.height)
  data = imageData.data

  for(i = 0, len = data.length; i < len; i+=4){
    red = data[i]
    green = data[i+1]
    blue = data[i+2]
    alpha = data[i+3]

    average = Math.floor((red + green + blue) / 3)
    data[i] = data[i+1] = data[i+2] = average
  }

  imageData.data = data
  context.putImageData(imageData, 0, 0)
}
