import React from 'react';
import {Link} from 'react-router-dom';

export default class Home extends React.Component{
    render(){
        return (
            <div>
                <ul>
                    <li>
                        <Link to="/main">home</Link>
                    </li>
                    <li>
                        <Link to="/about">about</Link>
                    </li>
                    <li>
                        <Link to="/topics">topics</Link>
                    </li>
                    <li>
                        <Link to="/imooc">Imooc</Link>
                    </li>
                </ul>
                {this.props.children}
            </div>
        )
    }
}