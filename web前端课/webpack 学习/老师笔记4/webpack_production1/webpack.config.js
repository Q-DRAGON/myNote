const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')

// webpack 配置的默认方式, 就是设置 module.exports 这个 object 的值
module.exports = {
    // entry 是 webpack 打包时的入口
    entry: './src/index.js',
    plugins: [
        // CleanWebpackPlugin 会在每次 build 的时候删除 dist 目录及目录里的内容
        new CleanWebpackPlugin(['dist']),
        new MiniCssExtractPlugin({
            // 上个版本的 css 内容是通过 style 的形式插入到页面中的
            // 现在直接把 css 内容保存到单独的 css 文件中
            // 注意, loader 的配置也修改了
            // filename: '[name].[hash:8].css',
            filename: '[name].[hash:8].css',
        }),
        new HtmlWebpackPlugin({
            // title 是指生成的 html 文件的 title 值
            title: 'webpack plugin demo',
            // filename 指定生成的 html 文件名称
            // 生成的文件默认放在 output.path 配置项的目录
            filename: 'index.html',
            // 使用当前目录下的 index.html 作为模板
            template: path.resolve(__dirname, 'index.html')
        }),
    ],
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
    // mode 的默认值是 production, 也就是设置为 production 模式
    // 这样会默认混淆 js 文件, 也就是看上去几乎没有可读性, 具体可以阅读 ./dist 目录下面的 js 文件内容
    mode: 'production',
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
                // 现在不是把 css 内容通过 style 标签插入到页面中, 而且通过 MiniCssExtractPlugin 提取到单独的文件中
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                ]
            }
        ]
    },
}
