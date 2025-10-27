import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../../api/config";
import "./ProductDetail.css";

export default function ProductDetail({
  priceField = "priceRetail",//showing retailprice
  backTo = "/products",
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [prod, setProd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [imgIdx, setImgIdx] = useState(0);

  // Loading a product
  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/products/${id}`);
        if (!ignore) setProd(data);
      } catch (e) {
        console.error(e);
        if (!ignore) setProd(null);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return (
      <section className="pd">
        <div className="pd__loading">Loading…</div>
      </section>
    );
  }

  if (!prod) {
    return (
      <section className="pd">
        <div className="pd__error">
          Product not found.
          <Link to={backTo} className="pd__back-btn">
            Back to Products
          </Link>
        </div>
      </section>
    );
  }

  const title = prod.itemName || prod.marketName || "Product";

  //six image slots and if there no image showing empty
  const rawImages = Array.isArray(prod.images) ? prod.images.slice(0, 6) : [];
  const imageFiles = Array.from({ length: 6 }, (_, i) => rawImages[i] ?? null);

  const imageUrl = (f) =>
    f ? `${API_BASE}/products/uploads/${encodeURIComponent(f)}` : "/placeholder.png";

  const mainImg = imageUrl(imageFiles[imgIdx]); //first image for main image

  // select price from price field whether retailprice or wholesale price
  const priceNow = prod?.[priceField] != null ? Number(prod[priceField]) : null;

  const addToCart = () => {
    const item = {
      id: prod.itemId,
      name: prod.itemName || prod.marketName,
      price: priceNow || 0,
      qty,
      image: imageFiles?.[0] ? imageUrl(imageFiles[0]) : null,
    };
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const i = cart.findIndex((x) => x.id === item.id);
    if (i > -1) cart[i].qty += qty;
    else cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  };

  return (
    <section className="pd">
      <div className="pd__wrap card">
        {/* left side images */}
        <div className="pd__media">
          <div className="ratio ratio-4x3 pd__imagebox">
            <img src={mainImg} alt={title} className="pd__image" />
          </div>

          {/* Thumbnails to change small images to left side big one when click */}
          <div className="pd__thumbs">
            {imageFiles.map((f, i) => {
              const thumbSrc = imageUrl(f);
              return (
                <button
                  key={`${f ?? "placeholder"}-${i}`}
                  type="button"
                  className={`pd__thumb ${i === imgIdx ? "is-active" : ""}`}
                  onClick={() => setImgIdx(i)} //switched to click index
                  aria-label={`Image ${i + 1}`}
                  style={{ cursor: "pointer" }}
                >
                  <img src={thumbSrc} alt="" />
                </button>
              );
            })}
          </div>
        </div>

        {/* right side product details */}
        <div className="pd__info">
          <h1 className="pd__title">{title}</h1>

          <div className="pd__price">
            {priceNow != null && (
              <div className="pd__price-now">
                Rs. {priceNow.toLocaleString()}
              </div>
            )}
          </div>

          {/* Quantity and Add to Cart */}
          <div className="pd__buyrow">
            <div className="pd__qtywrap">
              <span className="pd__qtylabel">Quantity</span>
              <div className="pd__qty">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  −
                </button>
                <input
                  value={qty}
                  onChange={(e) =>
                    setQty(Math.max(1, Number(e.target.value) || 1))
                  }
                />
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <button type="button" className="pd__add-to-cart-btn" onClick={addToCart}>
              Add to Cart
            </button>
          </div>

          {/* Details grid */}
          <div className="pd__section">
            <h3 className="pd__section-title">Product details</h3>

            <div className="pd__grid">
              <Field label="Item Name" value={prod.itemName} />
              <Field label="Brand" value={prod.brand} />
              <Field label="Agency" value={prod.agency} />
              <Field label="Category" value={prod.category} />
              <Field label="Strength" value={prod.strength} />
              <Field label="Size" value={prod.size} />
              <Field label="Market Name" value={prod.marketName} />
              <Field label="Selling Unit" value={prod.sellingUnit} />
              <Field label="New" value={prod.isNew ? "Yes" : "No"} />
              <Field label="Active" value={prod.isActive ? "Yes" : "No"} />
            </div>
          </div>

          {/* Footer */}
          <div className="pd__footer">
            <Link to={backTo} className="pd__back-btn">
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, strong }) {
  return (
    <div className="pd__field">
      <div className="pd__label">{label}</div>
      <div className={`pd__value ${strong ? "pd__value--strong" : ""}`}>
        {value ?? "-"}
      </div>
    </div>
  );
}


