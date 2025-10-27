import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../../../../api/config";
import "./Dashboard.css";

// to format numbers nicely
const fmtNumber = (n) =>
  (n ?? 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function Dashboard() {
  const [summary, setSummary] = useState({
    doctorsPendingApproval: 0,
    totalCustomers: 0,
    totalProducts: 0,
    lowStockProducts: 0,
    todaysRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE}/dashboard/summary`);
      setSummary((s) => ({ ...s, ...data }));
    } catch (e) {
      console.error("Failed to load dashboard summary", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <div className="mediconnect-kpi-grid">
        <div className="mediconnect-card mediconnect-kpi-card mediconnect-kpi-warning">
          <div className="mediconnect-kpi-title">Doctors Pending Approval</div>
          <div className="mediconnect-kpi-value">{summary.doctorsPendingApproval ?? 0}</div>
        </div>

        <div className="mediconnect-card mediconnect-kpi-card mediconnect-kpi-success">
          <div className="mediconnect-kpi-title">Total Customers</div>
          <div className="mediconnect-kpi-value">{summary.totalCustomers ?? 0}</div>
        </div>

        <div className="mediconnect-card mediconnect-kpi-card mediconnect-kpi-info">
          <div className="mediconnect-kpi-title">Total Products</div>
          <div className="mediconnect-kpi-value">{summary.totalProducts ?? 0}</div>
        </div>

        <div className="mediconnect-card mediconnect-kpi-card mediconnect-kpi-danger">
          <div className="mediconnect-kpi-title">Low Stock Products</div>
          <div className="mediconnect-kpi-value">{summary.lowStockProducts ?? 0}</div>
        </div>
      </div>

      <div className="mediconnect-card mediconnect-revenue-card">
        <div className="mediconnect-revenue-title">Today's Revenue</div>       
        <div className="mediconnect-money">
          <span className="mediconnect-currency">Rs.</span>
          {fmtNumber(summary.todaysRevenue)}
        </div>

        {loading && <div className="mediconnect-loading-text">Loading…</div>}
      </div>
    </div>
  );
}

