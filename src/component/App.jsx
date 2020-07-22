import React, { useState, useEffect, useRef, createRef } from 'react';
import axios from '../common/axios';

import Table from './Table';
import { Modal, List, Button, Toast } from 'antd-mobile';
const playerName = createRef();

const handleSubmit = async (fn) => {

    const name = playerName.current.value;

    Toast.loading('Loading...', 5);

    const res = await axios.post('playerRegister.json', {name});
    if(res.code === 500) {
        Toast.info('已存在', 1.5);
    } else {
        Toast.hide();
    }

    fn.setVisible(false);
    fetchList(fn.setDataList);

};

const handleRemove = async fn => {
    const name = playerName.current.value;
    Toast.loading('Loading...', 5);
    const res = axios.post('playerRemove.json', {name});
    if(res.code === 500) {
        Toast.info('已存在', 1.5);
    } else {
        Toast.hide();
    }
    fn.setVisible(false);
    fetchList(fn.setDataList);
};

const dialog = (fn, visible) => {

    return <Modal
        popup
        visible={visible}
        onClose={() => fn.setVisible(false)}
        animationType="slide-up"
    >
        <List renderHeader={() => <div>球员录入</div>} className="popup-list">
            {['姓名',].map((i, index) => (
                <List.Item key={index}>
                    <span>{i}</span>
                    <input name={'playerName'} ref={playerName}/>
                </List.Item>
            ))}
            <List.Item>
                <Button type="primary" onClick={() => handleSubmit(fn)}>添加</Button>
                <Button type="primary" onClick={() => handleRemove(fn)}>移除</Button>
            </List.Item>
        </List>
    </Modal>;
};

const showDialog = async (fn) => {
    fn.setVisible(true);
};


const fetchList = async (setDataList) => {
    const res = await axios.get('playerList.json');
    setDataList(res.data);
};

const App = () => {
    const year = new Date().getFullYear();
    const [visible, setVisible] = useState(false);
    const [dataList, setDataList] = useState([]);

    const fn = { setVisible, setDataList };
    useEffect(() => {
        fetchList(setDataList);
    }, []);

    return <div>
        {dialog(fn, visible)}
        <div className="header">
            <img className="logo" src="public/img/bundesliga_logo.png"/>
            <span className={'text'}>{`养生堂 ${year} 赛季`}</span>
            <div className={'add-player'} onClick={() => showDialog(fn)}>+</div>
        </div>
        <div>
            <Table dataList={dataList}/>
        </div>
    </div>;
};

export default App;

