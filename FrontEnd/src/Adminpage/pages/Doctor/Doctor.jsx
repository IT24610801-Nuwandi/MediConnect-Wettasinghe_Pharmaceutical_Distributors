import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Doctor.css";
import AdminDashboard from "./AdminDashboard";

export default function Doctor() {
  const navigate = useNavigate();

  return (
    <div className="mediconnect-inventory-card">
      <h2 className="doctor-title">Doctor Verification Portal</h2> 
      <AdminDashboard/>
    </div>
  );
}


