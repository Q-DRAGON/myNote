import React, {Component} from 'react'
import './Button.css'
import classNames from 'classnames'

class Button extends Component {
    render() {
        // this.props.children 表示组件的所有子节点
        // 即 <Button> 和 </Button> 之间的所有节点
        const {type, children} = this.props

        // 我们使用 classNames 这个库来处理 react 中的 className
        // 文档: https://github.com/JedWatson/classnames
        const className = classNames({
            'gua-button': true,
            'gua-button-primary': type === 'primary',
        })
        return (
            <button type={type} className={className}>
                {
                    children
                }
            </button>
        )
    }
}

export default Button
