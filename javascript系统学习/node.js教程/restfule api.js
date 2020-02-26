// 表述性状态转移是一组架构约束条件和原则。
// 满足这些约束条件和原则的应用程序或设计就是RESTful。
// 需要注意的是，REST是设计风格而不是标准。REST通常基于使用HTTP，
// URI，和XML（标准通用标记语言下的一个子集）以及HTML（标准通用标记语言下的一个应用）
// 这些现有的广泛流行的协议和标准。REST 通常使用 JSON 数据格式。

// HTTP 方法
// 以下为 REST 基本架构的四个方法：
// GET - 用于获取数据。
// PUT - 用于更新或添加数据。
// DELETE - 用于删除数据。
// POST - 用于添加数据。

// 创建 RESTful
//
// 首先，创建一个 json 数据资源文件 users.json，内容如下：
//
// {
//     "user1" : {
//     "name" : "mahesh",
//         "password" : "password1",
//         "profession" : "teacher",
//         "id": 1
// },
//     "user2" : {
//     "name" : "suresh",
//         "password" : "password2",
//         "profession" : "librarian",
//         "id": 2
// },
//     "user3" : {
//     "name" : "ramesh",
//         "password" : "password3",
//         "profession" : "clerk",
//         "id": 3
// }
// }

// 基于以上数据，我们创建以下 RESTful API：
// 序号	URI	       HTTP 方法	发送内容	结果
// 1	listUsers	GET	          空	       显示所有用户列表
// 2	addUser	    POST	 JSON 字符串	   添加新用户
// 3	deleteUser	DELETE	 JSON 字符串	   删除用户
// 4	:id	        GET	     空	               显示用户详细信息
var express = require('express')
var app = express()
var fs = require('fs')

var user = {
    "user4":{
        "name": "mohit",
        "password": "password4",
        "profession": "teacher",
        "id": 4
    }
}

app.get('/listUsers', function(request, response){
    fs.readFile(__dirname + '/db/' + "users.json", 'utf-8', function(err, data){
        data = JSON.parse(data)
        data["user4"] = user["user4"]
        console.log(data)
        response.end(JSON.stringify(data))
    })
})

// 显示用户详情
// 以下代码，我们创建了 RESTful API :id（用户id），
app.get('/:id', function (req, res) {
    // 首先我们读取已存在的用户
    fs.readFile( __dirname + "/db/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        var user = data["user" + req.params.id]
        console.log( user );
        res.end( JSON.stringify(user));
    });
})

var id = 2;
app.get('/deleteUser', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/db/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse( data );
        delete data["user" + 2];
        console.log( data );
        res.end( JSON.stringify(data));
    });
})

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})