import React, { useState, useEffect, useRef, createRef } from 'react';
import axios from '../../common/axios';
import {getUrlParams} from '@bbb324/tools';
import Table from './Table';
import { Modal, List, Button, Toast } from 'antd-mobile';
const param = getUrlParams();
const playerName = createRef();
const hideAction = param.isReadonly === '1'; 

const playerData = {
    goal: createRef(),
    assist: createRef(),
    name: createRef()
};

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

const handleRemove = async (fn, data) => {

    const name = data ? data : playerName.current.value;
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

const playerResigterDialog = (fn, visible) => {

    return <Modal
        popup
        visible={visible}
        onClose={() => fn.setVisible(false)}
        animationType="slide-up"
    >
        <List renderHeader={() => <div>球员录入</div>} className="popup-list">
            {['姓名：',].map((i, index) => (
                <List.Item key={index}>
                    <span>{i}</span>
                    <input className={'name'} ref={playerName}/>
                </List.Item>
            ))}
            <List.Item>
                <Button type="primary" className={'add-btn'} onClick={() => handleSubmit(fn)}>添加</Button>
            </List.Item>
        </List>
    </Modal>;
};

const handleModify = async (fn) => {

    const goal = playerData.goal.current.value;
    const assist = playerData.assist.current.value;
    const name = playerData.name.current.value;
    if(isNaN(+assist) || isNaN(+goal)) {
        Toast.info('只能保存数字', 1.5);
        return;
    }
    const res = await axios.post('updatePlayer.json', {
        goal, assist, name
    });
    if(res.code === 500) {
        Toast.info('已存在', 1.5);
    } else {
        Toast.hide();
    }
    fn.setUpdateInfoVisible(false);
    fetchList(fn.setDataList);
};

const updatePlayerDataDialog = (fn, visible, player) => {
    let list = [
        {name: '姓名', code: 'name'},
        {name: '进球', code: 'goal'},
        {name: '助攻', code: 'assist'},
    ];
    return <Modal
        popup
        visible={visible}
        onClose={() => fn.setUpdateInfoVisible(false)}
        animationType="slide-up"
    >
        <List renderHeader={() => <div>数据修改</div>} className="popup-list">
            {list.map((i, index) => (
                <List.Item key={index}>
                    <span>{i.name}</span>
                    <input className={'name'} ref={playerData[i.code]} defaultValue={player[i.code]=== 0 ? '' : player[i.code]} disabled={i.code === 'name'}/>
                </List.Item>
            ))}
            <List.Item>
                <Button type="primary" className={'add-btn'} onClick={() => handleModify(fn)}>修改</Button>
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

const triggerUpdatePlayer = async (fn, data) => {
    fn.setUpdateInfoVisible(true);
    fn.setUpdatePlayer(data);
};

const triggerDeletePlayer = async (fn, player) => {
    
    handleRemove(fn, player.name);
};

const App = () => {
    const year = new Date().getFullYear();
    const [visible, setVisible] = useState(false); // 注册球员对话框
    const [updateInfoVisible, setUpdateInfoVisible] = useState(false); // 修改球员信息对话框
    const [updatePlayer, setUpdatePlayer] = useState(false); // 需要修改的球员信息
    const [dataList, setDataList] = useState([]);
    
    const fn = { setVisible, setDataList, setUpdateInfoVisible, setUpdatePlayer };
    useEffect(() => {
        fetchList(setDataList);
    }, []);

    return <div>
        {playerResigterDialog(fn, visible)}
        {updatePlayerDataDialog(fn, updateInfoVisible, updatePlayer)}
        <div className="header">
            <img className="logo" src="public/img/bundesliga_logo.png"/>
            <span className={'text'}>{`养生堂 ${year} 赛季`}</span>
            {hideAction ? null : <div className={'add-player'} onClick={() => showDialog(fn)}>+</div>}
        </div>
        <div>
            <Table dataList={dataList} 
                hideAction={hideAction}
                updatePlayer={(player) => triggerUpdatePlayer(fn, player)}
                deletePlayer={player => triggerDeletePlayer(fn, player)}
            />
        </div>
    </div>;
};

export default App;
