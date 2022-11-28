import { discountService } from '../../services';

import {
} from './discountsSlice';


export const getAllDiscountByShopId= async (dispatch, shopId) => {
    let res = await discountService.getDiscountByShop(category);
    dispatch(getAllDiscounts(res.data));
};

export const getAllDiscountApi = async (dispatch, params) => {
    let res = await discountService.getDiscounts(params);
    dispatch(getPageDiscount(res.data));
};


export const getDiscountByIdApi = async (dispatch, id) => {
    let res = await discountService.getDiscountById(id);
    dispatch(getOneDiscount(res.data));
}

export const checkDiscountCodeApi = async (dispatch, code) => {
    let res = await discountService.checkDiscountCode(code);
    dispatch(getOneDiscount(res.data));
}

// export const createDiscount = async (Discount, dispatch, navigate, DiscountList) => {
//     try {
//         const res = await discountService.postDiscount(Discount);
//         let Discounts = {...DiscountList};
//         Discounts.content = Discounts?.content || [];
//         Discounts.content = Array.from(Discounts.content).push(res.data);
//         dispatch(getPageDiscount(Discounts));
//         navigate('/seller/Discounts');
//     } catch (err) {
//         console.error(err?.message);
//     }
// };

// export const updateDiscount = async (id, Discount, dispatch, navigate, DiscountList) => {
//     try {
//         const res = await discountService.putDiscount(id, Discount);
//         let Discounts = {...DiscountList};
//         Discounts.content = Discounts?.content || [];
//         Discounts.content = Array.from(Discounts.content).map((item) => (item.id === res.data.id ? res.data : item));
//         dispatch(getPageDiscount(Discounts));
//         navigate('/seller/Discounts');
//     } catch (err) {
//         console.error(err?.message);
//     }
// };

// export const deleteDiscount = async (id, dispatch, navigate, DiscountList) => {
//     try {
//         const res = await discountService.deleteDiscount(id);
//         let Discounts = {...DiscountList};
//         console.log(Discounts);
//         Discounts.content = Discounts?.content || [];
//         Discounts.content = Array.from(Discounts.content).filter(item => item.id !== id);
//         dispatch(getPageDiscount(Discounts));
//         navigate('/seller/Discounts');
//     } catch (err) {
//         console.error(err?.message);
//     }
// };