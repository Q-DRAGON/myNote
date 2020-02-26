/**
 * Created by Administrator on 2017/10/29.
 * 文件存储处理的文件
 */
'use strict';
var fs = require('fs')

// 因为app打开的是class20-博客程序,所以路径变成了这样
// E:\码源\javascript学习\class20-博客程序\
// 该路径会省略最后一个斜杠
// 两种写法:
//var blogFilePath = './db/blog.json'
var blogFilePath = 'db/blog.json'

// 这是一个用来存储blog的数据的对象
const ModelBlog = function(form){
    // ||是一种写的写法，
    // a = b || c 意思是如果b是undefined或者Null
    // 就把 c 赋值给 a
    this.title = form.title || ''
    this.author = form.author || ''
    this.content = form.content || ''
    this.created_time = Math.floor(new Date() / 1000)
}

const loadBlogs = function(callback){
    // 确保文件有内容，这里就不用处理文件不存在或者内容错误的情况了
    // 同步打开文件sync
    console.log('blogFilePath', blogFilePath)
    var content = fs.readFileSync(blogFilePath, 'utf-8')
    var blogs = JSON.parse(content)
    console.log('loadBlogs:', blogs)
    return blogs
}

var b = {
    data: loadBlogs()
}

b.all = function(){
    var blogs = this.data
    const comment = require('./comment.js')
    var comments = comment.all()
    for(var i = 0; i < blogs.length; i++){
        var blog = blogs[i]
        var cs = []
        for(var j = 0; j < comment.length; j++){
            var c = comment[j]
            if(blog.id == c.blog_id){
                cs.push(c)
            }
        }
        blog.comments = cs
    }
    return blogs
}

b.new = function(form){
    var m = new ModelBlog(form)
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
    fs.writeFile(blogFilePath , s, function(err){
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


