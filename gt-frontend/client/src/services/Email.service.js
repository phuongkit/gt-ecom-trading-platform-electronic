import { axiosClient } from '~/api';

export const emailService = {
   
    getAllEmails() {
        return axiosClient.get(`/Mail`);
    },
    getEmail(id) {
        return axiosClient.get(`/Mail/${id}`);
    },
    postEmail(email) {
        return axiosClient.post(`/Mail/RegularEmail`,email);
    },
    postEmailSchedule(email) {
        return axiosClient.post(`/Mail/Email`,email);
    },
    deleteEmail(id) {
        return axiosClient.delete(`/Mail/${id}`);
    },
};
