import React from "react";
import { Link } from "react-router-dom";
import "./Customer.css";

export default function Customer() {
  

  return (
    <div className="mediconnect-inventory-card">
      <h1 className="mediconnect-heading-spacing">Customers</h1>
      <div className="mediconnect-button-group">
        <Link to="/admin/customer/view" className="mediconnect-nav-btn mediconnect-nav-btn--outline">View Customers</Link>
      </div>
    </div>
  );
}