const blog = require('../model/blog.js')

var all = {
    path: '/api/blog/all',
    method: 'get',
    func: function(request, response){
        console.log('/api/blog/all is running')
        var blogs = blog.all()
        console.log('blog all:', blogs)
        var r = JSON.stringify(blogs)
        response.send(r)
    }
}

var add = {
    path: '/api/blog/add',
    method: 'post',
    func: function(request, response){
        var form = request.body
        console.log('request', request)
        console.log('query', request.query, request.originalUrl, request.method)
        console.log('content-type', request.get('content-Type'), request.contentType)
        console.log('add blog form:', form, '*********')
        var b = blog.new(form)
        var r = JSON.stringify(b)
        response.send(r)
    }
}

var routes = [
    all,
    add
]

module.exports.routes = routes