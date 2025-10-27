import { http } from './apiClient';

// backend stub you can implement later (e.g. POST /notifications/subscribe)
export const NotificationAPI = {
  subscribeOrder: (orderId, userId = 1) =>
    http(`/notifications/subscribe?orderId=${orderId}&userId=${userId}`, { method:'POST' }),
};


