import React from 'react'
import Remarkable from 'remarkable'

import './editor.css'


class MarkdownEditor extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        let mdString = '输入 *markdown 语法* 就能看到效果'
        this.state = {
            value: mdString,
        }
    }

    handleChange() {
        // this.refs.input 可以拿到 ref=input 的 dom 元素
        this.setState({
            value: this.refs.input.value,
        })
    }

    getRawMarkup() {
        let md = new Remarkable()
        let html = md.render(this.state.value)
        console.log('html', html)
        return {
            __html: md.render(this.state.value)
        }
    }

    render() {
        // 注意 dangerouslySetInnerHTML 这个属性
        // 这就是 innerHTML 在 jsx 里面的写法
        // ref 是给 this.refs 用的
        return (
            <div className="MarkdownEditor">
                <h1>markdown 编辑器</h1>
                <h3>原始 md 文本</h3>
                <textarea
                    onChange={this.handleChange}
                    ref="input"
                    defaultValue={this.state.value}/>
                <h3>结果预览</h3>
                <div
                    className="content"
                    dangerouslySetInnerHTML={this.getRawMarkup()}
                />
            </div>
        )
    }
}

export default MarkdownEditor
