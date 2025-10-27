// src/Pages/Orders/OrdersPage.jsx
import { useEffect, useState } from "react";
import Orders from "./Orders";
import { OrdersAPI } from "@services/ordersApi";
import { DeliveryAPI } from "@services/deliveryApi";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  const load = async () => {
    try {
      const raw = await fetch("/api/orders?userId=1").then(r => r.json());
      const list = Array.isArray(raw) ? raw : [];        // ✅ guard
      const enriched = await Promise.all(list.map(async o => {
        try {
          const d = await DeliveryAPI.getByOrder(o.orderId);
          return { ...o, trackingNo: d?.trackingNo, deliveryStatus: d?.status };
        } catch { return o; }
      }));
      setOrders(enriched.map(o => ({
        ...o,
        onRefresh: async (orderId) => {
          try {
            const d = await DeliveryAPI.getByOrder(orderId);
            setOrders(curr => curr.map(x =>
              x.orderId === orderId
                ? { ...x, trackingNo: d?.trackingNo, deliveryStatus: d?.status }
                : x
            ));
          } catch {}
        },
        onSubscribe: null,
      })));
    } catch {
      setOrders([]);
    }
  };

  useEffect(() => { load(); }, []);
  return <Orders orders={orders} />;
}



