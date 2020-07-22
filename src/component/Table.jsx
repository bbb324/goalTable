import React, {useState, useEffect} from 'react';
import { Modal, List, Button, WhiteSpace, WingBlank, Icon } from 'antd-mobile';
import axios from '../common/axios';


const renderTheader = () => {
    return <div className={'table-header'}>
        <div className={'item'}>名称</div>
        <div className={'item'}>进球</div>
        <div className={'item'}>助攻</div>
        <div className={'item'}>更多</div>
    </div>;
};


const edit = (fn, item) => {
    fn.setVisible(true);
    fn.setPlayer(item);
};

const renderTable = (fn, dataList) => {
    if(dataList.length === 0) return null;
    let els = dataList.map((item, key) => {

        return <div key={key} className={'item-list'} onClick={() => edit(fn, item)}>
            <div className={'item item-name'}>{item.name}</div>
            <div className={'item item-goal'}>{item.goal}</div>
            <div className={'item item-assist'}>{item.assist}</div>
            <div className={'item item-assist'}>{'走势'}</div>
        </div>;
    });
    return <div>{els}</div>;
};

const dialog = (fn, visible, player) => {
    return <Modal
        popup
        visible={visible}
        onClose={() => fn.setVisible(false)}
        animationType="slide-up"
    >
        <List renderHeader={() => <div>数据录入</div>} className="popup-list">
            {['股票名称', '股票代码', '买入价格'].map((i, index) => (
                <List.Item key={index}>{i}</List.Item>
            ))}
            <List.Item>
                <Button type="primary" onClick={() => fn.setVisible(false)}>买入</Button>
            </List.Item>
        </List>
    </Modal>;
};



const Table = (props) => {
    const [visible, setVisible] = useState(false);


    const fn = {setVisible};


    return <div>
        {dialog(fn, visible)}
        <div>
            {renderTheader()}
        </div>
        <div className={'table-content'}>
            {renderTable(fn, props.dataList)}
        </div>
    </div>;
};

export default Table;
