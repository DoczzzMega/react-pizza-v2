import React from 'react';
import ReactDOM from 'react-dom/client';

import { store } from './redux/store'
import { Provider } from 'react-redux'

import { BrowserRouter, HashRouter } from "react-router-dom";

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <BrowserRouter basename={process.env.PUBLIC_URL}>
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </Р>
);


