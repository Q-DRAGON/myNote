import React, {Component} from 'react'
import './App.css'
import DemoButton from './demo/DemoButton'

class App extends Component {
    render() {
        // 参考 https://ant.design/components/button-cn/
        // 1. 给 Button 增加 size 属性
        // size 的取值只能为 large, default, small 中的一种或者不传值
        // 做法
        // a. 当 size 为 large 时, button 增加一个 class(gua-button-large) 和相应的样式
        // b. 当 size 为 default 时, button 不增加 class
        // c. 当 size 为 large 时, button 增加一个 class(gua-button-small) 和相应的样式

        // 2. 给 Button 增加 disabled 属性
        // 如果一个 Button 的 disabled 属性存在, 则这个按钮处于 disabled 状态, 不可以进行点击, hover 等操作
        // 注意, 如果调用的时候 disabled 值为 false(<Button disabled={false}>), 那么 disabled 这个属性不存在
        // 其他所有情况(包括 <Button disabled="false">) disabled 属性都存在
        return (
            <div className="App">
                <DemoButton/>
            </div>
        )
    }
}

export default App
