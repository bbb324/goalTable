/**
 * Created by junxie on 18/5/27.
 */
import React from 'react';
import ReactDom from 'react-dom';
import App from './component/App';
import './style.less';

import 'antd-mobile/dist/antd-mobile.css';
ReactDom.render(<App />,
    document.getElementById('app')
);
