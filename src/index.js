import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import getStore from './store';
import App from './App'

const store = getStore();
const index = <Provider store={store}><App /></Provider>;
ReactDOM.render(index, document.getElementById("index"));