import { axiosClient } from '~/api';

export const registerShopService = {
    postShopApi(data) {
        return axiosClient.post(`/shops`,data);
    },
};
