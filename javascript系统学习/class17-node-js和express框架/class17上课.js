var a = 'hello'
console.log(a, ' gua')

var os = require('os')
console.log(os.uptime())


var fs = require('fs')
fs.readdir('.', function(err, files){
    console.log('error', typeof err, err)
    if(err != null) {
        console.log(err)
    } else {
        console.log('files', files)
    }
})

fs.writeFile('message.txt', '你好 Node.js', (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('写入成功')
}
})


var file = 'message.txt'

fs.readFile(file, 'utf-8', function(err, content){
    if(err){
        console.log('失败');
    }else {
        console.log(content);
    }
})

fs.unlink(file, function(err){
    if(err){
        log('error', err, err.path, typeof err)
    }else{
        console.log(`${file}成功删除`);
    }
})
