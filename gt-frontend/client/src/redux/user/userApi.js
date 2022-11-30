import { Link, Navigate, resolvePath } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import {userService} from '../../services/user.service'
import { login,logout } from './userSlice';
export const PostLogin = async (dispatch, data, Navigate) => {

    try {
        let res = await authService.postLogin(data);
        console.log(res.data)
        localStorage.setItem('access',JSON.stringify(res.data.accessToken))
        delete res?.data?.accessToken;
        localStorage.setItem('customerInfo', JSON.stringify(res?.data));
        if(res.data.role===2){
            Navigate('/')
        }else if(res.data.role===0){
            Navigate('/Admin')
        }else{
            Navigate('/Seller')
        }
        dispatch(login(res.data));
    } catch (error) {
        console.error(error)
    }
};
export const PostRegister = async (dispatch, data, Navigate) => {
    try {
        let res = await authService.postRegister(data);
        console.log(res.data)
        localStorage.setItem('access',JSON.stringify(res.data.accessToken))
        if(res.data.role===2){
            Navigate('/')
        }else if(res.data.role===0){
            Navigate('/Admin')
        }else{
            Navigate('/Seller')
        }
        dispatch(login(res.data));
    } catch (error) {
        console.error(error)
    }
    
};
export const getUserByAccess = async (dispatch) => {
    try {
        let res = await userService.getUserByAccess(); 
        console.log(res);
        if (res.status === 'OK') {
            dispatch(login(res.data));
        } else {
            dispatch(login(null))
            handleLogout();
        }
    } catch (error) {
        console.error(error)
    }
};
export const logUserByAccess = async (dispatch) => {
    try {
        dispatch(logout());
        localStorage.removeItem('access');
    } catch (error) {
        console.error(error)
    }
};

export const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('customerInfo');
}
