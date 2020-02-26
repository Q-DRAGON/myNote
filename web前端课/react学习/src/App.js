// import { Component } from 'react' 是把 import 语法和解包结合在一起
import React, {Component} from 'react'
import logo from './logo.svg'
import './App.css'

import Message from './Message'
import Timer from './Timer'
import TodoApp from './Todo'
import MarkdownEditor from './editor'


// React 里定义一个组件 (组件通常是一个类) 的方式
// extends 的意思是继承, 也就是说 App 这个组件继承 Component 组件
class App extends Component {
    // constructor 传入了一个 props 参数, 这是一个固定套路写法
    constructor(props) {
        // super(props) 也是一个固定套路
        super(props)
        // react 的操作思路是通过修改 this.state 这个变量来改变页面的 UI
        this.state = {
            showTimer: true,
        }
    }

    handleToggleTimer = (event) => {
        let show = !this.state.showTimer
        // 只能通过 this.setState 的方式更改 state
        // 注意, 不能通过 this.state = xxx 的方式更改 state
        this.setState({
            showTimer: show,
        })

        // state 发生变化后, 会自动调用组件的 render 方法
    }

    // render 方法对于大多数组件来说都是必要的
    // return 的内容会被渲染到页面中
    render() {
        // 用一个变量来决定是否显示 Timer 组件
        // 注意, 在 react 里面如果想让一个组件不显示, 需要把值设为 null, 而不是空字符串 ''
        // 这个是三元表达式的语法
        // a ? b : c 的意思是 如果 a 为 true, 那么结果是 b, 否则结果是 c
        let timer = this.state.showTimer ? <Timer /> : null
        // 相当于下面的语句
        // let timer
        // if (this.state.showTimer) {
        //     timer = <Timer />
        // } else {
        //     timer = null
        // }


        /*
        <Message name='gua' />
        使用组件 Message 组件相当于调用 Message 函数, 并且传入参数
        Message({
            name: 'gua',
        })
        */
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </header>
                <Message name='gua' />
                <Message name='瓜' />
                <button onClick={this.handleToggleTimer}>开关 timer</button>
                {/*timer 是一个变量, 在 jsx 里面会被解析出来*/}
                {timer}
                <TodoApp/>
                <MarkdownEditor/>
            </div>
        )
    }
}

// 把 App 这个组件导出, 这样就可以在其他文件 (比如 index.js) 里通过 import 的方式引入
export default App
