import { useEffect, useState } from "react";
import "./Cart.css";
import { API_BASE } from "../../../../api/config";
import axios from "axios";

export default function AdminCart() {
  const [userId, setUserId] = useState("1");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function load() {
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch(`${API_BASE}/cart/list?userId=${encodeURIComponent(userId)}`);
      if (!res.ok) throw new Error(await res.text());
      const d = await res.json(); // { items, grandTotal }
      setItems(Array.isArray(d?.items) ? d.items : []);
      if (!d?.items?.length) setMsg("Cart is empty.");
    } catch (e) {
      setMsg(e.message || "Failed to load");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  async function updateQty(cartItemId, q) {
    if (q < 1) return;
    try {
      const res = await fetch(`${API_BASE}/cart/${cartItemId}?quantity=${q}`, { method: "PUT" });
      if (!res.ok) throw new Error(await res.text());
      const dto = await res.json();
      setItems(prev =>
        prev.map(x =>
          x.cartItemId === cartItemId
            ? { ...x, quantity: dto.quantity, lineTotal: dto.lineTotal }
            : x
        )
      );
    } catch (e) {
      alert(e.message || "Failed to update");
    }
  }

  async function removeItem(cartItemId) {
    try {
      const res = await fetch(`${API_BASE}/cart/${cartItemId}`, { method: "DELETE" });
      if (!res.ok) throw new Error(await res.text());
      setItems(prev => prev.filter(x => x.cartItemId !== cartItemId));
    } catch (e) {
      alert(e.message || "Failed to remove");
    }
  }

  useEffect(() => { load(); }, []);

  const subtotal = items.reduce(
    (s, r) => s + Number(r.unitPrice || 0) * Number(r.quantity || 0),
    0
  );

  return (
    <div className="mediconnect-inventory-card">
      <h3 className="mediconnect-heading-spacing">Cart</h3>

      <div className="toolbar">
        <label className="lbl">
          User ID:
          <input className="input" value={userId} onChange={e => setUserId(e.target.value)} />
        </label>
        <button className="btn" onClick={load} disabled={loading}>Load</button>
        <span className="hint">{loading ? "Loading…" : msg}</span>
      </div>

      {items.map(row => (
        <div key={row.cartItemId} className="cart-line">
          <div className="line-info">
            <div className="line-name">Item #{row.itemId}</div>
            <div className="line-unit">Unit: Rs {Number(row.unitPrice || 0).toFixed(2)}</div>
          </div>

          <div className="qty">
            <button className="qty-btn" onClick={() => updateQty(row.cartItemId, Number(row.quantity || 0) - 1)}>−</button>
            <span className="qty-val">{row.quantity ?? 0}</span>
            <button className="qty-btn" onClick={() => updateQty(row.cartItemId, Number(row.quantity || 0) + 1)}>+</button>
          </div>

          <div className="line-total">Rs {(Number(row.unitPrice || 0) * Number(row.quantity || 0)).toFixed(2)}</div>

          <button className="btn danger" onClick={() => removeItem(row.cartItemId)}>Remove</button>
        </div>
      ))}

      <div className="subtotal">Subtotal: Rs {subtotal.toFixed(2)}</div>
    </div>
  );
}
