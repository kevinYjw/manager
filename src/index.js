import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Admin from './admin';
import * as serviceWorker from './serviceWorker';
import Route1 from './pages/route_demo/route1/Home';
import Route2 from './pages/route_demo/route2/Router'; 
import Route3 from './pages/route_demo/route3/Router'; 

ReactDOM.render(
  <React.StrictMode>
    <Route3 />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
