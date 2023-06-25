import { axiosClient } from '~/api';

const branch_api = "/shipment";

export const shipmentService = {
    getAllOrderSameArea() {
        return axiosClient.get(`${branch_api}/same-area`);
    },
    getAllOrderShipment() {
        return axiosClient.get(`${branch_api}/get-all?status=SHIPPING`);
    }
};
