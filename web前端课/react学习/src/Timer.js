import React, { Component } from 'react'

class Timer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            secondsElapsed: 0,
        }
    }

    tick() {
        // prevState 是上一个 state
        this.setState((prevState) => ({
            secondsElapsed: prevState.secondsElapsed + 1,
        }))
    }

    // componentDidMount 会在组件 render 之后执行, 并且永远只执行一次
    componentDidMount() {
        console.log('定时器组件 did mount')
        // setInterval 的返回值保存下来, 下次
        this.interval = setInterval(() => this.tick(), 1000)
    }

    // componentWillUnmount 会在组件 移除 之后执行, 并且永远只执行一次
    componentWillUnmount() {
        console.log('定时器组件 will unmount')
        clearInterval(this.interval)
    }

    render() {
        return (
            <div>
                启动时间: {this.state.secondsElapsed}
            </div>
        )
    }
}

export default Timer
