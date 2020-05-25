import React from 'react';
import {Card,Form,Select,Button,Table,Modal,message} from 'antd';
import axios from '../../common/js/axios';
import Util from '../../utils/utils';

const FormItem = Form.Item;
const Option = Select.Option;

export default class City extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list:[],
            pagination:0,
            isShowOpenCity:false
        }
        this.cityForm = React.createRef();
    }
    param = {
        page:1
    }
    componentWillMount(){
        this.getCityData();
    }
    render(){
        const columns = [
            {
                title:'城市ID',
                dataIndex:'id',
                key:'1'
            }, {
                title: '城市名称',
                dataIndex: 'name',
                key:'2'
            }, {
                title: '用车模式',
                dataIndex: 'mode',
                key:'3',
                render(mode){
                    return mode ==1 ?'停车点':'禁停区';
                }
            }, {
                title: '营运模式',
                dataIndex: 'op_mode',
                key:'4',
                render(op_mode) {
                    return op_mode == 1 ? '自营' : '加盟';
                }
            }, {
                title: '授权加盟商',
                dataIndex: 'franchisee_name',
                key:'5'
            }, {
                title: '城市管理员',
                dataIndex: 'city_admins',
                key:'6',
                render(arr){
                    return arr.map((item)=>{
                        return item.user_name;
                    }).join(',');
                }
            }, {
                title: '城市开通时间',
                dataIndex: 'open_time',
                key:'7'
            }, {
                title: '操作时间',
                dataIndex: 'update_time',
                key:'8',
                render:Util.formateDate
            }, {
                title: '操作人',
                dataIndex: 'sys_user_name',
                key:'9'
            }
        ]
        return (<div style={{width:'100%'}}>
            <Card  style={{width:'100%'}}>
                <FilterForm/>
            </Card>
            <Card>
                <Button onClick={this.handleOpenCity}>开通城市</Button>
            </Card>
            <div>
                <Table columns={columns} dataSource={this.state.list} pagination={this.state.pagination}/>
            </div>
            <Modal title="开通城市" visible={this.state.isShowOpenCity} onOk={this.handleSubmit} onCancel={() => {
                this.setState({
                    isShowOpenCity:false
                })
            }}>
                <OpenCityForm ref={this.cityForm}/>
            </Modal>
        </div>);
    }

    handleOpenCity = () => {
        this.setState({
            isShowOpenCity:true
        })
    }

    handleSubmit = () => {
        let data = this.cityForm.current.getFieldValue();
        axios.ajax({
            url:'/city/open',
            data:{
                params:data
            }
        }).then((res) => {
            if(res.code == 0){
                message.success('开通成功')
                this.setState({
                    isShowOpenCity:false
                })
                this.getCityData();
            }
        })
    }

    getCityData = () => {
        let this_ = this;
        axios.ajax({
            url:'/open_city',
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
                        this_.getCityData();
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
                    <Select placeholder="全部" style={{width:'120px'}}>
                        <Option value="">全部</Option>
                        <Option value="1">指定停车点模式</Option>
                        <Option value="2">禁停区模式</Option>
                    </Select>
                </FormItem>
                <FormItem label="营运模式" name="op_mode">
                    <Select placeholder="全部" style={{width:'80px'}}>
                        <Option value="">全部</Option>
                        <Option value="1">自营</Option>
                        <Option value="2">加盟</Option>
                    </Select>
                </FormItem>
                <FormItem label="加盟商授权状态" name="auth_status">
                    <Select placeholder="全部" style={{width:'100px'}}>
                        <Option value="">全部</Option>
                        <Option value="1">已授权</Option>
                        <Option value="2">未授权</Option>
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

class OpenCityForm extends React.Component{
    constructor(props){
        super(props);
        this.cityForm = React.createRef();
    }
    render(){
        return (
            <div>
            <Form layout="horizontal" ref={this.cityForm}>
                <FormItem label="选择城市" name="city_id">
                    <Select placeholder="全部" style={{width:'100px'}}>
                        <Option value="">全部</Option>
                        <Option value="1">北京市</Option>
                        <Option value="2">天津市</Option>
                        <Option value="3">深圳市</Option>
                    </Select>
                </FormItem>
                <FormItem label="营运模式" name="op_mode">
                    <Select placeholder="" style={{width:'100px'}}>
                        <Option value="">自营</Option>
                        <Option value="1">加盟</Option>
                    </Select>
                </FormItem>
                <FormItem label="用车模式" name="use_mode">
                    <Select placeholder="" style={{width:'100px'}}>
                        <Option value="1">指定停车点</Option>
                        <Option value="2">禁停区</Option>
                    </Select>
                </FormItem>
            </Form>
            <Button onClick={this.handle}>提交</Button>
            </div>
        )
    }
    getFieldValue= () => {
        return this.cityForm.current.getFieldValue();
    }
}
