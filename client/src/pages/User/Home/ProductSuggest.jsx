import { useState, useEffect } from 'react';
import ProductCard from '~/components/ProductCard';
import Section from './Section';
import { getAllProductApi } from '../../../redux/product/productsApi';
import { useDispatch, useSelector } from 'react-redux';
function ProductSuggest() {
    const [product, setProducts] = useState([]);
    const [limit, setLimit] = useState(10);
    // const [province,setProvince] =useState()
    const dispatch = useDispatch();
    const number = 25;
    const {content: products = [], page} = useSelector((state) => state.products?.pageProduct?.data)||[];
    const handleClick = () => {
        setLimit(number);
    };
    // products = products.slice(0,limit)
    return (
        <Section title="SẢN PHẨM MỚI" styles="bg-white">
            <>
                <div className="flex flex-wrap gap-8 w-full">
                    {products && products.map((product) => {
                        return <ProductCard key={product.title} {...product} />;
                    })}
                    <div className="w-full">
                        {limit != number && (
                            <button
                                className="m-auto block bg-white rounded-lg px-56 py-4 border outline-none"
                                onClick={handleClick}
                            >
                                {'Xem thêm'}
                            </button>
                        )}
                    </div>
                </div>
            </>
        </Section>
    );
}

export default ProductSuggest;
