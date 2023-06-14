import React from 'react';
import {  BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import ProductList from './components/ProductList';
import AdminPanel from './components/AdminPanel';

const App = () => (
  <Router>
    <HomeComponent>
      <Routes>
      <Route path="/" element={<Navigate to="/products" />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/admin" element={<AdminPanel  />} />
      </Routes>
    </HomeComponent>
  </Router>
);

export default App;
