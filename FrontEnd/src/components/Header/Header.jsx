import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const onSearch = (e) => {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q")?.toString().trim();
    if (q) console.log("Search:", q);
  };

  return (
    <header className="site-header">
  <div className="header-inner">
    <a href="/" className="brand">Medi Connect</a>

    <form className="search" role="search" onSubmit={e=>e.preventDefault()}>
      <input placeholder="Search in Medi Connect" />
      <button type="submit">🔍</button>
    </form>

    <nav className="actions">
      <a href="/login">LOGIN</a>
      <a href="/register" className="signup">SIGN UP</a>
      <a href="/cart" aria-label="Cart"><svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 
                       0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.16 14h9.45
                       c.75 0 1.41-.41 1.75-1.03l3.58-6.49a1 1 0 00-.87-1.48H6.21L5.27 2H2v2h2
                       l3.6 7.59-1.35 2.45A2 2 0 008 16h12v-2H8.42l.74-1.34z" fill="currentColor"/>
            </svg>
</a>
    </nav>
  </div>

  <div className="menu-row">
    <nav className="menu">
      <a href="/">Home</a>
      <a href="/about">About Us</a>
      <a href="/products">Products</a>
      <a href="/orders">Orders</a>
      <a href="/delivery">Delivery</a>
      <a href="/contact">Contact</a>
     </nav>
  </div>
</header>

    
  );
}
