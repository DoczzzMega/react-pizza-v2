// import logo from './logo.svg';
// import { useState } from 'react';
// import { useEffect } from 'react';

import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';

// import pizzas from './assets/pizzas.json';

import './scss/app.scss';

function App() {
  // let pathname = window.location.pathname;
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        {/* {pathname === '/' && <Home />} */}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
