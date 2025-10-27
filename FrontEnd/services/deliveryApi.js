// src/services/deliveryApi.js
import { api } from "@/api/api";

export const DeliveryAPI = {
  getByOrder: (orderId) => api.get(`/delivery/${orderId}`).then(r => r.data),
};




// import {api} from "@/api/api";
// export const DeliveryAPI = {
//   getByOrder: async (orderId) => (await fetch(`/api/delivery/${orderId}`)).json(),
// };





// // // src/services/deliveryApi.jsx
// // import { http } from './apiClient';
// // export const DeliveryAPI = {
// //   getByOrder: (orderId) => http(`/delivery/${orderId}`),
// // };



// // // // src/services/deliveryApi.js
// // // import { http } from '@/services/apiClient';   // using the alias too
// // // export const DeliveryAPI = {
// // //   getByOrder: (orderId) => http(`/delivery/${orderId}`),
// // // };
