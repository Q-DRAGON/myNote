import React from 'react'
import Menu from './Menu'

// class component

// class Home extends Component {
//     render() {
//         return (
//             <div>
//                 {/*Home 组件中渲染 Menu 组件*/}
//                 <Menu />
//                 点击上面的链接
//             </div>
//         )
//     }
// }


// functional component
function Home() {
    return (
        <div>
            {/*Home 组件中渲染 Menu 组件*/}
            <Menu />
            点击上面的链接
        </div>
    )
}

export default Home
