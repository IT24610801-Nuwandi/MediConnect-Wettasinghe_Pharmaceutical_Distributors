
import React from "react";
import "./SignupLayout.css"; // styles for the split layout + card

export default function SignupLayout({ role, title, subtitle, heroSrc, children }) {
  return (
    <section className="signup-split">
      <aside className="signup-hero" aria-hidden>
        {heroSrc ? (
          <img src={heroSrc} alt={`${role} illustration`} />
        ) : (
          <div className="hero-fallback" />
        )}
        <div className="hero-overlay">
          <div className="brand">Medi Connect</div>
        </div>
      </aside>

      <main className="signup-panel">
        <div className="signup-card">
          <h1 className="sign-title">{title}</h1>
          <p className="sign-subtitle">{subtitle}</p>
          {children}
        </div>
      </main>
    </section>
  );
}
