import React from 'react';
import {HashRouter,Route,Switch} from 'react-router-dom';
import Home from './Home';
import Main from './Main';
import About from '../route1/About';
import Topics from '../route1/Topics';
import Info from './Info';
import Error from './Error';

export default class Router extends React.Component{
    render(){
        return (
            <HashRouter>
                <Home>
                    <Switch>
                        <Route path="/main" component={()=>
                            <Main>
                                <Route path="/main/:value" component={Info}></Route>
                            </Main>
                        }></Route>
                        <Route path="/about" component={About}></Route>
                        <Route path="/topics" component={Topics}></Route>
                        <Route component={Error}></Route>
                    </Switch>
                </Home>
            </HashRouter>
        )
    }
}