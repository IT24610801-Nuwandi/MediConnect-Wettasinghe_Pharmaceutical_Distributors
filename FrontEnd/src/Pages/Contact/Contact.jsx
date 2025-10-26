import React, { useMemo, useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    service: "",
    message: "",
  });

  const onChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks, ${form.name}! We received your message.`);
    setForm({
      name: "",
      email: "",
      phone: "",
      subject: "",
      service: "",
      message: "",
    });
  };

  const address = "86, Uyana Road, Lunawa, Moratuwa, Sri Lanka";
  const mapSrc = useMemo(() => {
    const q = encodeURIComponent(address);
    return `https://www.google.com/maps?q=${q}&output=embed`;
  }, [address]);

  return (
    <section className="c-section">
      <div className="c-grid">
        {/* LEFT: contact details + map */}
        <aside className="c-left">
          <h2 className="c-title">Contact</h2>
          <p className="c-lead">Ask our friendly staff</p>

          <ul className="c-list">
            <li>
              <span className="c-icon">📞</span>
              <a href="tel:+94112645478">+94-112-645478</a>
            </li>
            <li>
              <span className="c-icon">✉️</span>
              <a href="mailto:wettapharma@gmail.com">wettapharma@gmail.com</a>
            </li>
            <li>
              <span className="c-icon">📍</span>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  address
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                {address}
              </a>
            </li>
            <li>
              <span className="c-icon">🕒</span>
              <p>Mon–Fri: 8.30 am – 5 pm</p> 
              <p>/ Sat: 9 am – 1 pm </p>
              <p>/ Sun: Closed</p>
            </li>
          </ul>

          <div className="c-map">
            <iframe
              title="Location map"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={mapSrc}
            />
          </div>
        </aside>

        {/* RIGHT: form */}
        <div className="c-right">
          <h3 className="c-formTitle">Send us a message</h3>

          <form className="c-form" onSubmit={onSubmit}>
            <div className="c-row c-two">
              <div className="c-field">
                <label htmlFor="name">Your Name</label>
                <input
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="c-field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={onChange}
                  required
                />
              </div>
            </div>

            <div className="c-row c-two">
              <div className="c-field">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={onChange}
                />
              </div>
              <div className="c-field">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  placeholder="Subject"
                  value={form.subject}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="c-row">
              <div className="c-field">
                <label htmlFor="service">Select Service</label>
                <select
                  id="service"
                  name="service"
                  value={form.service}
                  onChange={onChange}
                >
                  <option value="">Select Service</option>
                  <option value="inquiry">General Inquiry</option>
                  <option value="orders">Orders / Availability</option>
                  <option value="support">Customer Support</option>
                </select>
              </div>
            </div>

            <div className="c-row">
              <div className="c-field">
                <label htmlFor="message">Write a message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Type your message..."
                  value={form.message}
                  onChange={onChange}
                  required
                />
              </div>
            </div>

            <div className="c-actions">
              <button className="c-btn" type="submit">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
