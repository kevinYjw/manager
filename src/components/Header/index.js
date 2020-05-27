import React from 'react';
import {Row,Col} from 'antd';
import getTime from '../../utils/utils';

import './index.less';
import axios from '../../common/js/axios';

export default class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userName:null,
            weather:{},
        }
    }
    componentWillMount(){
        this.setState({
            userName:'河畔一角',
            second:this.props.second || null
        })
        setInterval(() => {
            let currentTime = getTime.formateDate(new Date().getTime());
            this.setState({
                currentTime
            })
        },1000)
        this.getWeatherAPIData();
    }
    getWeatherAPIData(){
        let city = '上海'
        axios.jsonp({
            url:`http://api.map.baidu.com/telematics/v3/weather?location=${encodeURIComponent(city)}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        }).then((res) => {
            console.log(res);
            let data = res[0]['weather_data'][0]
            this.setState({
                weather:data
            })
        })
    }
    render(){
        return (<div style={{width:'100%'}}>
            <div className="header">
                <span className="name">欢迎， {this.state.userName}</span>
                <a href="javascript:void(0);">退出</a>
            </div>
            {
                this.state.second ? '' : 
                <Row className="crumbs">
                    <Col span="4" className="crumbs-title">首页</Col>
                    <Col span="20" className="crumbs-weather">
                        <span className="time">{this.state.currentTime}</span>
                        <span className="weather-img">
                            <img src={this.state.weather.dayPictureUrl} alt=""/>
                        </span>
                        <span className="weather-detail">{this.state.weather['weather']}</span>
                    </Col>
                </Row>
            }
        </div>);
    }
}