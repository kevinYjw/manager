import React from 'react';
import {Row,Col} from 'antd';
import Header from './components/Header';
import Footer from './components/Footer';
import NavList from './components/NavLeft';
import Home from './pages/Home';

import './common/style/common.less';

export default class Admin extends React.Component{
    render(){
        return (<Row>
            <Col span="4">
                <NavList></NavList>
            </Col>
            <Col className="main" span="20">
                <Header></Header>
                <Row className="adminContent" style={{padding:'20px'}}>
                    {this.props.children}
                </Row>
                <Footer></Footer>
            </Col>
        </Row>);
    }
}