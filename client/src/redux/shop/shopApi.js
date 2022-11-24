
import { registerShopService } from '../../services/shop.service';


export const PostRegisterShop = async (dispatch, data, Navigate) => {
    try {
        let res = await registerShopService.postShopApi(data);
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



