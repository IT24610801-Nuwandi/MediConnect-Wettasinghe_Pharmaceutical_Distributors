import React, { useState } from "react";
import "./PasswordField.css";

export default function PasswordField({
  name,
  value,
  onChange,
  placeholder = "Password",
  autoComplete = "current-password",
  disabled = false,
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="password-field">
      <input
        className="input"
        type={show ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
      />
      <button
        type="button"
        className="eye"
        aria-label={show ? "Hide password" : "Show password"}
        onClick={() => setShow((s) => !s)}
      >
        {show ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M3 3l18 18" stroke="#64748b" strokeWidth="2" />
            <path d="M10.58 10.58A3 3 0 0012 15a3 3 0 002.42-4.42" stroke="#64748b" strokeWidth="2" />
            <path d="M2.1 12S5.5 5 12 5c3.3 0 6 1.7 7.9 3.8 1 1.1 2 3.2 2 3.2s-.8 1.9-2 3.1M14.12 14.12A3 3 0 019.88 9.88" stroke="#64748b" strokeWidth="2" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M2.1 12S5.5 5 12 5s9.9 7 9.9 7-3.4 7-9.9 7S2.1 12 2.1 12z" stroke="#64748b" strokeWidth="2" />
            <circle cx="12" cy="12" r="3" stroke="#64748b" strokeWidth="2" />
          </svg>
        )}
      </button>
    </div>
  );
}
