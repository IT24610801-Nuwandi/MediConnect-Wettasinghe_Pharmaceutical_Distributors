import React from "react";
import { Routes, Route, Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Adminpage.css";

import AdminNavbar from "./components/AdminNavbar/AdminNavbar.jsx";

import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Doctor from "./pages/Doctor/Doctor.jsx";
import Customer from "./pages/Customer/Customer.jsx";
import ViewCustomers from "./pages/Customer/ViewCustomers/ViewCustomers.jsx";
import Product from "./pages/Product/Product.jsx";
import AddItem from "./pages/Product/AddItem/AddItem.jsx";
import DisplayItem from "./pages/Product/DisplayItem/DisplayItem.jsx";
import Order from "./pages/Order/Order.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Discount from "./pages/Discount/Discount.jsx";

function AdminLayout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || `{"name":"Admin"}`);

  const onLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    navigate("/admin/login", { replace: true });
  };

  return (
    <>
      <AdminNavbar user={user} onLogout={onLogout} />
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <h2 className="sidebar-heading">Admin</h2>
          <nav className="sidebar-nav">
            <NavLink to="/admin/dashboard" className={({isActive}) => `sidebar-link ${isActive ? "active" : ""}`}>Dashboard</NavLink>
            <NavLink to="/admin/doctor"    className={({isActive}) => `sidebar-link ${isActive ? "active" : ""}`}>Doctor</NavLink>
            <NavLink to="/admin/customer"  className={({isActive}) => `sidebar-link ${isActive ? "active" : ""}`}>Customer</NavLink>
            <NavLink to="/admin/product"   className={({isActive}) => `sidebar-link ${isActive ? "active" : ""}`}>Product</NavLink>
            <NavLink to="/admin/order"     className={({isActive}) => `sidebar-link ${isActive ? "active" : ""}`}>Order</NavLink>
            <NavLink to="/admin/cart"      className={({isActive}) => `sidebar-link ${isActive ? "active" : ""}`}>Cart</NavLink>
            <NavLink to="/admin/discount"  className={({isActive}) => `sidebar-link ${isActive ? "active" : ""}`}>Discount</NavLink>
          </nav>
        </aside>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default function Adminpage() {
  return (
    <Routes>
      {/* Admin shell */}
      <Route path="/" element={<AdminLayout />}>
        {/* ABSOLUTE redirect so it doesn't bounce */}
        <Route index element={<Navigate to="/admin/dashboard" replace />} />

        {/* Admin pages */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="doctor" element={<Doctor />} />

        <Route path="customer" element={<Customer />} />
        <Route path="customer/view" element={<ViewCustomers />} />

        <Route path="product" element={<Product />} />
        <Route path="additem" element={<AddItem />} />
        <Route path="allitems" element={<DisplayItem />} />

        <Route path="order" element={<Order />} />
        <Route path="cart" element={<Cart />} />
        <Route path="discount" element={<Discount />} />

        {/* Keep unknown admin paths INSIDE /admin */}
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Route>
    </Routes>
      
  );
}

