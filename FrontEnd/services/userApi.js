import { api } from "@/api/api";

export const UserAPI = {
  me: () => api.get("/user/me").then(r => r.data), // expects your /api/user/me controller
};
