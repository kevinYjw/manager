import React from 'react';
import { Menu } from 'antd';
import menuConfig from '../../config/menuConfig';
import {Link} from 'react-router-dom';

import './index.less';

let {SubMenu} = Menu;

export default class NavLeft extends React.Component{
    componentWillMount(){
        let menuItem = this.menuRender(menuConfig);
        this.setState({
            menuItem
        })
    }
    menuRender = (data) =>{
        return data.map((item) => {
            if(item.children){
                return (<SubMenu key={item.key} title={item.title}>
                    {this.menuRender(item.children)}
                </SubMenu>)
            }
            return (<Menu.Item key={item.key}>
                <Link to={item.key}>{item.title}</Link>
            </Menu.Item>)
        })
    }
    render(){
        return (<div style={{height:'100vh',backgroundColor:'#001529'}}>
            <div className="logo">
                <img className="icon" src="/assets/logo-ant.svg" alt=""/>
                <h1>Imooc MS</h1>
            </div>
            <Menu theme="dark">{this.state.menuItem}</Menu>
        </div>);
    }
}