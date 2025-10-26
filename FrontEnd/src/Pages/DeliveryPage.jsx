// src/Pages/DeliveryPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OrdersAPI } from "@services/ordersApi";     // ✅ use your alias
import "./Delivery.css";

export default function DeliveryPage() {
  const nav = useNavigate();
  const [f, setF] = useState({ name: "", address: "", phone: "" });

  const on = e => setF({ ...f, [e.target.name]: e.target.value });
  const save = () => localStorage.setItem("deliveryInfo", JSON.stringify(f));

  const place = async () => {
    if (!f.name.trim() || !f.address.trim() || !f.phone.trim()) {
      alert("Fill name, address, phone.");
      return;
    }
    save();
    try {
      await OrdersAPI.checkout(1, promo || undefined);   // promo is optional
      nav("/orders");
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="d-min">
      <h3>Delivery</h3>
      <label>Name*   <input name="name" value={f.name} onChange={on} /></label>
      <label>Address*<input name="address" value={f.address} onChange={on} /></label>
      <label>Phone*  <input name="phone" value={f.phone} onChange={on} /></label>
      
      <div className="btns">
        <button className="ghost" onClick={save}>Save</button>
        <button onClick={place}>Place Order</button>
      </div>
    </div>
  );
}

