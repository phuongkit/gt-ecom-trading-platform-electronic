import { getAllCategories, getOneCategory } from './categoriesSlice';
import { getAllProductApi} from '../product/productsApi';
import { categoryService } from '~/services';

export const getAllCategoriesApi = async (dispatch) => {
    let res = await categoryService.getAllCategories();
    dispatch(getAllCategories(res.data));
};
export const getOneCategoryBySlugApi = async (dispatch, slug) => {
    let res =  await categoryService.getCategoryBySlug(slug);
    // let resBrand = await brandService.getAllBrandsByCategoryId(res.data?.id);
    dispatch(getOneCategory({...res.data, brands: resBrand.data}));
};