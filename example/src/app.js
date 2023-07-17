/**
 * Created by junxie on 18/5/27.
 */
import React from 'react';
import ReactDom from 'react-dom';
import {
    Button
} from 'antd';
import './app.less';

const App = () => {
    return <div>
        11
        <Button>66</Button>
    </div>;
};

ReactDom.render(<App />,
    document.getElementById('root')
);
