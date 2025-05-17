import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Categories from './pages/Categories/Categories';
import Account from './pages/Account/Account';
import './styles/global.css';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/ProfileInfo/Profile/Profile';
import CategoriesPage from './pages/Categories/CategoriesPage';
import SubcategoriesPage from './pages/Categories/Subcategories';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:name" element={<Categories />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/categories" element={<CategoriesPage />} />
<Route path="/categories/:id" element={<SubcategoriesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
