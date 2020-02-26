import React from 'react'

// 引入自己的 css
import './message.css'

// 这里 Component 并没有通过解包的方式引入, 所以需要使用 React.Component 来使用
class Message extends React.Component {
    // Message 组件并没有使用自己的 state, 而是直接通过 props 来渲染页面内容
    // 这种组件称为 无状态组件(stateless component)
    // 并且不需要在 constructor 里面定义 state, constructor 函数也可以直接省略

    render() {
        // 用一个变量把 this.props.name 接住
        // Message 导出之后, 可以在其他地方像下面的形式使用
        // <Message name="gua" />
        // 这样通过 this.props.name 就可以拿到 'gua' 这个值
        // this.props 就是调用组件时传进来的属性, 相当于函数的参数
        let name = this.props.name
        return (
            // return 这里面的语法看着很像 HTML, 但实际上是 jsx
            // {} 里面可以使用 js 的变量
            // 此外, 因为 class 是关键字, 所以使用 className 表示 HTML 里面的 class
            <div className='message-container'>
                {/*
                    jsx 的注释方式
                */}
                <div>Hello { name }</div>
                <div>大写 { name.toUpperCase() }</div>
            </div>
        )
    }
}

// 导出 Message 组件
export default Message
