import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { initStore } from './state_v2';

initStore();

ReactDOM.render((
  <App />
), document.getElementById('root'));

serviceWorker.unregister();
