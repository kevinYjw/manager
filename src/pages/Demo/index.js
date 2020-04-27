import React from 'react';
import './index.less';
import {Button} from 'antd';

export default class Demo extends React.Component{
    render(){
        return <div className="content">
            <Button>antd 点击一下</Button>
        </div>
    }
}