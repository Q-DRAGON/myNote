const log = console.log.bind(console)

// 默认导出 log 变量, 这里的 log 实际上是一个函数
// 以 default 的形式导出的变量可以直接导入
// 参考链接:
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/export#%E4%BD%BF%E7%94%A8%E9%BB%98%E8%AE%A4%E5%AF%BC%E5%87%BA
export default log
