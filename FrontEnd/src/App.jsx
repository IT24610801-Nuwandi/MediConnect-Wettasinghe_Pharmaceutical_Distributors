import { useEffect, useState, useCallback } from "react";
import { BrowserRouter, Routes, Route, Navigate,useLocation } from "react-router-dom";
import { isAuthed } from "./lib/api";

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import SplashScreen from "./Components/Splash/SplashScreen";
import "./App.css";


import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Products from "./Pages/Products/Products";
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
