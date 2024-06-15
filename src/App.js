import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import db from "./firebaseConfig/firebase";
import {Route, Routes } from "react-router-dom";
import Navbar from './components/navbar/navbar';
import Product from './components/product/product';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomProductContext from './context/productContext';
import Cart from './components/cart/cart';
import Registration from './components/Register/register';
import Login from './components/Login/login';
import CartProvider from './context/cartContext';
import Order from './components/orders/orders';
function App() {

  return (
    <CustomProductContext>
    <CartProvider>
        <ToastContainer />
          <header>
              <Navbar/>
          </header>
        <Routes>
          <Route path="/" element={<Product/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/register" element={<Registration/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/order" element={<Order/>}/>

        </Routes>
        </CartProvider>
    </CustomProductContext>
  );
}

export default App;


// // https://tangerine-gingersnap-3c8b63.netlify.app/
// https://fakestoreapi.com/products