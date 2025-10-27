// // // // src/api/api.js
// // // import axios from "axios";
// // // import { API_BASE } from "@/api/config";

// // // export const api = axios.create({
// // //   baseURL: API_BASE,
// // //   timeout: 15000,
// // // });
// // // export { API_BASE };



// // import axios from "axios";
// // // import { API_BASE } from "@/api/config";

// // export const API_BASE =
// //   (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE)
// //     ? import.meta.env.VITE_API_BASE
// //     : "/api";

// // export const api = axios.create({
// //   baseURL: API_BASE,
// //   timeout: 15000,
// // });





// // src/api/api.js
// import axios from "axios";
// // Prefer hard-coded config value if present
// import { API_BASE as CONFIG_BASE } from "@/api/config";

// /**
//  * Resolve API base URL:
//  * 1) api/config.js  -> export const API_BASE = "http://localhost:8083/api";
//  * 2) Vite env       -> import.meta.env.VITE_API_BASE
//  * 3) Fallback       -> "/api" (use dev proxy)
//  */
// export const API_BASE =
//   (typeof CONFIG_BASE !== "undefined" && CONFIG_BASE) ||
//   ((typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE) ? import.meta.env.VITE_API_BASE :
//   "/api");

// /** Central Axios instance */
// export const api = axios.create({
//   baseURL: API_BASE,
//   timeout: 15000,
// });

// /** Token helpers (kept local so this file is standalone) */
// export const getToken   = () => localStorage.getItem("auth_token") || "";
// export const setToken   = (t) => localStorage.setItem("auth_token", t || "");
// export const clearToken = () => localStorage.removeItem("auth_token");
// export const isAuthed   = () => !!getToken();

// /** Attach JWT automatically */
// api.interceptors.request.use((config) => {
//   const token = getToken();
//   if (token) {
//     config.headers = config.headers || {};
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   // Default JSON content-type if none was set
//   if (hasBody && !(config.headers && config.headers["Content-Type"])) {
//     config.headers = { ...(config.headers || {}), "Content-Type": "application/json" };
//   }
//   return config;
// });

// // Optional: handle 401 globally if you want
// api.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     // if (err?.response?.status === 401) clearToken();
//     return Promise.reject(err);
//   }
// );



// src/api/api.js
import axios from "axios";
import { API_BASE as CONFIG_BASE } from "@/api/config";

/** Resolve API base URL */
export const API_BASE =
  (typeof CONFIG_BASE !== "undefined" && CONFIG_BASE) ? CONFIG_BASE :
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE) ? import.meta.env.VITE_API_BASE :
  "/api";

/** Central Axios instance */
export const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
});

/** Token helpers */
export const getToken   = () => localStorage.getItem("auth_token") || "";
export const setToken   = (t) => localStorage.setItem("auth_token", t || "");
export const clearToken = () => localStorage.removeItem("auth_token");
export const isAuthed   = () => !!getToken();

/** Helper: does this HTTP method normally carry a body? */
const methodHasBody = (m) =>
  ["post", "put", "patch", "delete"].includes(String(m || "").toLowerCase());

/** Attach JWT and sensible headers */
api.interceptors.request.use((config) => {
  const token = getToken();
  config.headers = config.headers || {};

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Only set JSON header when the request actually has a body
  if (
    methodHasBody(config.method) &&
    typeof config.data !== "undefined" &&
    !config.headers["Content-Type"]
  ) {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
);
