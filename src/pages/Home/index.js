import React from 'react';
import axios from '../../common/js/axios'; 

import './index.less'

export default class Home extends React.Component{
    getTableList(){
        axios.ajax({
            url:'/table/list',
            data:{
                isShowLoading:true
            }
        }).then((res) => {

        })
    }
    componentWillMount(){
        this.getTableList();
    }
    render(){
        return (<div className="content">
            欢迎学习IMooc后台管理系统课程
        </div>);
    }
}