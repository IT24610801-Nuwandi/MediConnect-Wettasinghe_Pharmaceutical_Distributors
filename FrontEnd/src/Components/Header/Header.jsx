import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { isAuthed, logout } from "../../lib/api";

export default function Header() {
  const navigate = useNavigate();
  const authed = isAuthed();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand">Medi Connect</Link>

        <form className="search" role="search" onSubmit={(e)=>e.preventDefault()}>
          <input placeholder="Search in Medi Connect" />
          <button type="submit">🔍</button>
        </form>

        <nav className="actions">
          {!authed ? (
            <>
              <Link to="/login">LOGIN</Link>
              <Link to="/register" className="signup">SIGN UP</Link>
            </>
          ) : (
            <>
              {/* Profile icon */}
              <Link to="/profile" className="icon-btn" aria-label="Profile" title="Profile">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5Z" stroke="currentColor" strokeWidth="1.6"/>
                </svg>
              </Link>

              {/* Logout button */}
              <button type="button" className="linklike" onClick={handleLogout}>
                LOG OUT
              </button>
            </>
          )}

          {/* Cart icon (protected by route guard) */}
          <Link to="/cart" className="icon-btn" aria-label="Cart" title="Cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M3 3h2l2.4 12.4A2 2 0 0 0 9.37 17H18a2 2 0 0 0 2-1.6L22 7H6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9" cy="20" r="1.6" fill="currentColor"/>
              <circle cx="18" cy="20" r="1.6" fill="currentColor"/>
            </svg>
          </Link>
        </nav>
      </div>

      <div className="menu-row">
        <nav className="menu">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/products">Products</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
