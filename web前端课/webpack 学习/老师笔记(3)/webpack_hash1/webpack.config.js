// 项目运行方式
// 1. 切换到项目根目录之后, 在命令行输入「yarn install」
// 2. 等到依赖安装完成输入「yarn run build」
// 3. 在浏览器中打开 index.html 即可看到效果

const path = require('path')

// webpack 配置的默认方式, 就是设置 module.exports 这个 object 的值
module.exports = {
    // entry 是 webpack 打包时的入口
    entry: './src/index.js',
    // output 是 webpack 打包之后输出的文件配置
    output: {
        // filename 指定输出的文件名
        // [chunkhash] 是文件内容的 hash 值
        // [chunkhash:8] 的意思是取前 8 位, 默认为 20 位
        filename: 'main_[chunkhash:8].js',
        // path 指定输出的文件路径
        // 其中 __dirname 是 webpack.config.js 文件所在的目录
        // path.resolve 会把文件地址转成绝对路径
        // 也就是说 webpack 打包之后的文件为 /${root}/dist/main.js
        // 其实 ${root} 表示项目根目录的绝对路径表示形式
        path: path.resolve(__dirname, 'dist'),
    },
    // 这个选项不用关心, 直接跳过
    mode: 'none',
    // 监听文件变动, 当文件修改后, 会自动 build
    watch: true,
    // module 配置其他类型(webpack 原生不支持的类型)的解析方式
    module: {
        // rules 选项用来配置 module 的读取和解析规则
        // rules 的值是一个数组, 数组的每一个元素都可以用来匹配并处理元素
        rules: [
            {
                // test 用来匹配 css 文件, 这里用的是正则的语法
                // 正则这个东西很不推荐, 但是用来匹配文件类型的确比较方便... 而且官方也推荐这样的用法, 所以我们忍了...
                test: /\.css$/,
                // use 用来处理 css 文件, 注意, 是按照数组从后往前的顺序来处理
                // 即先使用 css-loader 处理, 然后使用 style-loader 处理 css 文件
                // style-loader 的作用是把 css 加到页面的 <style> 标签中
                // 所以查看网页源码可以发现 main.css 的内容插入到 style 标签中了
                use: [
                    'style-loader',
                    'css-loader',
                ]
            }
        ]
    },
}
