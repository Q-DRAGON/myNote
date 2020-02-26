/*
fe17 爬虫


本课需要安装两个基本的库，
syncrequest 用于下载网页
cheerio 用于解析网页数据


安装这两个库的方式是在项目目录下输入
yarn install



安装两个库后，目录结构如下
douban.js       豆瓣电影爬虫文件
douban.json     豆瓣电影爬虫结果
预习17.js        本文件
package.json    项目配置文件（里面存储了 node 项目的各种信息）
yarn.lock       项目配置文件（套路文件）
node_modules    node 库目录，保存了所有的 node 库



本节课主要讲使用 node.js 写爬虫程序
有如下几种主要的爬虫
0. 爬虫的原理
1. 普通爬虫，比如豆瓣电影
    爬取数据
    多页爬虫
    下载封面图
    缓存请求
2. 伪装登录的爬虫
3. 动态内容爬取

在 node 中导入自定义的模块


写爬虫的重点
1. 先把 HTML 文件下载到本地
2. 分析本地的 HTML 文件

使用 yarn 安装库的方式
yarn add request
*/