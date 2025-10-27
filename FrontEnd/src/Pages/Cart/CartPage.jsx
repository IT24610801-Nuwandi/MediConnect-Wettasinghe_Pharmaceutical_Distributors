import { useEffect, useState } from "react";
import Cart from "./Cart";
import { CartAPI } from "@/services/cartApi";

export default function CartPage() {
  const [items, setItems] = useState([]);

  const mapFromApi = (arr) =>
    arr.map(it => ({
      id: it.cartItemId,
      itemId: it.itemId,
      name: it.name ?? `Item #${it.itemId}`,
      qty: Number(it.quantity || 0),
      price: Number(it.unitPrice || 0),
      imageUrl: it.imageUrl || null,
    }));


  const load = async () => {
    const data = await CartAPI.list(1);
    setItems(mapFromApi(Array.isArray(data?.items) ? data.items : []));
  };

  useEffect(() => { load(); }, []);

  // optimistic helpers
  const patchLocal = (id, next) =>
    setItems(curr => curr.map(x => (x.id === id ? next(x) : x)));

  const onIncrease = async (id) => {
    const row = items.find(x => x.id === id);
    if (!row) return;
    patchLocal(id, x => ({ ...x, qty: x.qty + 1 }));
    try { await CartAPI.updateQty(id, row.qty + 1); }
    catch { await load(); }  // rollback by reloading if server rejects
  };

  const onDecrease = async (id) => {
    const row = items.find(x => x.id === id);
    if (!row || row.qty <= 1) return;
    patchLocal(id, x => ({ ...x, qty: x.qty - 1 }));
    try { await CartAPI.updateQty(id, row.qty - 1); }
    catch { await load(); }
  };

  const onRemove = async (id) => {
    const backup = items;
    setItems(curr => curr.filter(x => x.id !== id));
    try { await CartAPI.remove(id); }
    catch { setItems(backup); } // rollback on failure
  };

  return (
    <Cart
      items={items}
      deliveryAmount={0}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onRemove={onRemove}
    />
  );
}





