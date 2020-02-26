import React, { Component } from 'react'
import Button from '../components/Button'

class DemoButton extends Component {
    render() {
        return (
            <div>
                <h1>Button 按钮</h1>
                <Button type="primary">Primary</Button>
                <Button>Default</Button>
            </div>
        )
    }
}

export default DemoButton
