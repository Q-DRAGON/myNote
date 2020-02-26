const request = require('syncrequest')

// 伪装登录爬虫以知乎为例
// 需要使用 cookie 和 user-agent，这两个内容放在了 config.js 中
// 使用 require 的方式获取 cookie 和 userAgent
const { cookie, userAgent } = require('./config')

const zhihu = () => {
    // 知乎首页的 url
    let url = 'https://www.zhihu.com/'
    // 要伪装登录，需要使用 user-agent 和 cookie
    // 这是一个套路，直接使用就好
    let options = {
        'headers': {
            'user-agent': userAgent,
            'cookie': cookie,
        }
    }
    // 这次调用 request 函数和上课讲的不一样，多了一个 options 参数
    // 这个参数可以模拟登录
    let r = request.get.sync(url, options)
    let body = r.body

    // 这里可以获取登录之后的页面内容
    console.log('r', body)
}

const __main = () => {
    zhihu()
}

__main()
