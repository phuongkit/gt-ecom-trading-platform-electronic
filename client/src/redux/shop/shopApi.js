
import { shopService } from '../../services';
import { getOneShop } from './shopSlice';

export const getShopBySlugApi = async (dispatch, slug) => {
    try {
        const res = await shopService.getShopBySlug(slug)
        dispatch(getOneShop(res.data));
    } catch (err) {
        console.erorr(err);
    }
}

export const PostRegisterShop = async (dispatch, data, Navigate) => {
    try {
        let res = await shopService.postShopApi(data);
        localStorage.setItem('access',JSON.stringify(res.data.accessToken))
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



