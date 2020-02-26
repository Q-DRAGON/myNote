import React, { Component } from 'react'
import './App.css'
import DemoButton from './demo/DemoButton'

class App extends Component {
  render() {
      // 本次项目要实现一个 Button 组件, 目前已经实现了 primary button 和 default button
      // 需要再实现 dashed button 和 danger button(参考 https://ant.design/components/button-cn/)
      // 具体做法为
      // 1. 在 demo/DemoButton.js 组件中调用下面两个组件
      // <Button type="dashed">Dashed</Button>
      // <Button type="danger">Danger</Button>

      // 2. 在 components/Button.js 中增加相应的 type 属性和 class 属性
      // 3. 在 components/Button.css 中增加相应的 css 样式

      // react 项目一般缩进 2 个空格, 但是我们选择缩进 4 个空格
      // 我们使用 EditorConfig 来保证这一点(https://editorconfig.org/)
      // atom 对应的 editorconfig 插件安装方法
      // 在命令行里面输入 apm install editorconfig 等待安装
      // 但是建议使用 webstorm
    return (
      <div className="App">
          <DemoButton />
      </div>
    )
  }
}

export default App
