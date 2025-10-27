import "./Cart.css";
import { Link } from "react-router-dom";

export default function Cart({
  items = [],
  deliveryAmount = 300,
  onIncrease = () => {},
  onDecrease = () => {},
  onRemove   = () => {},
  onCheckout = () => {},
}) {
  const subtotal = items.reduce((s, r) => s + Number(r.price||0) * Number(r.qty||0), 0);
  const delivery = items.length ? Number(deliveryAmount||0) : 0;
  const grand = subtotal + delivery;

  return (
    <div className="cart-shell">
      {/* steps: Cart (active) + Delivery (link) */}
      <div className="steps">
        <span className="active">Cart</span>
        <Link className="step-link" to="/delivery">Delivery</Link>
      </div>

      <div className="panel">
        <h1 className="title">
          Your Cart <span className="muted">({items.length} {items.length===1?"item":"items"})</span>
        </h1>

        {items.length === 0 && <div className="empty">Your cart is empty.</div>}

        {items.map((row) => (
          <div key={row.id} className="line">
            <div className="thumb">{row.imageUrl ? <img src={row.imageUrl} alt="" /> : "[Image]"}</div>
            <div className="info">
              <div className="name">{row.name ?? "—"}</div>
              <div className="price">Rs {Number(row.price||0).toFixed(2)}</div>
            </div>
            <div className="qty">
              <button className="icon" disabled={(row.qty||0) <= 1} onClick={() => onDecrease(row.id)}>–</button>
              <span className="q">{row.qty ?? 0}</span>
              <button className="icon" onClick={() => onIncrease(row.id)}>+</button>
            </div>
            <div className="linePrice">Rs {(Number(row.price||0) * Number(row.qty||0)).toFixed(2)}</div>
            <button className="remove" onClick={() => onRemove(row.id)}>×</button>
          </div>
        ))}

        <div className="summary">
          <div className="row"><span>Subtotal:</span><span>Rs {subtotal.toFixed(2)}</span></div>
          <div className="row"><span>Delivery Charge:</span><span>Rs {delivery.toFixed(2)}</span></div>
          <div className="row grand"><span>Grand Total:</span><span>Rs {grand.toFixed(2)}</span></div>
        </div>

        <div className="actions">
          <Link className={`primary btn-as-link ${items.length===0?'disabled':''}`} to={items.length?"/delivery":"#"}>Continue to Delivery</Link>
          <Link className="link" to="/">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
