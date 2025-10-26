// src/Pages/Login/Login.jsx
import React, { useEffect, useMemo, useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PasswordField from "../../Components/Forms/PasswordField";

import heroDoctor   from "../../assets/doctor.jpg";
import heroCustomer from "../../assets/customer.jpg";
import heroAdmin    from "../../assets/admin.jpg";

const BASE_URL = "http://localhost:8083";
const ENDPOINTS = {
  doctor:   "/api/doctor/auth/login",
  customer: "/api/auth/login",
  admin:    "/api/admin/auth/login",
};
// Customers go to Orders *after* login
const DEST = { doctor: "/doctor", customer: "/orders", admin: "/admin" };
const HERO_BY_ROLE = { doctor: heroDoctor, customer: heroCustomer, admin: heroAdmin };
const SIGNUP_BY_ROLE = { 
  doctor: "/register?role=doctor",
  customer: "/register?role=customer",
  admin: "/register?role=admin",
};

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("doctor");
  const [form, setForm] = useState({ email: "", password: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const r = (new URLSearchParams(window.location.search).get("role") || "").toLowerCase();
    if (r === "doctor" || r === "customer" || r === "admin") setRole(r);
  }, []);

  const heroSrc = HERO_BY_ROLE[role] || heroDoctor;
  const signupHref = SIGNUP_BY_ROLE[role] || "/register/customer";
  const roleLabel = useMemo(
    () => (role === "doctor" ? "Doctor" : role === "admin" ? "Admin" : "Customer"),
    [role]
  );

  const onChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");

    try {
      const endpoint = ENDPOINTS[role] || ENDPOINTS.customer;

      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        })
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Login failed");

      const token = data.accessToken || data.token || data.jwt || "";
      if (!token) throw new Error("No token in response");
      localStorage.setItem("auth_token", token);
      localStorage.setItem("auth_role", role);

      // Redirect AFTER successful login only
      navigate(DEST[role] || "/", { replace: true });
    } catch (err) {
      setError(err.message || "Request failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="auth-split">
      <aside className="auth-hero" aria-hidden>
        <img className="hero-img" src={heroSrc} alt={`${role} portal`} />
        <div className="overlay">
          <div className="brand">MEDICONNECT</div>
          <p className="tagline">
            {role === "doctor"   && <>Tools for clinical excellence.</>}
            {role === "customer" && <>Your health, your records, your control.</>}
            {role === "admin"    && <>Operate securely with full visibility.</>}
          </p>
        </div>
      </aside>

      <main className="auth-panel">
        <div className="panel-inner">
          <div className="logo-dot">🩺</div>
          <h1 className="title">Login</h1>
          <p className="subtitle">Sign in to your {roleLabel.toLowerCase()} account</p>

          <div className="role-tabs" role="tablist" aria-label="Select portal">
            <Tab label="Doctor"   active={role === "doctor"}   onClick={() => setRole("doctor")} />
            <Tab label="Customer" active={role === "customer"} onClick={() => setRole("customer")} />
            <Tab label="Admin"    active={role === "admin"}    onClick={() => setRole("admin")} />
          </div>

          <form className="form" onSubmit={onSubmit} noValidate>
            <label className="field">
              <span className="label">Email</span>
              <input
                className="input"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={onChange}
                required
                autoComplete="username"
              />
            </label>

            <label className="field">
              <div className="row between">
                <span className="label">Password</span>
                <a className="link" href="/forgot">Forgot Password?</a>
              </div>

              <PasswordField
                name="password"
                value={form.password}
                onChange={onChange}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </label>

            {error && <div className="alert">{error}</div>}

            <button className="btn primary" type="submit" disabled={busy}>
              {busy ? "Signing in…" : "Log In"}
            </button>
          </form>

          <p className="footer">
            Don’t have an account?{" "}
            <Link className="link" to={`/register?role=${role}`}>Sign Up</Link>
          </p>
        </div>
      </main>
    </section>
  );
}

function Tab({ label, active, onClick }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      className={`tab ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
