// ✅ NEW: src/services/ordersApi.js
import { api } from "@/api/api";

export const OrdersAPI = {
  checkout: (userId) =>
    api.post(`/orders`, null, { params: { userId } }).then(r => r.data),
  list: (userId) => api.get(`/orders`, { params: { userId } }).then(r => r.data),
  get: (id) => api.get(`/orders/${id}`).then(r => r.data),
};

