import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE } from "../../../../../api/config";
import "./DisplayItem.css";

const UPLOAD_BASE = `${API_BASE}/products/uploads`;

export default function DisplayItem() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const emptyEdit = {
    itemCode: "", itemName: "", brand: "", agency: "", category: "",
    strength: "", size: "", marketName: "", priceRetail: "", qtyRetail: 0,
    priceWholesale: "", qtyWholesale: 0, purchaseUnit: "", sellingUnit: "",
    isNew: false, isActive: true,
  };
  const [editForm, setEditForm] = useState(emptyEdit);

  const [rowImages, setRowImages] = useState({});
  const [addFiles, setAddFiles] = useState({});

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE}/products`);
      setItems(data);
    } catch (e) {
      console.error(e);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);

  const fetchImages = async (productId) => {
    try {
      const { data } = await axios.get(`${API_BASE}/products/${productId}/images`);
      setRowImages(m => ({ ...m, [productId]: data }));
    } catch (e) {
      console.error("Failed to load images", e);
      setRowImages(m => ({ ...m, [productId]: [] }));
    }
  };

  const startEdit = (p) => {
    setEditingId(p.itemId);
    setEditForm({
      itemCode: p.itemCode ?? "", itemName: p.itemName ?? "",
      brand: p.brand ?? "", agency: p.agency ?? "", category: p.category ?? "",
      strength: p.strength ?? "", size: p.size ?? "", marketName: p.marketName ?? "",
      priceRetail: p.priceRetail ?? "", qtyRetail: p.qtyRetail ?? 0,
      priceWholesale: p.priceWholesale ?? "", qtyWholesale: p.qtyWholesale ?? 0,
      purchaseUnit: p.purchaseUnit ?? "", sellingUnit: p.sellingUnit ?? "",
      isNew: !!p.isNew, isActive: !!p.isActive,
    });
    fetchImages(p.itemId);
    setAddFiles(m => ({ ...m, [p.itemId]: null }));
  };

  const cancelEdit = () => {
    if (editingId != null) {
      setAddFiles(m => {
        const cp = { ...m };
        delete cp[editingId];
        return cp;
      });
      setRowImages(m => ({ ...m }));
    }
    setEditingId(null);
  };

  const onEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const removeImage = async (productId, imageId) => {
    const imgObj = (rowImages[productId] || []).find(x => x.imageId === imageId); 
    const filename = imgObj?.imageUrl || null;                                     

    if (!window.confirm("Remove this image?")) return;
    try {
      await axios.delete(`${API_BASE}/products/${productId}/images/${imageId}`);

      setRowImages(m => ({
        ...m,
        [productId]: (m[productId] || []).filter(x => x.imageId !== imageId),
      }));

      if (filename) {
        setItems(list => list.map(it =>
          it.itemId === productId
            ? { ...it, images: (it.images || []).filter(fn => fn !== filename) }
            : it
        ));
      }
    } catch (e) {
      console.error(e);
      alert("Failed to remove image");
    }
  };

 const saveEdit = async (id) => {
  try {
    const payload = {
      ...editForm,
      priceRetail: editForm.priceRetail === "" ? null : Number(editForm.priceRetail),
      qtyRetail: Number(editForm.qtyRetail || 0),
      priceWholesale: editForm.priceWholesale === "" ? null : Number(editForm.priceWholesale),
      qtyWholesale: Number(editForm.qtyWholesale || 0),
    };
    await axios.put(`${API_BASE}/products/${id}`, payload);

    const files = addFiles[id];
    if (files && files.length) {
      const existing = (rowImages[id] || []).length;
      const roomLeft = Math.max(0, 6 - existing);      
      const toUpload = Array.from(files).slice(0, roomLeft);

      await Promise.all(
        toUpload.map((file, idx) => {
          const fd = new FormData();
          fd.append("file", file);
          fd.append("sortOrder", String(existing + idx + 1));
          return axios.post(`${API_BASE}/products/${id}/images`, fd, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        })
      );
    }

    setEditingId(null);
    await load();
  } catch (e) {
    console.error(e);
    alert("Update failed");
  }
};

  const removeProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`${API_BASE}/products/${id}`);
      setItems((list) => list.filter((x) => x.itemId !== id));
    } catch (e) {
      console.error(e);
      alert("Delete failed");
    }
  };

  const imgUrl = (file) => `${UPLOAD_BASE}/${encodeURIComponent(file)}`;

  if (loading) return <div className="mediconnect-loading-state">Loading…</div>;

  return (
    <div className="mediconnect-inventory-card">
      <h3 className="mediconnect-heading-spacing">All Items</h3>
      <div className="table-responsive">
        <table className="table table-sm align-middle mediconnect-inventory-table">
          <thead>
            <tr>
              <th>ID</th><th>Code</th><th>Name</th><th>Brand</th><th>Agency</th>
              <th>Category</th><th>Strength</th><th>Size</th><th>Market</th>
              <th>R.Price</th><th>R.Qty</th><th>W.Price</th><th>W.Qty</th>
              <th>Purchase Unit</th><th>Selling Unit</th><th>New</th><th>Active</th>
              <th>Created</th><th>Updated</th><th>Image(s)</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => {
              const isEditing = editingId === p.itemId;
              const files = Array.isArray(p.images) ? p.images : [];
              const imgs = rowImages[p.itemId] || [];

              return (
                <tr key={p.itemId}>
                  <td>{p.itemId}</td>

                  <td>{isEditing ? <input className="mediconnect-form-input" name="itemCode" value={editForm.itemCode} onChange={onEditChange}/> : p.itemCode}</td>
                  <td>{isEditing ? <input className="mediconnect-form-input" name="itemName" value={editForm.itemName} onChange={onEditChange}/> : p.itemName}</td>
                  <td>{isEditing ? <input className="mediconnect-form-input" name="brand" value={editForm.brand} onChange={onEditChange}/> : p.brand}</td>
                  <td>{isEditing ? <input className="mediconnect-form-input" name="agency" value={editForm.agency} onChange={onEditChange}/> : p.agency}</td>
                  <td>{isEditing ? <input className="mediconnect-form-input" name="category" value={editForm.category} onChange={onEditChange}/> : p.category}</td>
                  <td>{isEditing ? <input className="mediconnect-form-input" name="strength" value={editForm.strength} onChange={onEditChange}/> : p.strength}</td>
                  <td>{isEditing ? <input className="mediconnect-form-input" name="size" value={editForm.size} onChange={onEditChange}/> : p.size}</td>
                  <td>{isEditing ? <input className="mediconnect-form-input" name="marketName" value={editForm.marketName} onChange={onEditChange}/> : p.marketName}</td>

                  <td>{isEditing ? <input type="number" step="0.01" className="mediconnect-form-input" name="priceRetail" value={editForm.priceRetail} onChange={onEditChange}/> : p.priceRetail}</td>
                  <td>{isEditing ? <input type="number" className="mediconnect-form-input" name="qtyRetail" value={editForm.qtyRetail} onChange={onEditChange}/> : p.qtyRetail}</td>
                  <td>{isEditing ? <input type="number" step="0.01" className="mediconnect-form-input" name="priceWholesale" value={editForm.priceWholesale} onChange={onEditChange}/> : p.priceWholesale}</td>
                  <td>{isEditing ? <input type="number" className="mediconnect-form-input" name="qtyWholesale" value={editForm.qtyWholesale} onChange={onEditChange}/> : p.qtyWholesale}</td>

                  <td>{isEditing ? <input className="mediconnect-form-input" name="purchaseUnit" value={editForm.purchaseUnit} onChange={onEditChange}/> : p.purchaseUnit}</td>
                  <td>{isEditing ? <input className="mediconnect-form-input" name="sellingUnit" value={editForm.sellingUnit} onChange={onEditChange}/> : p.sellingUnit}</td>

                  <td>{isEditing ? <input type="checkbox" className="mediconnect-form-checkbox" name="isNew" checked={!!editForm.isNew} onChange={onEditChange}/> : (p.isNew ? "Yes" : "No")}</td>
                  <td>{isEditing ? <input type="checkbox" className="mediconnect-form-checkbox" name="isActive" checked={!!editForm.isActive} onChange={onEditChange}/> : (p.isActive ? "Yes" : "No")}</td>

                  <td>{p.createdAt?.replace("T"," ").slice(0,19)}</td>
                  <td>{p.updatedAt?.replace("T"," ").slice(0,19)}</td>

                  <td style={{minWidth:220}}>
                    {!isEditing ? (
                      files.length ? (
                        <div className="mediconnect-thumbnail-container">
                          {files.slice(0,3).map((f,i) => (
                            <img key={i} src={imgUrl(f)} alt="" width="42" height="42"
                                 className="mediconnect-image-thumbnail"/>
                          ))}
                          {files.length > 3 && <span className="badge mediconnect-badge-count">+{files.length-3}</span>}
                        </div>
                      ) : <span className="text-muted">No image</span>
                    ) : (
                      <>
                        <div className="mediconnect-image-gallery">
                          {imgs.map(im => (
                            <div key={im.imageId} style={{position:"relative"}}>
                              <img
                                src={`${UPLOAD_BASE}/${encodeURIComponent(im.imageUrl)}`}
                                alt=""
                                width="48" height="48"
                                className="mediconnect-edit-thumbnail"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(p.itemId, im.imageId)}
                                title="Remove"
                                className="mediconnect-remove-preview"
                              >×</button>
                            </div>
                          ))}
                        </div>

                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          className="mediconnect-form-input"
                          onChange={(e) =>
                            setAddFiles(m => ({ ...m, [p.itemId]: e.target.files }))
                          }
                        />
                        <small className="text-muted">Total max 6 per product.</small>
                      </>
                    )}
                  </td>

                  <td className="mediconnect-action-buttons">
                    {!isEditing ? (
                      <>
                        <button className="mediconnect-btn mediconnect-action-btn mediconnect-action-btn--edit mediconnect-btn-spacing" onClick={() => startEdit(p)}>Edit</button>
                        <button className="mediconnect-btn mediconnect-action-btn mediconnect-action-btn--delete" onClick={() => removeProduct(p.itemId)}>Delete</button>
                      </>
                    ) : (
                      <>
                        <button className="mediconnect-btn mediconnect-btn--primary mediconnect-btn-spacing" onClick={() => saveEdit(p.itemId)}>Save</button>
                        <button className="mediconnect-btn mediconnect-btn--outline" onClick={cancelEdit}>Cancel</button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}