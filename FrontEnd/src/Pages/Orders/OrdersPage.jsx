// src/Pages/Orders/OrdersPage.jsx
import { useEffect, useState } from "react";
import Orders from "./Orders";
import { OrdersAPI } from "@/services/ordersApi";
import { DeliveryAPI } from "@/services/deliveryApi";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  const load = async () => {
    try {
      // backend expects userId; keep 1 until you pass it from auth
      const list = await OrdersAPI.list(); // returns OrderDto[]
      const enriched = await Promise.all(
        (Array.isArray(list) ? list : []).map(async (o) => {
          try {
            const d = await DeliveryAPI.getByOrder(o.orderId);
            return { ...o, trackingNo: d?.trackingNo, deliveryStatus: d?.status };
          } catch {
            return o;
          }
        })
      );

      setOrders(
        enriched.map((o) => ({
          ...o,
          onRefresh: async (orderId) => {
            try {
              const d = await DeliveryAPI.getByOrder(orderId);
              setOrders((curr) =>
                curr.map((x) =>
                  x.orderId === orderId
                    ? { ...x, trackingNo: d?.trackingNo, deliveryStatus: d?.status }
                    : x
                )
              );
            } catch {}
          },
          onSubscribe: null,
        }))
      );
    } catch (e) {
      console.error("Failed to load orders:", e);
      setOrders([]);
    }
  };

  useEffect(() => { load(); }, []);
  return <Orders orders={orders} />;
}




// // src/Pages/Orders/OrdersPage.jsx
// import { useEffect, useState } from "react";
// import Orders from "./Orders";
// import { OrdersAPI } from "@services/ordersApi";
// import { DeliveryAPI } from "@services/deliveryApi";

// export default function OrdersPage() {
//   const [orders, setOrders] = useState([]);

//   const load = async () => {
//     try {
//       const raw = await fetch("/api/orders?userId=1").then(r => r.json());
//       const list = Array.isArray(raw) ? raw : [];        // ✅ guard
//       const enriched = await Promise.all(list.map(async o => {
//         try {
//           const d = await DeliveryAPI.getByOrder(o.orderId);
//           return { ...o, trackingNo: d?.trackingNo, deliveryStatus: d?.status };
//         } catch { return o; }
//       }));
//       setOrders(enriched.map(o => ({
//         ...o,
//         onRefresh: async (orderId) => {
//           try {
//             const d = await DeliveryAPI.getByOrder(orderId);
//             setOrders(curr => curr.map(x =>
//               x.orderId === orderId
//                 ? { ...x, trackingNo: d?.trackingNo, deliveryStatus: d?.status }
//                 : x
//             ));
//           } catch {}
//         },
//         onSubscribe: null,
//       })));
//     } catch {
//       setOrders([]);
//     }
//   };

//   useEffect(() => { load(); }, []);
//   return <Orders orders={orders} />;
// }



// // import { useEffect, useState } from "react";
// // import Orders from "./Orders";
// // import { DeliveryAPI } from "@services/deliveryApi";

// // export default function OrdersPage() {
// //   const [orders, setOrders] = useState([]);

// //   const load = async () => {
// //     try {
// //       const list = await fetch("/api/orders?userId=1").then(r=>r.json());
// //       const enriched = await Promise.all(list.map(async o => {
// //         try {
// //           const d = await DeliveryAPI.getByOrder(o.orderId);
// //           return { ...o, trackingNo: d?.trackingNo, deliveryStatus: d?.status };
// //         } catch { return o; }
// //       }));
// //       // attach callbacks for each card
// //       setOrders(enriched.map(o => ({
// //         ...o,
// //         onRefresh: async (orderId) => {
// //           try {
// //             const d = await DeliveryAPI.getByOrder(orderId);
// //             setOrders(curr => curr.map(x => x.orderId===orderId ? { ...x, trackingNo:d?.trackingNo, deliveryStatus:d?.status } : x));
// //           } catch {}
// //         },
// //         // optional; wire when backend endpoint exists
// //         onSubscribe: null
// //       })));
// //     } catch {
// //       setOrders([]);
// //     }
// //   };

// //   useEffect(() => { load(); }, []);
// //   return <Orders orders={orders} />;
// // }




// // // import { useEffect, useState } from "react";
// // // import Orders from "./Orders";
// // // import { DeliveryAPI } from "@services/deliveryApi";

// // // export default function OrdersPage() {
// // //   const [orders, setOrders] = useState([]);

// // //   useEffect(() => {
// // //     fetch("/api/orders?userId=1")
// // //       .then(r=>r.json())
// // //       .then(async list => {
// // //         // enrich with tracking
// // //         const enriched = await Promise.all(list.map(async o => {
// // //           try {
// // //             const d = await DeliveryAPI.getByOrder(o.orderId);
// // //             return { ...o, trackingNo: d?.trackingNo, deliveryStatus: d?.status };
// // //           } catch { return o; }
// // //         }));
// // //         setOrders(enriched);
// // //       })
// // //       .catch(()=>setOrders([]));
// // //   }, []);

// // //   return <Orders orders={orders} />;
// // // }




// // // import { useEffect, useState } from "react";
// // // import Orders from "../components/Orders";
// // // import { OrdersAPI } from "../services/ordersApi";


// // // export default function OrdersPage() {
// // //   const [orders, setOrders] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [err, setErr] = useState("");

// // //   useEffect(() => {
// // //     OrdersAPI.list(1)
// // //       .then(setOrders)
// // //       .catch(e => setErr(e.message))
// // //       .finally(() => setLoading(false));
// // //   }, []);

// // //   if (loading) return <div>Loading…</div>;
// // //   if (err) return <div className="error">{err}</div>;
// // //   return <Orders orders={orders} />;
// // // }
