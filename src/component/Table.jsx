import React, {useState, useEffect} from 'react';
import { Modal, List, Button, WhiteSpace, WingBlank, Icon } from 'antd-mobile';
import axios from '../common/axios';


const renderTheader = () => {
    return <div className={'table-header'}>
        <div className={'item'}>名称</div>
        <div className={'item'}>总进球</div>
        <div className={'item'}>总助攻</div>
        <div className={'item'}>操作</div>
    </div>;
};

const renderTable = (props, dataList) => {
    if(dataList.length === 0) return null;
    let els = dataList.map((item, key) => {

        return <div key={key} className={'item-list'}>
            <div className={'item item-name'}>{item.name}</div>
            <div className={'item item-goal'}>{item.goal}</div>
            <div className={'item item-assist'}>{item.assist}</div>
            <div className={'item item-assist'} onClick={() => props.updatePlayer(item)}>{'修改'}</div>
        </div>;
    });
    return <div>{els}</div>;
};




const Table = (props) => {


    return <div>
        <div>
            {renderTheader()}
        </div>
        <div className={'table-content'}>
            {renderTable(props, props.dataList)}
        </div>
    </div>;
};

export default Table;
