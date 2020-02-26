var ajax = function (request) {
    var r = new XMLHttpRequest()
    r.open(request.method, request.url, true)
    if (request.contentType != undefined) {
        r.setRequestHeader('Content-Type', 'request.ContentType')
        console.log('now your setting content-Type:', request.contentType)
    }

    r.onreadystatechange = function () {
        if (r.readyState == 4) {
            response = r.response
            request.callback(response)
        }
    }
    if (request.method === 'GET') {
        r.send()
    } else {
        console.log('ajax request send', request.data)
        console.log('request', request)
        r.send(request)
    }
}

var blogTemplate = function (blog) {
    var title = blog.title
    var author = blog.author
    var id = blog.id
    var d = new Date(blog.created_time * 100)
    // 将unix时间变成本地时间
    var time = d.toLocaleString()
    var t = `
            <div class="gua-blog-cell">
                <div class="blog-title">
                    <a href="#" data-id="${id}" class="blog-title">
                        ${title}
                    </a>
                </div>
                <div class="">
                    <span>${author}</span> @<time>${time}</time>
                </div>
                <div class="blog-comments">
                    <div class="new-comment">
                        <input class="comment-blog-id" type=hidden value="${id}">
                        <input class="comment-author" value="">
                        <input class="comment-content" value="">
                        <button class="comment-add">add comment</button>
                    </div>
                </div>
            </div>
        `
    return t
}

var insertBlogAll = function (blogs) {
    var html = ''
    for (var i = 0; i < blogs.length; i++) {
        var b = blogs[i]
        var t = blogTemplate(b)
        html += t
    }
    var div = document.querySelector('.gua-blogs')
    div.innerHTML = html
}

var blogAll = function () {
    var request = {
        method: 'GET',
        url: 'api/blog/all',
        contentType: 'application/json',
        callback: function (response) {
            console.log('response blog all ajax', response)
            var blogs = JSON.parse(response)
            window.blogs = blogs
            insertBlogAll(blogs)
        }
    }
    ajax(request)
}

var blogNew = function (form) {
    var data = JSON.stringify(form)
    console.log('blogNew data:', data)
    var request = {
        method: 'post',
        url: '/api/blog/add',
        data: data,
        contentType: 'application/json',
        callback: function (response) {
            console.log('response blogNew:', response)
            var res = JSON.parse(response)
        }
    }
    ajax(request)
}

var bindEvents = function () {
    var button = document.querySelector('#id-button-submit')
    button.addEventListener('click', function (event) {
        console.log('click new')
        var form = {
            title: document.querySelector('#id-input-title').value,
            author: document.querySelector('#id-input-author').value,
            content: document.querySelector('#id-input-content').value,
        }
        console.log('bindEvents blog send:', form)
        blogNew(form)
    })
}

var __main = function () {
    blogAll()
    bindEvents()
}

__main()