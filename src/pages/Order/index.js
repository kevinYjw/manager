import React from 'react';
import {Card,Form,Select,Button,Table,Modal,message,DatePicker} from 'antd';
import axios from '../../common/js/axios';
import Util from '../../utils/utils';

const FormItem = Form.Item;
const Option = Select.Option;
const {RangePicker} = DatePicker;

export default class Order extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list:[],
            pagination:0,
        }
    }
    param = {
        page:1
    }
    componentWillMount(){
        this.getOrderData();
    }
    render(){
        const columns = [
            {
                title:'订单编号',
                dataIndex:'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render(distance){
                    return distance/1000 + 'Km';
                }
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time'
            },
            {
                title: '状态',
                dataIndex: 'status'
            },
            {
                title: '开始时间',
                dataIndex: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay'
            }
        ]
        return (<div>
            <Card>
                <FilterForm />
            </Card>
            <Card>
                <Button>订单详情</Button>
                <Button style={{marginLeft:'20px'}}>结束订单</Button>
            </Card>
            <div>
                <Table columns={columns} dataSource={this.state.list} pagination={this.state.pagination}/>
            </div>
        </div>)
    }
    getOrderData = () => {
        let this_ = this;
        axios.ajax({
            url:'/order/list',
            data:{
                params:{
                    page:this.param.page
                }
            }
        }).then((res) => {
            if(res.code == 0){
                this_.setState({
                    list:res.result.item_list,
                    pagination:Util.pagination(res,(current) => {
                        this_.param.page = current;
                        this_.getOrderData();
                    })
                })
            }
        })
    }
}

class FilterForm extends React.Component{
    render(){
        return (
            <Form layout="inline">
                <FormItem label="城市" name="city_id">
                    <Select placeholder="全部" style={{width:'80px'}}>
                        <Option value="">全部</Option>
                        <Option value="1">北京市</Option>
                        <Option value="2">天津市</Option>
                        <Option value="3">深圳市</Option>
                    </Select>
                </FormItem>
                <FormItem label="用车模式" name="mode">
                    <RangePicker format="YYYY-MM-DD HH:mm"/>
                </FormItem>
                <FormItem label="订单状态" name="op_mode">
                    <Select placeholder="全部" style={{width:'80px'}}>
                        <Option value="">全部</Option>
                        <Option value="1">进行中</Option>
                        <Option value="2">结束行程</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button type="primary" style={{margin:'0 20px'}}>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        )
    }
}