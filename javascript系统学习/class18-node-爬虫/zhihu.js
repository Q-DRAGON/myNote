"use strict";

//html json js 格式化工具
//http://jsbeautifier.org

const request = require('request')
const cheerio = require('cheerio')

function Answer(){
    this.author = ''
    this.content = ''
    this.link = ''
}

const log = function(){
    console.log.apply(console, arguments)
}

log('file: zhihu.js')
/*
通过exports只做自己的模块
*/

const answerFromDiv = function (div) {
    // 这个函数来从一个回答div里面度去回答信息
    const a = new Answer()
    const options = {
        decodeEntities: false
    }
    // 使用 cheerio.load 函数来返回一个可以查询的特殊对象
    const e = cheerio.load(div, options)
    // 然后就可以使用querySelector语法来获取信息
    // .text()获取文本信息
    a.author = e('.UserLink-link').text()
    a.link = e('')
    a.content = e('.CopyrightRichText-richText').html()
    return a
};

const answerFromBody = function(body){
    // cheerio.load 用字符串作为参数返回一个可以查询的特殊对象
    const options = {
        decodeEntities: false,
    }
    const e = cheerio.load(body, options)
    const divs = e('.List-item')
    const answers = []
    for(let i = 0; i < divs.length; i++){
        let element = divs[i]
        const div = e(element).html()
        const m = answerFromDiv(div)
        answers.push(m)
    }
    return answers
}

const __main = function(){
    const url = 'https://www.zhihu.com/question/31515263'
    // request 从一个url下载数据并调用回到函数
    // 根据 未登录爬虫设置图例 特换cookie 和 useragent中的
    // 这里useragent我已经替换好了, 替换自己的cookie就行
    const cookie = 'q_c1=f1db8beb2b3d416fb0a56b93bcd8b697|1507786911000|1496486038000; d_c0="ACACBON02wuPTjtwVAXwaOVZalZdz6ep7pY=|1496486043"; __utma=51854390.1502588195.1496486155.1505483936.1507786730.17; __utmz=51854390.1507786730.17.14.utmcsr=e.firefoxchina.cn|utmccn=(referral)|utmcmd=referral|utmcct=/; __utmv=51854390.000--|2=registration_date=20161119=1^3=entry_date=20170603=1; _zap=78865d42-c76f-4fd8-8fcf-895efa9a19e5; r_cap_id="NDE2OGNmMmFhZDA1NDJhZGJmOGFlZmM5ZmQ2ZGMxNTM=|1507786721|0b3ea337566125e6a7b5d40f4a1e95a766de8f5a"; cap_id="YmUyNzU5ZTgzZTU2NDAzODk5YzEzYTIzYTZlMGVmMWY=|1507786721|c3f45b28b74a829dae5aa4ddf8aae07decc03b48"; l_cap_id="ODI4NTQwNDM3MWUxNDFlOWIwN2U0NzBiMTA4Yzk4MTQ=|1507786877|f833b408aa785977080f651f00d9ba8af17f8679"; z_c0=Mi4xdGotMkF3QUFBQUFBSUFJRTQzVGJDeGNBQUFCaEFsVk5rWTBHV2dBeHJtYnozNXAwa3BSU2RCZ1h1QlB2WnFfQzBn|1507786897|9b7d325646bf36a011e8d4ed0dcc58f17fbc6eb5; _xsrf=6903c9af-6cc9-4174-9446-a1435e8a357b'
    const useragent = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:56.0) Gecko/20100101 Firefox/56.0'
    const headers = {
        'Cookie': cookie,
        'User-Agent': useragent,
    }

    const options = {
        url: url,
        headers: headers,
    }

    request(options, function(error, response, body){
        if(error === null && response.statusCode == 200){
            const answer = answerFromBody(body)
            // 引入自己写的模块文件
            // ./ 表示当前目录
            const utils = require('./utils.js')
            const path = 'zhihu.txt'
            utils.saveJSON(path, answer)
        }else{
            log('***error 请求失败', error)
        }
    })
}

__main()

