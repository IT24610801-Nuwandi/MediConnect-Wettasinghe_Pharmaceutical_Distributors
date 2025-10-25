import React, { useMemo, useState } from "react";
import axios from "axios";
import { API_BASE } from "../../../../../api/config";
import "./AddItem.css";

export default function AddItem() {
  const [form, setForm] = useState({
    itemCode: "",
    itemName: "",
    brand: "",
    agency: "",
    category: "",
    strength: "",
    size: "",
    marketName: "",
    priceRetail: "",
    qtyRetail: 0,
    priceWholesale: "",
    qtyWholesale: 0,
    purchaseUnit: "",
    sellingUnit: "",
    isNew: false,
    isActive: true,
  });

  // To hold 6(max) images
  const [images, setImages] = useState([]);                
  const previews = useMemo(                                
    () => images.map(f => URL.createObjectURL(f)),
    [images]
  );

  const [saving, setSaving] = useState(false);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  //file picker handler handle files upto 6
  const onPickImages = (e) => {                            
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const next = [...images, ...files].slice(0, 6);
    setImages(next);
  };

  //remove one preview/file
  const removeImageAt = (i) => {                           
    setImages(prev => prev.filter((_, idx) => idx !== i));
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        itemCode: form.itemCode,
        itemName: form.itemName,
        brand: form.brand,
        agency: form.agency,
        category: form.category,
        strength: form.strength,
        size: form.size,
        marketName: form.marketName,
        priceRetail: form.priceRetail === "" ? null : Number(form.priceRetail),
        qtyRetail: Number(form.qtyRetail || 0),
        priceWholesale: form.priceWholesale === "" ? null : Number(form.priceWholesale),
        qtyWholesale: Number(form.qtyWholesale || 0),
        purchaseUnit: form.purchaseUnit,
        sellingUnit: form.sellingUnit,
        isNew: form.isNew,
        isActive: form.isActive,
      };

      const { data: product } = await axios.post(`${API_BASE}/products`, payload);

      // To upload each selected image with sortOrder 1 to 6
      for (let i = 0; i < images.length; i++) {            
        const fd = new FormData();
        fd.append("file", images[i]);
        fd.append("sortOrder", String(i + 1));
        await axios.post(`${API_BASE}/products/${product.itemId}/images`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      alert("Saved!");
      setForm({
        itemCode: "",
        itemName: "",
        brand: "",
        agency: "",
        category: "",
        strength: "",
        size: "",
        marketName: "",
        priceRetail: "",
        qtyRetail: 0,
        priceWholesale: "",
        qtyWholesale: 0,
        purchaseUnit: "",
        sellingUnit: "",
        isNew: false,
        isActive: true,
      });
      setImages([]);                                      
    } catch (err) {
      console.error(err);
      alert("Save failed. See console.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="mediconnect-inventory-card" onSubmit={submit}>
      <h3 className="mediconnect-heading-spacing">Add Item</h3>
      <div className="mediconnect-form-grid">
        <div className="mediconnect-form-field">
          <label className="mediconnect-form-label">Item code</label>
          <input className="mediconnect-form-input" name="itemCode" value={form.itemCode} onChange={onChange} required />
        </div>
        <div className="mediconnect-form-field">
          <label className="mediconnect-form-label">Item name</label>
          <input className="mediconnect-form-input" name="itemName" value={form.itemName} onChange={onChange} required />
        </div>
        <div className="mediconnect-form-field">
          <label className="mediconnect-form-label">Brand</label>
          <input className="mediconnect-form-input" name="brand" value={form.brand} onChange={onChange} />
        </div>
        <div className="mediconnect-form-field">
          <label className="mediconnect-form-label">Agency</label>
          <input className="mediconnect-form-input" name="agency" value={form.agency} onChange={onChange} />
        </div>
        <div className="mediconnect-form-field">
          <label className="mediconnect-form-label">Category</label>
          <input className="mediconnect-form-input" name="category" value={form.category} onChange={onChange} />
        </div>
        <div className="mediconnect-form-field">
          <label className="mediconnect-form-label">Strength</label>
          <input className="mediconnect-form-input" name="strength" value={form.strength} onChange={onChange} />
        </div>
        <div className="mediconnect-form-field">
          <label className="mediconnect-form-label">Size</label>
          <input className="mediconnect-form-input" name="size" value={form.size} onChange={onChange} />
        </div>
        <div className="mediconnect-form-field">
          <label className="mediconnect-form-label">Market name</label>
          <input className="mediconnect-form-input" name="marketName" value={form.marketName} onChange={onChange} />
        </div>
        <div className="mediconnect-form-field">
          <label className="mediconnect-form-label">Retail price</label>
          <input type="number" step="0.01" className="mediconnect-form-input" name="priceRetail" value={form.priceRetail} onChange={onChange} required />
        </div>
        <div className="mediconnect-form-field">
          <label className="mediconnect-form-label">Retail qty</label>
          <input type="number" className="mediconnect-form-input" name="qtyRetail" value={form.qtyRetail} onChange={onChange} />
        </div>
        <div className="mediconnect-form-field">
          <label className="mediconnect-form-label">Wholesale price</label>
          <input type="number" step="0.01" className="mediconnect-form-input" name="priceWholesale" value={form.priceWholesale} onChange={onChange} />
        </div>
        <div className="mediconnect-form-field">
          <label className="mediconnect-form-label">Wholesale qty</label>
          <input type="number" className="mediconnect-form-input" name="qtyWholesale" value={form.qtyWholesale} onChange={onChange} />
        </div>
        <div className="mediconnect-form-field">
          <label className="mediconnect-form-label">Purchase unit</label>
          <input className="mediconnect-form-input" name="purchaseUnit" value={form.purchaseUnit} onChange={onChange} />
        </div>
        <div className="mediconnect-form-field">
          <label className="mediconnect-form-label">Selling unit</label>
          <input className="mediconnect-form-input" name="sellingUnit" value={form.sellingUnit} onChange={onChange} />
        </div>
        <div className="mediconnect-checkbox-field">
          <input id="is_new" type="checkbox" className="mediconnect-form-checkbox" name="isNew" checked={form.isNew} onChange={onChange} />
          <label htmlFor="is_new" className="mediconnect-checkbox-label">Is new</label>
        </div>
        <div className="mediconnect-checkbox-field">
          <input id="is_active" type="checkbox" className="mediconnect-form-checkbox" name="isActive" checked={form.isActive} onChange={onChange} />
          <label htmlFor="is_active" className="mediconnect-checkbox-label">Active</label>
        </div>

         {/* multi-file picker + previews */}
        <div className="mediconnect-image-upload">                                    
          <label className="mediconnect-form-label">Images (up to 6)</label>       
          <input
            className="mediconnect-form-input"
            type="file"
            accept="image/*"
            multiple                                          
            onChange={onPickImages}                           
          />
          {!!previews.length && (                             
            <div className="mediconnect-image-previews">
              {previews.map((src, i) => (
                <div key={i} className="mediconnect-preview-item">
                  <img
                    src={src}
                    alt={`preview-${i}`}
                    width="70" height="70"
                    className="mediconnect-preview-image"
                  />
                  <button
                    type="button"
                    className="mediconnect-remove-preview"
                    onClick={() => removeImageAt(i)}
                    title="Remove"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          <small className="mediconnect-image-count">{images.length}/6 selected</small>
        </div>
      </div>

      <div className="mediconnect-form-actions">
        <button className="mediconnect-btn mediconnect-btn--primary mediconnect-btn--full" type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}