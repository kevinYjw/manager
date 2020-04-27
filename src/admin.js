import React from 'react';
import {Row,Col} from 'antd';
import Header from './components/Header';
import Footer from './components/Footer';
import NavList from './components/NavLeft';

export default class Admin extends React.Component{
    render(){
        return (<Row>
            <Col span="4">
                <NavList></NavList>
            </Col>
            <Col span="20">
                <Header></Header>
                <Row></Row>
                <Footer></Footer>
            </Col>
        </Row>);
    }
}