import React from 'react';
import { Menu } from 'antd';

import './index.less';

export default class NavLeft extends React.Component{
    render(){
        return (<div>
            <div className="logo">
                <img className="icon" src="/assets/logo-ant.svg" alt=""/>
                <h1>Imooc MS</h1>
            </div>
            <Menu theme="dark">
                <Menu.Item>Option 5</Menu.Item>
                <Menu.Item>Option 6</Menu.Item>
            </Menu>
        </div>);
    }
}