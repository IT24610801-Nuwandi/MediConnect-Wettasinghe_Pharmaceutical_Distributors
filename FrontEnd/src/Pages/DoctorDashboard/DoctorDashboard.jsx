import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Profile/Profile.css";

export default function DoctorDashboard() {
  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState("");
  const email = localStorage.getItem("doctor_email");

  useEffect(() => {
    if (!email) {
      setError("Doctor email not found. Please log in again.");
      return;
    }

    fetch(`http://localhost:8083/api/doctor/dashboard?email=${email}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch dashboard");
        return res.json();
      })
      .then((data) => setDoctor(data))
      .catch((err) => {
        console.error("Dashboard error:", err);
        setError("Unable to load dashboard. Please try again later.");
      });
  }, [email]);

  if (error) {
    return <div className="profile-loading error">{error}</div>;
  }

  if (!doctor) {
    return <div className="profile-loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard-shell">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-title">MediConnect</h2>
        <nav className="sidebar-nav">
          <Link to="/doctor/dashboard">Dashboard</Link>
          <Link to="/doctor/profile">My Profile</Link>
          <Link to="/doctor/products">Products</Link>
          <Link to="/doctor/cart">Cart</Link>
          <Link to="/doctor/delivery">Delivery</Link>
          <Link to="/doctor/orders">My Orders</Link>
          <Link to="/logout">Logout</Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="dashboard-main">
        <h1>Welcome, Dr. {doctor.fullName}</h1>
        <p><strong>License No:</strong> {doctor.licenseNumber}</p>
        <p><strong>Email:</strong> {doctor.email}</p>

        <section className="dashboard-section">
          <h3>Quick Actions</h3>
          <div className="dashboard-grid">
            <Link to="/doctor/products" className="card">
              <h4>Browse Products</h4>
              <p>View pharmaceutical items with doctor-exclusive pricing.</p>
            </Link>
            <Link to="/doctor/cart" className="card">
              <h4>Cart</h4>
              <p>Review selected items and adjust quantities.</p>
            </Link>
            <Link to="/doctor/delivery" className="card">
              <h4>Delivery Info</h4>
              <p>Enter delivery details and place bulk orders.</p>
            </Link>
            <Link to="/doctor/orders" className="card">
              <h4>My Orders</h4>
              <p>Track order status and delivery progress.</p>
            </Link>
            <Link to="/doctor/profile" className="card">
              <h4>Profile Settings</h4>
              <p>Update your contact info and license details.</p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
