/**
 * Created by Administrator on 2017/10/29.
 * 文件存储处理的文件
 */
'use strict';
var fs = require('fs')

var filePath = './db/comment.json'

// 这是一个用来存储blog的数据的对象
const ModelComment = function(form){
    // ||是一种写的写法，
    // a = b || c 意思是如果b是undefined或者Null
    // 就把 c 赋值给 a
    this.author = form.author || ''
    this.content = form.content|| ''
    this.blog_id = form.id || 0
    this.created_time = Math.floor(new Date() / 1000)
}

const loadComments = function(callback){
    // 确保文件有内容，这里就不用处理文件不存在或者内容错误的情况了
    // 同步打开文件sync
    var content = fs.readFileSync(filePath, 'utf-8')
    var data = JSON.parse(content)
    console.log('loadComments:', data)
    return data
}

var b = {
    data: loadComments()
}

b.all = function(){
    return this.data
}

b.new = function(form){
    var m = new ModelComment(form)
    var d = this.data[this.data.length-1]
    if(d == undefined){
        m.id = 1
    }else{
        m.id = this.data.length + 1
    }
    this.data.push(m)
    this.save()
    return m
}

b.save = function(){
    var s = JSON.stringify(this.data)
    fs.writeFile(filePath , s, function(err){
        if(err){
            console.log(err)
        }else{
            console.log(`博客存储成功:${s}`)
        }
    })
}

//导出一个对象时候用module.exports = 对象的方式
// 这样引用的时候就可以直接把模块当这个对象来用了
module.exports = b


