import React from 'react';
import {HashRouter,Route,Switch,Redirect} from 'react-router-dom';
import App from './App';
import Admin from './admin';
import NoMatch from './components/NoMatch/index';
import Home from './pages/Home';

export default class Router extends React.Component{
    render(){
        return (<div>
            <HashRouter>
                <App>
                    <Route path="/" render={()=>
                        <Admin>
                            <Switch>
                                <Route path='/home' component={Home}></Route>
                                <Redirect to='/home' />
                                <Route component={NoMatch}></Route>
                            </Switch>
                        </Admin>
                    }></Route>
                </App>
            </HashRouter>
        </div>)
    }
}