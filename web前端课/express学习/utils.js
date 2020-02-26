const log = console.log.bind(console)

log('require.main === module', require.main === module)

// 把 log 函数暴露出去, 这样在其他文件中可以引用
module.exports = {
    log: log,
}