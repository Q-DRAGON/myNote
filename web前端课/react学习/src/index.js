// index.js 是程序的入口文件, 程序从这里开始执行
// import a from b 这样的语法是指从 b 这个库里面引入 a 这个变量（可以是普通变量, 也可以是函数, 也可以是类）
// 注意, b 是一个字符串, 用来表示引用代码的路径, 如果引入的是 js 文件, 可以省略后缀名
// 一般地, 如果路径以「.」开头，那么通常是我们自己写的代码, 比如「./App」
// 如果没有以「.」开头, 那么是引入别人写好的库, 比如「react」
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

// React.render 的意思是在某个 DOM 元素下面渲染一个 React 组件
// 第一个参数是 React 组件, App 是引入 './App' 这个文件
// 第二个参数是 DOM 元素, 这里使用的是 getElementById 来获取元素
ReactDOM.render(<App />, document.getElementById('root'))


// 下面这一段不用关心, 直接跳过

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
