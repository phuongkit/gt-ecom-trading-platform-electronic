import { axiosClient } from '../api';

const branch_api = "/discounts";

export const discountService = {
    getAllDiscounts() {
        return axiosClient.get(`${branch_api}`);
    },
    getDiscountById(id) {
        return axiosClient.get(`${branch_api}/${id}`);
    },
    checkDiscountCode(code) {
        return axiosClient.get(`${branch_api}/check-code/${code}`);
    },
    postDiscount(data) {
        return axiosClient.post(`${branch_api}`,data);
    },
    putDiscount(id, data) {
        return axiosClient.put(`${branch_api}/${id}`,data);
    },
    deleteDiscount(id) {
        return axiosClient.delete(`${branch_api}/${id}`);
    },
};
