const blog = require('../model/blog.js')

var sendHtml = function(path, response) {
    var fs = require('fs')
    var options = {
        encoding: 'utf-8'
    }
    path = 'template/' + path
    fs.readFile(path, options, function(err, data){
        console.log(`read html file path: ${path}`)
        response.send(data)
    })
}

var index = {
    path: '/',
    method: 'get',
    func: function(request, response){
            var path = 'blog_index.html'
            sendHtml(path, response)
        }
}

var routes = [
  index
]

module.exports.routes = routes