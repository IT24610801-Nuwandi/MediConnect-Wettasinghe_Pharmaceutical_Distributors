import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
// import Orders from './Pages/Orders/Orders';
// import Cart from './Pages/Cart/Cart';
import OrdersPage from "./Pages/Orders/OrdersPage.jsx";
import CartPage from './Pages/Cart/CartPage';
import DeliveryPage from "./Pages/DeliveryPage";
import "./Pages/Orders/Orders.css";
import "./Pages/Cart/Cart.css";
import "./Pages/Delivery.css";
import './App.css';

// simple page components (put them in separate files later if you want)
const Home = () => (
  <section className="main-content">
    <h1>Wettasinghe Pharmaceutical Distributors (Pvt) Ltd</h1>
    <h2>Medi Connect</h2>
    <p>Wettasinghe Pharmaceutical Distributors (Pvt) Ltd. began its operations in 1998 and completes 25 years of service this year.
       We are the largest distributor of Generic pharmaceuticals in Colombo and suburbs and have grown from strength to strength over the years. Our expanding clientele is an indication of our commitment towards excellence in service.</p>
  </section>
);

const About = () => <section className="main-content"><h2>About Us</h2></section>;
const Products = () => <section className="main-content"><h2>Products</h2></section>;
//const Orders = () => <section className="main-content"><h2>Orders</h2></section>;
// const Cart = () => <section className="main-content"><h2>Cart</h2></section>;
const Contact = () => <section className="main-content"><h2>Contact</h2></section>;
const Register = () => <section className="main-content"><h2>Register</h2></section>;
const Login = () => <section className="main-content"><h2>Login</h2></section>;

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          {/* <Route path="/orders" element={<Orders />} /> */}
          <Route path="/delivery" element={<DeliveryPage />} />
          {/* <Route path="/cart" element={<Cart />} /> */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* 404 fallback */}
          <Route path="*" element={<section className="main-content"><h2>Page not found</h2></section>} />
        </Routes>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;