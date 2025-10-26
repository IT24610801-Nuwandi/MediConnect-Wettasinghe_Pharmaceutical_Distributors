import React from "react";
import "./Cart.css";

function Cart() {
  return (
    <section className="cart">
      <h2>Your Cart</h2>
      <p>Items you’ve added to your cart will appear here.</p>
    </section>
  );
}

export default Cart; // <-- add this (or declare as `export default function Cart() { ... }`)

