import React from 'react';

// 建立redux与组件的联系, 组件通过this.props获取state值
import { connect } from 'react-redux';
import { addTodo } from '../actions/tabAction.js';


// let Main = React.createElement({});
class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    click() {
        this.props.dispatch(addTodo({
            num: 10,
        }));
    }
    render() {
        let num = this.props.num;
        return (
            <div onClick={()=>this.click()}>{num}</div>
        );
    }
}

export default connect(
    state => ({
        num: state.tabReducer.num,
    })
)(Main);
