import React, { useState } from "react";
import "./Orders.css";

export default function Orders({ orders = [] }) {
  const [tab, setTab] = useState("ALL");

  // Adjust these to match whatever statuses you use in the backend
  const TABS = [
    { key: "ALL", label: "All" },
    { key: "PENDING", label: "To Pay" },
    { key: "CONFIRMED", label: "To Ship" },
    { key: "OUT_FOR_DELIVERY", label: "To Receive" },
    { key: "DELIVERED", label: "Delivered" },
  ];

  const filtered =
    tab === "ALL" ? orders : orders.filter(o => (o?.status || "") === tab);

  return (
    <div className="orders-page">
      <h2 className="orders-title">My Orders</h2>

      {/* Tabs */}
      <div className="orders-tabs">
        {TABS.map(t => (
          <button
            key={t.key}
            className={`tab ${tab === t.key ? "active" : ""}`}
            onClick={() => setTab(t.key)}
            type="button"
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="orders-list">
        {filtered.length === 0 && (
          <div className="orders-empty">No orders found.</div>
        )}

        {filtered.map(o => (
          <div key={o.orderId} className="order-card">
            <div className="order-row">
              <span className="label">Order ID:</span>
              <span className="value">#{o?.orderId ?? "—"}</span>
            </div>

            <div className="order-row">
              <span className="label">Date:</span>
              <span className="value">
                {o?.orderDate
                  ? new Date(o.orderDate).toLocaleString()
                  : "—"}
              </span>
            </div>

            <div className="order-row">
              <span className="label">Tracking:</span>
              <span className="value">{o?.trackingNo ?? "—"}</span>
            </div>

            <div className="order-row">
              <span className="label">Delivery:</span>
              <span className="value">{o?.deliveryStatus ?? "—"}</span>
            </div>

            <div className="order-row">
              <span className="label">Status:</span>
              <span
                className={`value badge ${String(o?.status || "")
                  .toLowerCase()
                  .replaceAll(" ", "_")}`}
              >
                {o?.status ?? "—"}
              </span>
            </div>

            <div className="order-row">
              <span className="label">Total price:</span>
              <span className="value strong">
                {typeof o?.totalAmount === "number"
                  ? `Rs. ${o.totalAmount.toFixed(2)}`
                  : "—"}
              </span>
            </div>

            {/* Small actions (optional) */}
            <div className="order-row" style={{ borderBottom: "none" }}>
              <span className="label">Actions:</span>
              <span className="value">
                <button
                  className="tiny"
                  type="button"
                  onClick={() => o?.onRefresh?.(o.orderId)}
                  disabled={!o?.onRefresh}
                  title="Refresh delivery status"
                >
                  Refresh tracking
                </button>
                {/* If you later wire notifications:
                <button
                  className="tiny ghost"
                  type="button"
                  onClick={() => o?.onSubscribe?.(o.orderId)}
                  disabled={!o?.onSubscribe}
                >
                  Notify me
                </button> */}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
