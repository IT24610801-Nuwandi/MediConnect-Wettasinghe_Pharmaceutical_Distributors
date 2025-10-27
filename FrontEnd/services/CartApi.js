// src/services/cartApi.js
import { api } from "@/api/api";

export const CartAPI = {
  add: ({ itemId, quantity, unitPrice }) =>
    api.post("/cart/save", { itemId, quantity, unitPrice }).then(r => r.data),

  list: () =>
    api.get("/cart/list").then(r => r.data),

  updateQty: (cartItemId, quantity) =>
    api.put(`/cart/${cartItemId}`, null, { params: { quantity } }).then(r => r.data),

  remove: (cartItemId) =>
    api.delete(`/cart/${cartItemId}`).then(r => r.data),

  clear: () =>
    api.post("/cart/clear").then(r => r.data),
};






// // src/services/cartApi.js
// import axios from "axios";
// import { API_BASE } from "@/api/api";

// export const CartAPI = {
//   add: ({ userId, itemId, quantity, unitPrice }) =>
//     axios.post(`${API_BASE}/cart/save`, { userId, itemId, quantity, unitPrice }),
//   list: (userId) =>
//     axios.get(`${API_BASE}/cart/list`, { params: { userId } }).then(r => r.data),
//   updateQty: (cartItemId, quantity) =>
//     axios.put(`${API_BASE}/cart/${cartItemId}`, null, { params: { quantity } }),
//   remove: (cartItemId) => axios.delete(`${API_BASE}/cart/${cartItemId}`),
//   clear: (userId) => axios.post(`${API_BASE}/cart/clear`, null, { params: { userId } }),
// };




// // export const CartAPI = {
// //   add: async ({ userId, itemId, quantity, unitPrice }) => {
// //     const body = { userId, itemId, quantity, unitPrice };
// //     return await axios.post(`${API_BASE}/cart/add`, body);
// //   },

// //   getUserCart: async (userId) => {
// //     const { data } = await axios.get(`${API_BASE}/cart/${userId}`);
// //     return data;
// //   },

// //   remove: async (cartItemId) => {
// //     return await axios.delete(`${API_BASE}/cart/${cartItemId}`);
// //   },
// // };



// // // ✅ NEW: src/services/cartApi.js
// // import { api } from "@/api/api";
// // import { API_BASE } from "@/api/config";

// // export const CartAPI = {
// //   add: (payload) => api.post("/cart/save", payload).then(r => r.data),
// //   list: (userId)   => api.get(`/cart/list`, { params: { userId } }).then(r => r.data),
// //   updateQty: (cartItemId, quantity) =>
// //     api.put(`/cart/${cartItemId}`, null, { params: { quantity } }).then(r => r.data),
// //   remove: (cartItemId) => api.delete(`/cart/${cartItemId}`).then(r => r.data),
// //   // clear: (userId) => api.post(`/cart/clear`, null, { params: { userId } }),
// // };

// export default CartAPI;



// // import { api } from "@/api/api";

// // // Backend expects: /api/cart  (through Vite proxy) OR absolute base
// // const base = "/api/cart";

// // export const CartAPI = {
// //   list: async (userId) => (await fetch(`${base}/list?userId=${userId}`)).json(),
// //   add: async ({ userId, itemId, quantity, unitPrice }) =>
// //     (await fetch(`${base}/save`, {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ userId, itemId, quantity, unitPrice }),
// //     })).json(),
// //   updateQty: async (cartItemId, quantity) =>
// //     (await fetch(`${base}/${cartItemId}?quantity=${quantity}`, { method: "PUT" })).json(),
// //   remove: async (cartItemId) =>
// //     fetch(`${base}/${cartItemId}`, { method: "DELETE" }),
// //   clear: async (userId) =>
// //     fetch(`${base}/clear?userId=${userId}`, { method: "POST" }),
// // };



// // // import { http } from './apiClient';

// // // // Backend returns CartResponse { items:[{cartItemId,itemId,quantity,unitPrice,lineTotal}], grandTotal }
// // // export const CartAPI = {
// // //   list: (userId = 1) => http(`/cart/list?userId=${userId}`),
// // //   add:  (p, userId = 1) => http(`/cart/save`, { method:'POST', body:JSON.stringify({ userId, ...p }) }),
// // //   updateQty: (id, q) => http(`/cart/${id}?quantity=${q}`, { method:'PUT' }),
// // //   remove: (id) => http(`/cart/${id}`, { method:'DELETE' }),
// // //   clear:  (userId = 1) => http(`/cart/clear?userId=${userId}`, { method:'POST' }), // you added this
// // // };
