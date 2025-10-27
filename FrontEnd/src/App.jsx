import { useEffect, useState, useCallback } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { isAuthed } from "./lib/api";

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import SplashScreen from "./Components/Splash/SplashScreen";
import "./App.css";

import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Products from "./Pages/Products/Products";
import ProductDetail from "./Pages/Products/ProductDetail";
import DoctorProducts from "./Pages/Products/DoctorProducts";
import DoctorProductDetail from "./Pages/Products/DoctorProductDetail";
import Orders from "./Pages/Orders/Orders";
import OrdersPage from "./Pages/Orders/OrdersPage";
import Cart from "./Pages/Cart/Cart";
import CartPage from "./Pages/Cart/CartPage";
import DeliveryPage from "./Pages/DeliveryPage";
import Contact from "./Pages/Contact/Contact";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";

// Import CSS files for merged components
import "./Pages/Orders/Orders.css";
import "./Pages/Cart/Cart.css";
import "./Pages/Delivery.css";
import "./Pages/Products/Products.css";
import "./Pages/Products/ProductDetail.css";
import "./Pages/Products/ProductsGrid.css";
import "./Pages/Products/Sidebar/Sidebar.css";

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
            
            {/* Products Routes - Enhanced with medical functionality */}
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/doctor/products" element={<DoctorProducts />} />
            <Route path="/doctor/products/:id" element={<DoctorProductDetail />} />
            
            {/* PROTECTED Routes */}
            <Route
              path="/orders"
              element={
                <RequireAuth>
                  <OrdersPage />
                </RequireAuth>
              }
            />
            <Route
              path="/cart"
              element={
                <RequireAuth>
                  <CartPage />
                </RequireAuth>
              }
            />
            
            {/* Delivery tracking */}
            <Route
              path="/delivery"
              element={
                <RequireAuth>
                  <DeliveryPage />
                </RequireAuth>
              }
            />
            
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/:role" element={<Register />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Profile */}
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
