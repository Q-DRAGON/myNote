const saveJSON = function(path, answers){
    const fs = require('fs')
    const s = JSON.stringify(answers, null, 2)
    fs.writeFile(path, s, function(error){
        if(error != null){
            console.log('**write file error***', error)
        }else{
            console.log('---保存成功')
        }
    })
}

// test函数没有用exports导出
// 所以在别的文件里面是无法使用的
const test = function(){
    console.log('test log')
}

/*
* 通过exports制作自己的模块
* */
exports.saveJSON = saveJSON