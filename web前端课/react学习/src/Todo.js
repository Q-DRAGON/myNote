import React, { Component } from 'react'
import './todo.css'

class TodoApp extends Component {
    constructor(props) {
        super(props)
        // 除了用箭头函数绑定 this, 还可以用 bind 来解决 this 问题
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            items: [],
            text: '',
        }
    }

    // input 的 value 发生变化的时候会被调用
    // 相当于在 input 元素上绑定了 change 事件
    handleChange(e) {
        console.log('e value', e.target.value)
        let state = {
            text: e.target.value,
        }
        // state 里面没有 items 属性, 所以只会更改 text 属性, 而不会更改 items 属性
        this.setState(state)
    }

    // 相当于在 button 元素上绑定了 click 事件
    // 用户点击按钮的时候就会调用这个函数
    // 这次用的箭头函数解决 this 问题
    handleSubmit = (e) => {
        let o = {
            text: this.state.text,
            id: Date.now(),
        }
        this.setState((prevState) => ({
            items: prevState.items.concat(o),
            text: ''
        }))
    }

    render() {
        let buttonTitle = `添加第 ${this.state.items.length + 1} 个 todo`
        return (
            <div className="todo-container">
                <h2>TODO</h2>
                <TodoList todos={this.state.items} />
                <div>
                    <input type="text" onChange={this.handleChange} value={this.state.text} placeholder="输入事项"/>
                    <button onClick={this.handleSubmit}>{buttonTitle}</button>
                </div>
            </div>
        )
    }
}

class TodoList extends Component {
    render() {
        let todos = this.props.todos
        console.log('todos', todos)
        let result = todos.map((t) => (
            console.log('todo', t)
        ))
        return (
            <ul>
                {/*jsx 里会自动把一个数组展开, 相当于自动遍历数组*/}
                {
                    todos.map((t) => (
                        // li 有一个 key 属性, 要求这个值不能重复, 这个是规定
                        <li key={t.id}>{ t.text }</li>
                    ))

                    // todos.map((t) => {
                    //
                    //     return (
                    //         <li key={t.id}>{ t.text }</li>
                    //     )
                    // })
                }

                {/*jsx 自动展开数组的例子*/}
                {/*{*/}
                {/*    ['zelda', 'dark soul']*/}
                {/*}*/}
            </ul>
        )
    }
}

export default TodoApp
