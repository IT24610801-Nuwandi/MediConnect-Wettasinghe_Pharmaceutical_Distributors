import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminNavbar.css";

export default function AdminNavbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    onLogout?.();
    navigate("/login", { replace: true });
  };

  //guard against undefined
  const displayName = user?.name || user?.userName || "Admin";

  return (
    <nav className="mediconnect-navbar">
      <div className="mediconnect-navbar-container">
        <div className="mediconnect-navbar-title">
          <h1 className="admin-brand">MediConnect</h1>
        </div>
        <div className="admin-actions">
          <span className="admin-user">{displayName}</span>
          <button className="admin-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
