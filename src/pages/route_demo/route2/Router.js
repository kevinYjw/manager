import React from 'react';
import {HashRouter,Route} from 'react-router-dom';
import Home from './Home';
import Main from '../route1/Main';
import About from '../route1/About';
import Topics from '../route1/Topics';

export default class Router extends React.Component{
    render(){
        return (
            <HashRouter>
                <Home>
                    <Route exact={true} path="/" component={Main}></Route>
                    <Route path="/about" component={About}></Route>
                    <Route path="/topics" component={Topics}></Route>
                </Home>
            </HashRouter>
        )
    }
}