import {  productService } from '../../services';

import {
    getAllProducts,
    getPageProduct,
    getPageProductShop,
    getOneProduct,
    handleFilter,
    // getLocationProduct,
    getProductDetail,
    updateAllProduct,
} from './productsSlice';

export const HandleFilter = async (dispatch, data) => {
    dispatch(handleFilter(data));
};

export const updateAllProducts = async (dispatch, data) => {
    dispatch(updateAllProduct(data));
};

export const getAllProductByCategory = async (dispatch, category) => {
    let res = await productService.getProductByCategory(category);
    dispatch(getAllProducts(res.data));
};

export const getAllProductApi = async (dispatch, params) => {
    let res = await productService.getProducts(params);
    if (params.hasOwnProperty('shopId')) {
        dispatch(getPageProductShop(res.data));
    } else {
        dispatch(getPageProduct(res.data));
    }
};

export const getProductDetailApi = async (dispatch, slug) => {
    let res = await productService.getProductBySlug(slug);
    // let resRating = await ratingService.getRating(res.data.id);
    console.log({ ...res.data, rating: res.data.Rating })
    dispatch(getProductDetail({ ...res.data, rating: res.data.Rating }));
};

export const getProductByIdApi = async (dispatch, id) => {
    let res = await productService.getProductById(id);
    dispatch(getOneProduct(res.data));
}

////

export const createProduct = async (product, dispatch, navigate, productList) => {
    try {
        const res = await productService.postProduct(product);
        let products = {...productList};
        products.content = products?.content || [];
        products.content = Array.from(products.content).push(res.data);
        dispatch(getPageProduct(products));
        navigate('/seller/products');
    } catch (err) {
        console.error(err?.message);
    }
};

export const updateProduct = async (id, product, dispatch, navigate, productList) => {
    try {
        const res = await productService.putProduct(id, product);
        let products = {...productList};
        products.content = products?.content || [];
        products.content = Array.from(products.content).map((item) => (item.id === res.data.id ? res.data : item));
        dispatch(getPageProduct(products));
        navigate('/seller/products');
    } catch (err) {
        console.error(err?.message);
    }
};

export const deleteProduct = async (id, dispatch, navigate, productList) => {
    try {
        const res = await productService.deleteProduct(id);
        let products = {...productList};
        console.log(products);
        products.content = products?.content || [];
        products.content = Array.from(products.content).filter(item => item.id !== id);
        dispatch(getPageProduct(products));
        navigate('/seller/products');
    } catch (err) {
        console.error(err?.message);
    }
};
