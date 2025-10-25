import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Product.css";

export default function Product() {
  const navigate = useNavigate();

  return (
    <div className="mediconnect-inventory-card">
      <h1 className="mediconnect-heading-spacing">Products</h1>

      <div className="mediconnect-button-group">
        <Link to="/admin/additem" className="mediconnect-nav-btn mediconnect-nav-btn--outline">Add Item</Link>
        <Link to="/admin/allitems" className="mediconnect-nav-btn mediconnect-nav-btn--outline">View Items</Link>
      </div>
    </div>
  );
}