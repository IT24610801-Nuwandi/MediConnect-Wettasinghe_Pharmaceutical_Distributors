// ✅ NEW: src/services/ordersApi.js
import { api } from "@/api/api";

export const OrdersAPI = {
  checkout: () => api.post(`/orders`).then(r => r.data),  // ⬅️ no params
  list:     () => api.get(`/orders`).then(r => r.data),   // ⬅️ no params
  get:      (id) => api.get(`/orders/${id}`).then(r => r.data),
};



// import { api } from "@/api/api";

// export const OrdersAPI = {
//   checkout: (userId) => api.post("/orders", null, { params: { userId } }).then(r => r.data),
//   list:     (userId) => api.get("/orders", { params: { userId } }).then(r => r.data),
//   get:      (id)     => api.get(`/orders/${id}`).then(r => r.data),
// };
