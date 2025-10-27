// src/services/cartApi.js
import axios from "axios";
import { API_BASE } from "@/api/api";

export const CartAPI = {
  add: ({ userId, itemId, quantity, unitPrice }) =>
    axios.post(`${API_BASE}/cart/save`, { userId, itemId, quantity, unitPrice }),
  list: (userId) =>
    axios.get(`${API_BASE}/cart/list`, { params: { userId } }).then(r => r.data),
  updateQty: (cartItemId, quantity) =>
    axios.put(`${API_BASE}/cart/${cartItemId}`, null, { params: { quantity } }),
  remove: (cartItemId) => axios.delete(`${API_BASE}/cart/${cartItemId}`),
  clear: (userId) => axios.post(`${API_BASE}/cart/clear`, null, { params: { userId } }),
};
