import BoxSort from '~/components/BoxSort';
import ListProduct from '~/components/ListProduct';
import ProductCard from '~/components/ProductCard';
import { useState, useEffect } from 'react';
import './category.scss';
import { useSelector, useDispatch } from 'react-redux';
import {  getAllProductApi } from '../../../redux/product/productsApi';
import handleData from '../../../components/Filter/handleData';
const dataFake = [
    {
        title: 'Giảm giá',
        link: '',
        type: 'giamgia',
    },
    {
        title: 'Góp 0%',
        link: '',
        type: 'tragop',
    },
    {
        title: 'Mới',
        link: '',
        type: 'new',
    },
];
const dataSelected = [
    {
        id: 4,
        type: 'Nổi bật',
    },
    {
        id:3,
        type: '% Giảm giá cao',
    },
    {
        id:2,
        type: 'Giá cao đến thấp',
    },
    {
        id:1,
        type: 'Giá thấp đến cao',
    },

]
const ListProductCategory = (props) => {
    // const [data, setData] = useState([]);
    const [selected, setSelected] = useState(false);
    const [chose, setChose] = useState(0);
    const [checked, setChecked] = useState([]);

    const data = useSelector((state) => state.categories.oneCategory.data);
    const {content: products = [], page} = useSelector((state) => state.products.pageProduct.data);
    let dataFilter = products;
    const filter = useSelector((state) => state.products.filter.data);

    const dispatch = useDispatch();
    useEffect(() => {
        if (data.id) {
            getAllProductApi(dispatch, {categoryIds:[data.id]});
        }
    }, [data.id]);

    // console.log(data, dataFilter);


    let dataAfter = dataFilter;
    if (filter.length !== 0) {
        dataAfter = handleData(dataFilter, filter)
    }
    let typeFilter = checked.concat(props.chose);
    useEffect(() => {
        // const getProduct = async () => {
        //     let res = await productService.getProductByBrand('dienthoai',props.chose.toLowerCase())
        //     if (props.chose === '') {
        //         let res = await productService.getProductByPolicy(
        //             'category',
        //             checked.map((item) => '&' + item + '=true').join(''),
        //         );
        //         setData(res);
        //     } else if (props.chose !== '') {
        //         let res = await productService.getProductByBrand(
        //             'category',
        //             props.chose.toLowerCase() + checked.map((item) => '&' + item + '=true').join(''),
        //         );
        //         setData(res);
        //     }checked
        // };
        // getProduct();
        if (props.chose) {
            getAllProductApi(dispatch, data.id, props.chose);
        }
        
    }, [props.chose, checked]);
    const handleClick = (index) => {
        // setChose(index);
    };
    if (chose === 3) {
        dataFilter = dataFilter.sort((a, b) => a.price - b.price);
    } else if (chose === 2) {
        dataFilter = dataFilter.sort((a, b) => b.price - a.price);
    } else if (chose === 1) {
        dataFilter = dataFilter.sort((a, b) => b.discount - a.discount);
    }
    if (checked.includes('giamgia')) {
        dataFilter = dataFilter.filter((item) => item.discount !== 0);
    } else if (checked.includes('tragop')) {
        dataFilter = dataFilter.filter((item) => item.promotion === 'Trả góp 0%');
    }
    return (
        <>
            <BoxSort
                data={dataFake}
                onclick={handleClick}
                dataSelected={dataSelected}
                selected={selected}
                setSelected={setSelected}
                chose={chose}
                countProduct={props.isOpen === false ? dataFilter.length : dataAfter.length}
                title={props.chose}
                checked={checked}
                setChecked={setChecked}
                category={'Máy tính bảng'}
                
                >
            </BoxSort>
            <div className="category__content">
                <div className="listcontent">
                    {props.isOpen === false ? (
                        <ListProduct products={dataFilter} isSlide={false}></ListProduct>
                    ) : (
                        <ListProduct products={dataAfter} isSlide={false}></ListProduct>
                    )}
                </div>
            </div>
        </>
    );
};
export default ListProductCategory;
