import React, {Component} from 'react'
import './App.css'
import DemoButton from './demo/DemoButton'

class App extends Component {
    render() {
        // 参考 https://ant.design/components/button-cn/
        // 1. 给 Button 增加 loading 属性, 这是一个 boolean 属性
        // 如果这个值为 true, 按钮有一个 loading 效果并且不可以点击
        // loading 效果一般使用特定的 font 来使用, 参考 ant design
        // 不可点击可以使用 disabled 实现, 也可以使用 pointer-events 实现

        // 2. 给 Button 增加 href 属性
        // 注意, 如果 Button 有 href 属性, 此时渲染出来是一个 a,
        // 即 Button 组件 return 的是 a 元素
        return (
            <div className="App">
                <DemoButton/>
            </div>
        )
    }
}

export default App
