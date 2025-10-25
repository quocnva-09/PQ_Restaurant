
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import AddressForm from './pages/AddressForm';
import MyOrders from './pages/MyOrders';
import { Toaster } from 'react-hot-toast';
import Sidebar from './components/admin/Sidebar';
import Dashboard from './pages/admin/Dashboard';
import AddProducts from './pages/admin/AddProducts';
import ListProducts from './pages/admin/ListProducts';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <main className='overflow-x-hidden text-textColor'>
      <Header />
      <Toaster position='bottom-right' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/address-form' element={<AddressForm />} />
        <Route path='/my-orders' element={<MyOrders />} />
        <Route path='/login-form' element={<Login />} />
        <Route path='/signup-form' element={<Signup />} />
        <Route path='/admin' element={<Sidebar />} >
          <Route index element={<Dashboard />} />
          <Route path='/admin/add-product' element={<AddProducts />} />
          <Route path='/admin/list-product' element={<ListProducts />} />

        </Route>

      </Routes>

      <Footer />
    </main>
  );
}

export default App;
