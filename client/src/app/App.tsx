import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../features/Header/Header';
import CatalogPage from '../pages/CatalogPage/CatalogPage';
import OrderPage from '../pages/OrderPage/OrderPage';
import OrdersPage from '../pages/OrdersPage/OrdersPage';
import CouponesPage from '../pages/CouponesPage/CouponesPage';

function App() {
  return (
    <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<CatalogPage />}></Route>
          <Route path='/order-page' element={<OrderPage />}></Route>
          <Route path='/orders' element={<OrdersPage />}></Route>
          <Route path='/coupones' element={<CouponesPage />}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
