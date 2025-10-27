import { useEffect, useState } from "react";
import "./Order.css";


const STATUSES = ["PENDING", "CONFIRMED", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED"];

export default function OrderPage() {
  const [userId, setUserId] = useState("1");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function load() {
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch(`/api/orders?userId=${encodeURIComponent(userId)}`);
      if (!res.ok) throw new Error(await res.text());
      const list = await res.json();
      setRows(Array.isArray(list) ? list : []);
      if (!list?.length) setMsg("No orders for this user.");
    } catch (e) {
      setMsg(e.message || "Failed to load");
      setRows([]);
    } finally {
      setLoading(false);
    }
  }

  async function changeStatus(orderId, status) {
    try {
      const res = await fetch(
        `/api/orders/${orderId}/status?status=${encodeURIComponent(status)}`,
        { method: "PUT" }
      );
      if (!res.ok) throw new Error(await res.text());
      setRows(prev => prev.map(r => (r.orderId === orderId ? { ...r, status } : r)));
    } catch (e) {
      alert(e.message || "Failed to update");
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="mediconnect-inventory-card">
    
     <h1 className="mediconnect-heading-spacing">Orders</h1>

      <div className="toolbar">
        <label className="lbl">
          User ID:
          <input
            className="input"
            value={userId}
            onChange={e => setUserId(e.target.value)}
          />
        </label>
        <button className="btn" onClick={load} disabled={loading}>Load</button>
        <span className="hint">{loading ? "Loading…" : msg}</span>
      </div>

      <div className="table">
        <div className="table-head">
          <div>ID</div><div>Date</div><div>Status</div><div>Total</div><div>Action</div>
        </div>

        {rows.map(o => (
          <div key={o.orderId} className="table-row">
            <div>#{o.orderId}</div>
            <div>{o.orderDate ? new Date(o.orderDate).toLocaleString() : "—"}</div>
            <div><span className="badge">{o.status}</span></div>
            <div>{typeof o.totalAmount === "number" ? `Rs ${o.totalAmount.toFixed(2)}` : "—"}</div>
            <div>
              <select
                className="select"
                value={o.status || "PENDING"}
                onChange={e => changeStatus(o.orderId, e.target.value)}
              >
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        ))}

        {rows.length === 0 && !loading && <div className="empty">No data</div>}
      </div>
    </div>
  
  );
}



