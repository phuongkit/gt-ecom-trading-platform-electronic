import { axiosClient } from '~/api';

export const historyService = {
    getHistoryOrderByPhone(value) {
        return axiosClient.get(`/orders?customer.phone=${value}`);
    },
    getHistoryOrderByUserId(userId) {
        return axiosClient.get(`/orders/userId/${userId}`);
    },
    updateHistoryOrder(id, data) {
        return axiosClient.patch(`/orders/${id}`, data);
    },
};
