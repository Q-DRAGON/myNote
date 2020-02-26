// webpack 会先运行 index.js
// 导入 utils.js 文件中导出的 log 函数
import log from './utils.js'

// webpack 不仅可以 import js, 还可以 import css
// 但是 webpack 本身并不支持原生解析 css, 所以要使用 webpack loader 机制
// 可以认为 webpack loader 的作用是用来把其他资源解析成 webpack 支持的形式
import './main.css'

const e = selector => document.querySelector(selector)

const __main = () => {
    let element = e('#root')
    let button = e('#id-button')
    button.addEventListener('click', (event) => {
        log('event', event.target)
        element.textContent = 'button click'
    })
}

__main()
