
import { shopService } from '../../services';
import { DEFAULT_STORE } from '../../utils';
import { getOneShop, getOverviewShop,getViewShop } from './shopSlice';

export const getShopBySlugApi = async (dispatch, slug) => {
    try {
        const res = await shopService.getShopBySlug(slug)
        dispatch(getOneShop(res.data));
    } catch (err) {
        console.error(err);
    }
}

export const PostRegisterShop = async (dispatch, data, Navigate) => {
    try {
        let res = await shopService.postShopApi(data);
        localStorage.setItem(DEFAULT_STORE.TOKEN,JSON.stringify(res.data.accessToken))
        // if(res.data.role===2){
        //     Navigate('/')
        // }else if(res.data.role===0){
        //     Navigate('/Admin')
        // }else{
        //     Navigate('/Seller')
        // }
        // dispatch(login(res.data));
    } catch (error) {
        console.error(error)
    }
    
};

export const getOverviewByShopIdApi = async(dispatch, shopId) => {
    try {
        const res = await shopService.getOverviewById(shopId)
        dispatch(getOverviewShop(res.data));
    } catch (err) {
        console.error(err);
    }
}

export const getByShopId = async(dispatch, shopId) => {
    try {
        const res = await shopService.getShopById(shopId)
        dispatch(getViewShop(res.data));
    } catch (err) {
        console.error(err);
    }
}



