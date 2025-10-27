// src/Pages/DeliveryPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { OrdersAPI } from "@/services/ordersApi";
import { CartAPI } from "@/services/cartApi";  
import "./Delivery.css";

export default function DeliveryPage() {
  const nav = useNavigate();
  const [f, setF] = useState({ name: "", address: "", phone: "" });
  const [placing, setPlacing] = useState(false);

  const on = (e) => setF({ ...f, [e.target.name]: e.target.value });
  const save = () => localStorage.setItem("deliveryInfo", JSON.stringify(f));

  const place = async () => {
    if (!f.name.trim() || !f.address.trim() || !f.phone.trim()) {
      alert("Fill name, address, phone.");
      return;
    }
    save();
    setPlacing(true);

    try {
      const cart = await CartAPI.list(); 
      if (!Array.isArray(cart?.items) || cart.items.length === 0) {
        alert("Your cart is empty. Please add products first.");
        nav("/cart");
        return;
      }
      
      // Your backend requires a userId param; keep 1 if you don't have auth wiring yet
      await OrdersAPI.checkout();
      nav("/orders", { replace: true });
    } catch (e) {
      const status = e?.response?.status;
      const body = e?.response?.data;
      const msg =
        (typeof body === "string" && body) ||
        body?.message ||
        body?.error ||
        e.message ||
        "Failed to place order.";
      alert(`${msg}${status ? ` (HTTP ${status})` : ""}`);
      console.error("Checkout failed:", status, body);
      // // surface the backend message
      // const msg =
      //   e?.response?.data?.message ||
      //   e?.response?.data?.error ||
      //   (typeof e?.response?.data === "string" ? e.response.data : "") ||
      //   e?.message ||
      //   "Failed to place order.";
      // alert(msg);
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="d-min">
      <h3>Delivery</h3>
      <label>Name*   <input name="name" value={f.name} onChange={on} /></label>
      <label>Address*<input name="address" value={f.address} onChange={on} /></label>
      <label>Phone*  <input name="phone" value={f.phone} onChange={on} /></label>

      <div className="btns">
        <button className="ghost" onClick={save} type="button">Save</button>
        <button onClick={place} type="button" disabled={placing}>
          {placing ? "Placing..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}



// // src/Pages/DeliveryPage.jsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { OrdersAPI } from "@services/ordersApi";     // ✅ use your alias
// import "./Delivery.css";

// export default function DeliveryPage() {
//   const nav = useNavigate();
//   const [f, setF] = useState({ name: "", address: "", phone: "" });
  

//   const on = e => setF({ ...f, [e.target.name]: e.target.value });
//   const save = () => localStorage.setItem("deliveryInfo", JSON.stringify(f));

//   const place = async () => {
//     if (!f.name.trim() || !f.address.trim() || !f.phone.trim()) {
//       alert("Fill name, address, phone.");
//       return;
//     }
//     save();
//     try {
//       await OrdersAPI.checkout(1); 
//       nav("/orders");
//     } catch (e) {
//       alert(e.message);
//     }
//   };

//   return (
//     <div className="d-min">
//       <h3>Delivery</h3>
//       <label>Name*   <input name="name" value={f.name} onChange={on} /></label>
//       <label>Address*<input name="address" value={f.address} onChange={on} /></label>
//       <label>Phone*  <input name="phone" value={f.phone} onChange={on} /></label>
      
//       <div className="btns">
//         <button className="ghost" onClick={save}>Save</button>
//         <button onClick={place}>Place Order</button>
//       </div>
//     </div>
//   );
// }


// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { OrdersAPI } from "../services/ordersApi";
// // import "./Delivery.css";

// // export default function DeliveryPage() {
// //   const nav = useNavigate();
// //   const [f, setF] = useState({ name: "", address: "", phone: "" });
// //   const [promo, setPromo] = useState(""); 
// //   const on = e => setF({ ...f, [e.target.name]: e.target.value });
// //   const save = () => localStorage.setItem("deliveryInfo", JSON.stringify(f));
// //   const place = async () => {
// //     if (!f.name.trim() || !f.address.trim() || !f.phone.trim()) return alert("Fill name, address, phone.");
// //     save();
// //     try {
// //       await OrdersAPI.checkout(1, promo || undefined);
// //       nav("/orders");
// //     } catch (e) {
// //       alert(e.message);
// //     }
// //   };

// //   return (
// //     <div className="d-min">
// //       <h3>Delivery</h3>
// //       <label>Name*   <input name="name" value={f.name} onChange={on} /></label>
// //       <label>Address*<input name="address" value={f.address} onChange={on} /></label>
// //       <label>Phone*  <input name="phone" value={f.phone} onChange={on} /></label>
// //       <label>Promo code <input value={promo} onChange={e => setPromo(e.target.value)} /></label>
// //       <div className="btns">
// //         <button className="ghost" onClick={save}>Save</button>
// //         <button onClick={place}>Place Order</button>
// //       </div>
// //     </div>
// //   );
// // }
