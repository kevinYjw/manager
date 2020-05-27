import React from 'react';
import {Card,Form,Select,Button,Table,Modal,message,DatePicker} from 'antd';
import axios from '../../common/js/axios';
import Util from '../../utils/utils';

import './detail.less';

export default class Detail extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            orderDetail:{}
        }
    }

    componentWillMount(){
        let orderId = this.props.match.params.orderId
        this.getOrderDetail(orderId);
    }

    getOrderDetail = (orderId) => {
        axios.ajax({
            url:'/order/detail',
            data:{
                params:{
                    orderId:orderId
                }
            }
        }).then((res) => {
            if(res.code == 0){
                this.setState({
                    orderDetail:res.result
                })
                
                this.initOrderDetailMap();
            }
        })
    }

    initOrderDetailMap = () => {
        this.map = new window.BMapGL.Map('orderDetailMap');
        var point = new window.BMapGL.Point(116.404, 39.915);
        this.map.centerAndZoom(point,11);
        this.addMapControl();
    }

    //添加地图控件
    addMapControl = () => {
        let map = this.map;
        map.addControl(new window.BMapGL.ScaleControl({ anchor: window.BMapGL_ANCHOR_TOP_RIGHT}));
        map.addControl(new window.BMapGL.NavigationControl({ anchor: window.BMapGL_ANCHOR_TOP_RIGHT }));
    }

    render(){
        return (<div style={{width:'100%'}}>
            <Card style={{padding:'50px'}}>
                <div id="orderDetailMap"></div>
                <div className="detail-caption">基础信息</div>
                <ul>
                    <li className="detailItem">
                        <div className="detail-title">用车模式</div>
                        <div className="detail-text">{this.state.orderDetail.mode == 1 ?'服务区':'停车点'}</div>
                    </li>
                    <li className="detailItem">
                        <div className="detail-title">订单编号</div>
                        <div className="detail-text">{this.state.orderDetail.order_sn}</div>
                    </li>
                    <li className="detailItem">
                        <div className="detail-title">车辆编号</div>
                        <div className="detail-text">{this.state.orderDetail.bike_sn}</div>
                    </li>
                    <li className="detailItem">
                        <div className="detail-title">用户姓名</div>
                        <div className="detail-text">{this.state.orderDetail.user_name}</div>
                    </li>
                    <li className="detailItem">
                        <div className="detail-title">手机号码</div>
                        <div className="detail-text">{this.state.orderDetail.mobile}</div>
                    </li>
                </ul>
                <div className="detail-caption">行驶轨迹</div>
                <ul>
                    <li className="detailItem">
                        <div className="detail-title">行程起点</div>
                        <div className="detail-text">{this.state.orderDetail.start_location}</div>
                    </li>
                    <li className="detailItem">
                        <div className="detail-title">行程终点</div>
                        <div className="detail-text">{this.state.orderDetail.end_location}</div>
                    </li>
                    <li className="detailItem">
                        <div className="detail-title">行驶里程</div>
                        <div className="detail-text">{this.state.orderDetail.distance/1000}公里</div>
                    </li>
                </ul>
            </Card>
        </div>)
    }
    
}