import React,{ Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import SplashScreen from "./Components/Splash/SplashScreen";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Orders from "./Pages/Orders/Orders";
import Cart from "./Pages/Cart/Cart";
import Contact from "./Pages/Contact/Contact";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";

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


