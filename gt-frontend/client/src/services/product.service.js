import { axiosClient } from '~/api';

const branch_api = "/products";

export const productService = {
    getProducts({categoryId = null , brandId = null, shopId = null, page = null, limit = null, location = null}) {
        const params= {
            'categoryId': categoryId,
            'brandId': brandId,
            'shopId': shopId,
            'page': page,
            'limit': limit,
            'location': location,
        }
        const query = Object.keys(params).reduce((acc, key) => {
            const value = params[key];
            return value ? acc + `${key}=${params[key]}&` : acc;
        }, '')
        return axiosClient.get(`${branch_api}?${query}`);
    },
    getProductById(id) {
        return axiosClient.get(`${branch_api}/${id}`);
    },
    getProductByName(name) {
        return axiosClient.get(`${branch_api}/${name}`);
    },
    getProductByBrand(category, brand) {
        return axiosClient.get(`${branch_api}/filter?category=${category}&brand=${brand}`);
    },
    getProductByCategoryBrandSex(category, brand, sex) {
        return axiosClient.get(`${branch_api}/filter?category=${category}&brand=${brand}&sex=${sex}`);
    },
    getProductByCategorySex(category, sex) {
        return axiosClient.get(`${branch_api}/filter?category=${category}&sex=${sex}`);
    },
    getProductByCategory(category) {
        return axiosClient.get(`${branch_api}/filter?category=${category}`);
    },
    getProductByPolicy(category, brand) {
        return axiosClient.get(`${branch_api}?category=${category}${brand}`);
    },
    getProductBySlug(slug) {
        return axiosClient.get(`${branch_api}/slug/${slug}`);
    },
    queryProduct() {
        const query = Array.from(arguments)
            .map((param) => {
                return `${param[0]}=${param[1]}`;
            })
            .join('&');
        return axiosClient.get(`${branch_api}?${query}`);
    },
    queryProductWatch(string) {
        const query = string.map((e) => {
                const key = Object.keys(e)
                const value = Object.values(e)
                return `${key[0]}=${value[0]}`;
            }).join('&');
        return axiosClient.get(`${branch_api}?category=watch&${query}`);
    },
    // queryProduct(["brand", "nokia"], ["title", "Nokia 500"])
    getArticle(id) {
        return axiosClient.get(`/product/article?productId=${id}`);
    },
    postProduct(data) {
        return axiosClient.post(`${branch_api}`,data);
    },
    putProduct(id, data) {
        return axiosClient.put(`${branch_api}/${id}`,data);
    },
    deleteProduct(id) {
        return axiosClient.delete(`${branch_api}/${id}`);
    },
};
