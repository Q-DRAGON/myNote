目前开始的 webpack 监听模式有一点点不足, 当 css 或者 js 改变时, 会在 dist 目录下重新生成新的文件, 但是旧资源文件并没有删除
并且还有一个问题, 当我们改变代码的时候, build 成功还需要刷新浏览器才能看到效果. 如果能自动刷新浏览器（`live reloading`）就更好（类似 react 的形式）

为了解决这两个问题, 我们使用 `webpack-dev-server` 这个库, 具体配置可以查看 `webpack.config.js`
为了和之前的 build 区分, 这次使用了一个新 `script`, 运行 `yarn run start` 就会运行 web server 并且自动打开浏览器


此外, 可能有些 `webpack` 启动的时候是添加 `--watch` 参数,
实际上和 `watch: true` 的效果是一样的, 但是应该在 `webpack.config.js` 里面配置
