/*
 var qs = es('inq')
 for(var i = 0; i < qs; i++){
 let a = qs[i]
 console.log(a.innerText)
 }


 本节课主要介绍6个点
 - 爬虫的原理
 - 普通的爬虫
 - 需要登录的爬虫
 - 爬虫的奥秘
 - 动态内容的爬去（以知乎的动态类容为例）
 - 自定义模块的方法和使用方式

 本节课大量使用学过的新概念
 稍微注意下
 */

// 这一行是套路， 给node.js用的
// 如果没有这一行， 就没办法使用一些let, const这样的特性
// 安装cheerio的命令，npm install request cheerio

"use strict";

const request = require('request')
const cheerio = require('cheerio')

/*
 本文件安装两个基本的库
 require请求网络数据的
 cheerio分析网络数据的
 request 用于下载网页
 用node file启动程序
 */

// 课间问题:
/*
 反爬虫的办法：1，限制访问ip的次数，2，限制放我那ip的时间
 正则表达式：
 */

//定义一个类来保存电影的信息
function Movie() {
    this.name = ''
    this.score = 0
    this.quote = ''
    this.ranking = 0
    this.coverUrl = ''
}

const log = function () {
    console.log.apply(console, arguments);
}

const movieFromDiv = function (div) {
    // 这个函数从一个电影div里面读取电影的信息
    const movie = new Movie()
    // 使用cheerio.load函数来返回一个可以查询的特殊对象
    const e = cheerio.load(div)
    //然后就可以使用querySelector语法来获取信息了
    movie.name = e('.title').text()
    // 等价于movie.name = e('.title').innerText
    movie.score = e('.rating_num').text()
    movie.quote = e('.inq').text()
    // <div class="pic">
    // <em class="">1</em>
    // </div>
    // 因为em标签没有class，所以要通过父节点，来获取em中的内容
    const pic = e('.pic')
    movie.ranking = pic.find('em').text()
    // 元素的属性用 .attr('属性名')确定
    movie.coverUrl = pic.find('img').attr('src')
    return movie
}


const saveMovies = function (movies) {
    const fs = require('fs')
    const path = 'douban.txt'
    // 第二个参数null不用管( 数组(用做 key)，或 调用方法)
    // 第三个参数是缩进层次('\t', 0~10的缩进, 0~10长度的字符串)
    const s = JSON.stringify(movies, null, 2)
    fs.writeFile(path, s, function (error) {
        if (error !== null) {
            console.log('***写入文件错误*****', error);
        } else {
            console.log('---保存成功----');
        }
    })
}

var movies = []

const downloadCovers = function (movies) {
    for (let i = 0; i < movies.length; i++) {
        const m = movies[i]
        const url = m.coverUrl
        const path = './douban/' + m.name.split('/')[0].split(' ')[0] + '.jpg'
        const fs = require('fs')
        // createReadStream是返回一个读取流，request是请求头, pipe是将两个数据流连接起来。
        request(url).pipe(fs.createWriteStream(path))
        //request(url, function (err, response, body) {
        //    if (err === null && response.statusCode == 200) {
        //        const fs = require('fs')
        //        const path = './douban/' + m.name.split('/')[0] + '.jpg'
        //        fs.writeFile(path, body, 'binary', function(err){
        //            if(err === null){
        //                log('写入图片成功')
        //            }
        //            else{
        //                log("写入图片失败")
        //            }
        //        })
        //    } else {
        //        console.log('下载图片失败', url)
        //    }
        //})
    }
}


var moviesFromUrl = function (url) {
    // request从一个url下载数据并调用回调函数
    console.log('url', url);
    request(url, function (error, response, body) {
        // 回调函数的三个参数分别是： 错误，响应，响应数据
        if (error == null && response.statusCode == 200) {
            // cheerio.load用字符串作为参数返回一个可以查询的特殊对象
            const options = {
                decodeEntities: false,
            }
            var e = cheerio.load(body, options)
            // 查询对象的查询语法 和 DOM API中的querySelector一样
            var movieDivs = e('.item')
            for (var i = 0; i < movieDivs.length; i++) {
                var element = movieDivs[i]
                // 获取div的元素并且用moviesFromDiv解析
                // 然后加入 moveis数组中
                var div = e(element).html()
                var m = movieFromDiv(div)
                movies.push(m)
                saveMovies(movies)
                //downloadCovers(movies)
            }
            //console.log('movies.length, movies-last', movies.length, movies[movies.length - 1]);
            // saveMovies(movies)
        } else {
            log('***ERROR****', error)
        }
    })
}

const __main = function () {
    // 下载网页， 解析电影信息， 保存到文件
    for (var page = 0; page <= 225; page += 25) {
        var page_search = '?statrt=' + String(page) + '&filter='
        var url = 'https://movie.douban.com/top250' + page_search
        moviesFromUrl(url)
    }
}

// 程序开始的主函数
__main()
