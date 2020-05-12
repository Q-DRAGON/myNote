import React from 'react';
import ReactDom from 'react-dom';

import { Provider } from 'react-redux';
import store from './store.js';
import Main from './Main/Main.jsx';

ReactDom.render(
    <Provider store={store}>
        <Main />
    </Provider>,
    document.querySelector('#root')
);
