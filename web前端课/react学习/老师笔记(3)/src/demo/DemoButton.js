import React, {Component} from 'react'
import Button from '../components/Button'

class DemoButton extends Component {
    render() {
        return (
            <div>
                <h1>Button 按钮</h1>
                <Button type="primary">Primary</Button>
                <Button>Default</Button>
                <h2>按钮尺寸</h2>
                <Button type="primary" size="large" disabled={true}>Primary</Button>
                <Button type="primary" size="default">Primary</Button>
                <Button type="primary" size="small">Primary</Button>
                <h2>按钮不可用状态</h2>
                <Button type="primary">Primary</Button>
                <Button type="primary" disabled>Primary(disabled)</Button>
                <h2>按钮 loading</h2>
                <Button type="primary" loading={true}>Loading</Button>
                <h2>按钮链接</h2>
                <Button type="primary" href="https://www.baidu.com">baidu</Button>
            </div>
        )
    }
}

export default DemoButton
