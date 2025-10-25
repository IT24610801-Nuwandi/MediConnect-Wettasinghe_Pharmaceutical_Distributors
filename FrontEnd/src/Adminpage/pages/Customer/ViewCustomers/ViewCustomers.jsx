import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../../../../../api/config";
import "../Customer.css";

export default function ViewCustomers() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE}/users`);
      setRows(data);
    } catch (e) {
      console.error(e);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  if (loading) return <div className="mediconnect-loading-state">Loading…</div>;

  return (
    <div className="mediconnect-inventory-card">
      <h3 className="mediconnect-heading-spacing">Registered Customers</h3>
      <div className="mediconnect-table-wrap">
        <table className="mediconnect-table table-sm align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Active</th>
              <th>Created</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(u => (
              <tr key={u.userId}>
                <td>{u.userId}</td>
                <td>{u.userName}</td>
                <td>{u.address}</td>
                <td>{u.phone}</td>
                <td>{u.email}</td>
                <td>{u.isActive ? "Yes" : "No"}</td>
                <td>{u.createdAt?.replace("T"," ").slice(0,19)}</td>
                <td>{u.updatedAt?.replace("T"," ").slice(0,19)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}