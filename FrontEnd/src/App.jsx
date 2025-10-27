import { useEffect, useState, useCallback } from "react";
import { BrowserRouter, Routes, Route, Navigate,useLocation } from "react-router-dom";
import { isAuthed } from "./lib/api";
import React,{ Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import SplashScreen from "./Components/Splash/SplashScreen";
import "./App.css";


import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Products from "./Pages/Products/Products";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Orders from "./Pages/Orders/Orders";
import Cart from "./Pages/Cart/Cart";
import Contact from "./Pages/Contact/Contact";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";

// function RequireCustomer({ children }) {
//  const token = localStorage.getItem("mc_token");
//  const role = localStorage.getItem("mc_role");
//  if (!token || role !== "customer") {
//  return <Navigate to="/login?role=customer" replace />;
//  }
//  return children;
// }
function RequireAuth({ children }) {
  const loc = useLocation();
  if (!isAuthed()) {
    return <Navigate to="/login" state={{ from: loc }} replace />;
  }
  return children;
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  // OPTIONAL: if you want to skip splash after first visit in this tab
  useEffect(() => {
    if (sessionStorage.getItem("seenSplash")) {
      setShowSplash(false);
    }
  }, []);

  const handleDone = useCallback(() => setShowSplash(false), []);

  return (
    <BrowserRouter>
      {/* Splash must be INSIDE the router and NOT a Route */}
      {showSplash && <SplashScreen onDone={handleDone} />}

      <div className="app-shell">
        <Header />
        <main className="main-header">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            {/* PROTECTED */}
            <Route
              path="/orders"
              element={
                <RequireAuth>
                  <Orders />
                </RequireAuth>
              }
            />
            <Route
              path="/cart"
              element={
                <RequireAuth>
                  <Cart />
                </RequireAuth>
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/:role" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {/* You can also protect Profile so only logged-in users can *access* it */}
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
            <Route path="*" element={<h2>Page not found</h2>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
import Products from "./Pages/Products/Products";
import ProductDetail from "./Pages/Products/ProductDetail";
import DoctorProducts from "./Pages/Products/DoctorProducts";
import DoctorProductDetail from "./Pages/Products/DoctorProductDetail";

import Adminpage from "./Pages/Adminpage/Adminpage";

import "./Pages/Orders/Orders.css";
import "./Pages/Cart/Cart.css";
import "./App.css";



function Shell() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    
    <div className="app-wrapper">
      {!isAdmin && <Header />}

      <Suspense fallback={null}>
        <Routes>
          {/* Public site */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />

          {/* Doctor-facing catalog */}
          <Route path="/doctor/products" element={<DoctorProducts />} />
          <Route path="/doctor/products/:id" element={<DoctorProductDetail />} />

          {/* Orders / Cart */}
          <Route path="/orders" element={<Orders />} />
          <Route path="/cart" element={<Cart />} />

          {/* Auth & static */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />

          {/* Admin app (nested routes handled inside Adminpage) */}
          <Route path="/admin/*" element={<Adminpage />} />

          {/* 404 */}
          <Route path="*" element={<h2>Page not found</h2>} />

        </Routes>
      </Suspense>

      {!isAdmin && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}


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
