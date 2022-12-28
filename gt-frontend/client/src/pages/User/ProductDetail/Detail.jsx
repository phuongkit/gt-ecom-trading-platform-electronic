import ProductBody from "./ProductBody";
import ProductImg from "./ProductImg";
import './productdetails.scss'
import { useEffect } from 'react';

import ProductHistory from '~/components/ProductHistory';
import ProductRating from '~/components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useLocation } from 'react-router-dom';
import { getProductDetailApi } from '~/redux/product/productsApi';
function Detail() {
    const dispatch = useDispatch()
    const { productSlug } = useParams();
    // const dispatch = useDispatch();
    useEffect(() => {
        getProductDetailApi(dispatch, productSlug);
    }, []);
    const initProductDetail = useSelector((state) => state.products.productDetail.data);
  
    return ( 
        <div style={{width: '86%', maxWidth: '1240px', margin: '50px auto'}}>
            {/* Product is here */}
            <ProductImg item={initProductDetail}></ProductImg>
            {/* Product detail is here */}
            <ProductBody></ProductBody>
            {/* <ProductHistory/> */}
        </div>
     );
}

export default Detail;