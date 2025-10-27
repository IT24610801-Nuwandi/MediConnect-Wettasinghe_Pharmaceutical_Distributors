import {api} from "@/api/api";
export const DeliveryAPI = {
  getByOrder: async (orderId) => (await fetch(`/api/delivery/${orderId}`)).json(),
};



