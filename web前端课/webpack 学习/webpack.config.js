// 项目运行方式
// 1. 切换到项目根目录之后, 在命令行输入「yarn install」
// 2. 等到依赖安装完成输入「yarn run build」
// 3. 在浏览器中打开 index.html 即可看到效果


// webpack 实际上是一个打包工具, 打包工具就是把 js 文件合并成一个文件
// 但是很多人没有意识到这点, 认为 webpack 是全部, 开口必谈 webpack, 实际上暴露了对这个的不了解
// 我们通过一些 webpack 教程帮助大家更好地认识、学习、掌握 webpack

// 引入 path 模块，方便处理处理路径问题
// 注意, webpack.config.js 是 webpack 的配置文件
// 在 package.json 的 scripts 里有一个 build 命令, 当在项目根目录输入 yarn run build 时
// 实际执行的是「webpack webpack.config.js」命令, 如果只有 webpack 命令, 会默认读取根目录的 webpack.config.js 作为配置文件
// 在这个配置文件里可以直接通过 require 的形式导入 node 的模块
const path = require('path')

// webpack 配置的默认方式, 就是设置 module.exports 这个 object 的值
module.exports = {
    // entry 是 webpack 打包时的入口
    entry: './src/index.js',
    // output 是 webpack 打包之后输出的文件配置
    output: {
        // filename 指定输出的文件名
        filename: 'main.js',
        // path 指定输出的文件路径
        // 其中 __dirname 是 webpack.config.js 文件所在的目录
        // path.resolve 会把文件地址转成绝对路径
        // 也就是说 webpack 打包之后的文件为 /${root}/dist/main.js
        // 其实 ${root} 表示项目根目录的绝对路径表示形式
        path: path.resolve(__dirname, 'dist'),
    },
    // 这个选项不用关心, 直接跳过
    mode: 'none',
}
