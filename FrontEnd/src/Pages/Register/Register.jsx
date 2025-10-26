import React, { useEffect, useState } from "react";
import SignupLayout from "./SignupLayout";
import { postJSON, postForm } from "../../lib/api";
import heroCustomer from "../../assets/customer.jpg";
import heroDoctor from "../../assets/doctor.jpg";
import heroAdmin from "../../assets/admin.jpg";
import "../Login/Login.css";    // reuse role-tabs + tab styles
import "./Register.css";
import PasswordField from "../../Components/Forms/PasswordField";
import { useParams } from "react-router-dom";

const HERO = { customer: heroCustomer, doctor: heroDoctor, admin: heroAdmin };

export default function Register() {
  const [role, setRole] = useState("customer");

  // preselect tab via ?role=customer|doctor|admin
  useEffect(() => {
    const r = (new URLSearchParams(window.location.search).get("role") || "").toLowerCase();
    if (r === "doctor" || r === "customer" || r === "admin") setRole(r);
  }, []);

  return (
    <SignupLayout
      role={role}
      title="Registration"
      subtitle={
        role === "doctor"
          ? "Join as a verified doctor."
          : role === "admin"
          ? "Create an administrator account."
          : "Create your customer account."
      }
      heroSrc={HERO[role]}
    >
      {/* Tabs */}
      <div className="role-tabs" role="tablist" aria-label="Select account type" style={{marginBottom:12}}>
        <Tab label="Customer" active={role === "customer"} onClick={() => setRole("customer")} />
        <Tab label="Doctor"   active={role === "doctor"}   onClick={() => setRole("doctor")} />
        <Tab label="Admin"    active={role === "admin"}    onClick={() => setRole("admin")} />
      </div>

      {role === "customer" && <CustomerForm />}
      {role === "doctor"   && <DoctorForm />}
      {role === "admin"    && <AdminForm />}
    </SignupLayout>
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

/* --------------------------- CUSTOMER FORM --------------------------- */
function CustomerForm() {
  const [form, setForm] = useState({
    userName: "", phone: "", email: "", address: "", password: "", confirm: ""
  });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const onChange = (e) => setForm(s => ({ ...s, [e.target.name]: e.target.value }));

  // ✅ FIXED: Correct endpoint + proper data structure
  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return setErr("Passwords do not match");
    setBusy(true); 
    setErr("");
    
    try {
      await postJSON("/api/auth/customer/register", {
        fullName: form.userName.trim(),    // ✅ Backend expects fullName
        phone: form.phone.trim(),
        email: form.email.trim(),
        address: form.address.trim(),
        password: form.password
      });
      alert("✅ Customer registered successfully!");
      window.location.assign("/login?role=customer");
    } catch (ex) { 
      setErr(ex.message || "Could not register customer"); 
    } finally { 
      setBusy(false); 
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-grid">
        <Field label="Full Name">
          <input className="input" name="userName" placeholder="Enter full name" value={form.userName} onChange={onChange} required />
        </Field>
        <Field label="Phone">
          <input className="input" name="phone" placeholder="Phone number" value={form.phone} onChange={onChange} />
        </Field>

        <Field label="Email">
          <input type="email" className="input" name="email" placeholder="Email address" value={form.email} onChange={onChange} required />
        </Field>
        <Field label="Address">
          <input className="input" name="address" placeholder="Address (optional)" value={form.address} onChange={onChange} />
        </Field>

        <Field label="Password">
          <PasswordField
            name="password"
            value={form.password}
            onChange={onChange}
            placeholder="Create password"
            autoComplete="new-password"
          />
        </Field>
        <Field label="Confirm password">
          <PasswordField
            name="confirm"
            value={form.confirm}
            onChange={onChange}
            placeholder="Repeat password"
            autoComplete="new-password"
          />
        </Field>
      </div>

      {err && <div className="alert">{err}</div>}
      <Actions busy={busy} />
      <p className="footer">Already have an account? <a className="link" href="/login?role=customer">Sign in</a></p>
    </form>
  );
}

/* ---------------------------- DOCTOR FORM ---------------------------- */
function DoctorForm() {
  const [form, setForm] = useState({
    userName: "", licenseNo: "", email: "", phone: "", address: "",
    password: "", confirm: "", licenseUpload: null
  });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const onChange = (e) => setForm(s => ({ ...s, [e.target.name]: e.target.value }));
  const onFile = (e) => setForm(s => ({ ...s, licenseUpload: e.target.files?.[0] || null }));

  // ✅ FIXED: Correct endpoint + FormData structure
  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return setErr("Passwords do not match");
    if (!form.licenseNo.trim()) return setErr("License number is required");
    setBusy(true); 
    setErr("");
    
    try {
      const fd = new FormData();
      fd.append("fullName", form.userName.trim());     // ✅ Backend expects fullName
      fd.append("licenseNo", form.licenseNo.trim());
      fd.append("email", form.email.trim());
      fd.append("phone", form.phone.trim());
      fd.append("address", form.address.trim());
      fd.append("password", form.password);
      if (form.licenseUpload) fd.append("licenseUpload", form.licenseUpload);
      
      await postForm("/api/auth/doctor/register", fd);
      alert("✅ Doctor registration submitted! Please wait for verification.");
      window.location.assign("/login?role=doctor");
    } catch (ex) { 
      setErr(ex.message || "Could not register doctor"); 
    } finally { 
      setBusy(false); 
    }
  };

  return (
    <form onSubmit={onSubmit} encType="multipart/form-data">
      <div className="form-grid">
        <Field label="Full Name">
          <input className="input" name="userName" placeholder="Enter full name" value={form.userName} onChange={onChange} required />
        </Field>
        <Field label="License Number">
          <input className="input" name="licenseNo" placeholder="e.g., SLMC-12345" value={form.licenseNo} onChange={onChange} required />
        </Field>

        <Field label="Email">
          <input type="email" className="input" name="email" placeholder="Email address" value={form.email} onChange={onChange} required />
        </Field>
        <Field label="Phone">
          <input className="input" name="phone" placeholder="Phone number" value={form.phone} onChange={onChange} />
        </Field>

        <Field label="Address">
          <input className="input" name="address" placeholder="Address (optional)" value={form.address} onChange={onChange} />
        </Field>
        <Field label="License Upload">
          <input className="file" type="file" accept="image/*,.pdf" onChange={onFile} />
          <div className="helper">Image or PDF of your license</div>
        </Field>

        <Field label="Password">
          <PasswordField
            name="password"
            value={form.password}
            onChange={onChange}
            placeholder="Create password"
            autoComplete="new-password"
          />
        </Field>
        <Field label="Confirm password">
          <PasswordField
            name="confirm"
            value={form.confirm}
            onChange={onChange}
            placeholder="Repeat password"
            autoComplete="new-password"
          />
        </Field>
      </div>

      {err && <div className="alert">{err}</div>}
      <Actions busy={busy} />
      <p className="footer">Already verified? <a className="link" href="/login?role=doctor">Sign in</a></p>
    </form>
  );
}

/* ----------------------------- ADMIN FORM ---------------------------- */
function AdminForm() {
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const onChange = (e) => setForm(s => ({ ...s, [e.target.name]: e.target.value }));

  // ✅ FIXED: Correct endpoint + proper data structure
  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return setErr("Passwords do not match");
    setBusy(true); 
    setErr("");
    
    try {
      await postJSON("/api/auth/admin/register", {
        fullName: form.email.trim(),      // ✅ Backend expects fullName
        email: form.email.trim(),
        password: form.password
      });
      alert("✅ Admin registered successfully!");
      window.location.assign("/login?role=admin");
    } catch (ex) { 
      setErr(ex.message || "Could not register admin"); 
    } finally { 
      setBusy(false); 
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-grid">
        <Field label="Email (username)">
          <input type="email" className="input" name="email" placeholder="admin@company.com" value={form.email} onChange={onChange} required />
        </Field>
        <Field label="Password">
          <PasswordField
            name="password"
            value={form.password}
            onChange={onChange}
            placeholder="Create password"
            autoComplete="new-password"
          />
        </Field>
        <Field label="Confirm password">
          <PasswordField
            name="confirm"
            value={form.confirm}
            onChange={onChange}
            placeholder="Repeat password"
            autoComplete="new-password"
          />
        </Field>
      </div>

      {err && <div className="alert">{err}</div>}
      <Actions busy={busy} />
      <p className="footer">Already have access? <a className="link" href="/login?role=admin">Sign in</a></p>
    </form>
  );
}

/* ----------------------------- helpers ------------------------------- */
function Field({ label, children }) {
  return (
    <div>
      <label className="label">{label}</label>
      {children}
    </div>
  );
}

function Actions({ busy }) {
  return (
    <div style={{ marginTop: 12, display: "flex", justifyContent: "flex-end" }}>
      <button className="btn primary" type="submit" disabled={busy}>
        {busy ? "Creating…" : "Next Step"}
      </button>
    </div>
  );
}