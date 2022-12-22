import axiosInstance from './../api';

const branch_api = "/categories";

class CategoryService {
    getAllCategories() {
        return axiosInstance.get(`${branch_api}`);
    }
    getCategoryBySlug(slug) {
        return axiosInstance.get(`${branch_api}/slug/${slug}`);
    }
};

export default new CategoryService();