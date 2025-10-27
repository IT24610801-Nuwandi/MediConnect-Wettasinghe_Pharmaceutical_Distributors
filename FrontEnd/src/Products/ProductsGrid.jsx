import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductsGrid.css";
import { api } from "../../api/api";
import { API_BASE } from "../../api/config";


/* useing the correct uploads route */
const UPLOAD_BASE = `${API_BASE}/products/uploads`;

function norm(s = "") {
  return String(s).toLowerCase().replace(/[^a-z]/g, "").replace(/s$/, "");
}

export default function ProductsGrid({
  selectedCategoryId = null,
  typeFilter = "all",
  sort = "asc",
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/products");
        setItems(data ?? []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const visible = useMemo(() => {
    let list = items;

    if (selectedCategoryId) {
      const want = norm(selectedCategoryId);
      list = list.filter((p) => norm(p.category) === want);
    }
    if (typeFilter && typeFilter !== "all") {
      const want = norm(typeFilter);
      list = list.filter((p) => norm(p.sellingUnit) === want);
    }
    list = [...list].sort((a, b) => {
      const an = (a.itemName || a.marketName || "").toLowerCase();
      const bn = (b.itemName || b.marketName || "").toLowerCase();
      return sort === "desc" ? bn.localeCompare(an) : an.localeCompare(bn);
    });

    return list;
  }, [items, selectedCategoryId, typeFilter, sort]);

  if (loading) return <div className="pg-skeleton">Loading…</div>;

  return (
    <div className="pg-grid">
      {visible.map((p) => {
        /** FIRST image (if any) */
        const firstFile =
          Array.isArray(p.images) && p.images.length ? p.images[0] : null;

        const img = firstFile
          ? `${UPLOAD_BASE}/${encodeURIComponent(firstFile)}`
          : "/placeholder.png";

        const price = Number(p.priceRetail || 0);

        return (
          <div className="pg-card" key={p.itemId}>
            <div className="pg-media">
              <img src={img} alt={p.itemName} />
            </div>
            <div className="pg-body">
              <h3 className="pg-title">{p.itemName}</h3>
              
              <div className="pg-price">
                <span className="pg-price-now">Rs. {price.toLocaleString()}</span>
              </div>
              
              <div className="pg-actions">
                <Link className="btn-view" to={`/products/${p.itemId}`}>
                  View Product
                </Link>
              </div>
            </div>
          </div>
        );
      })}
      {visible.length === 0 && (
        <div className="pg-empty">No products match the current filters.</div>
      )}
    </div>
  );
}