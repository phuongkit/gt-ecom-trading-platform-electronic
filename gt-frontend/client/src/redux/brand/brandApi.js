import { getAllBrands } from './brandSlice';
import {  brandService } from '../../services';

export const getAllBrandApi = async (dispatch) => {
    let res = await brandService.getAllBrands()
    dispatch(getAllBrands(res.data));
};
