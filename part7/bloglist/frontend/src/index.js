
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import store from './store';

const index = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(
  index,
  document.getElementById('root'),
);
