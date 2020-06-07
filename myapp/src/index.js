import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/rem.js'
import 'antd-mobile/dist/antd-mobile.css';

import { HashRouter} from "react-router-dom"

import { Provider } from 'react-redux'
import { createStore } from 'redux';
import collect from './store/reducer'

let store = createStore(collect);



ReactDOM.render(
  <Provider store={store}>
  <HashRouter>

      <App />
    
  </HashRouter>
  </Provider>,
  document.getElementById('root')
);
