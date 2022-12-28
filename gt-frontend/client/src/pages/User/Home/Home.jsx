import { useState, useEffect } from 'react';
import styles from './home.module.scss';

import Ticket from './Ticket';


import ProductDeal from './ProductDeal';

import ProductSuggest from './ProductSuggest';
import ProductCategory from './ProductCategory';
import { Sticky } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DEFAULT_STORE, parseQueryString } from '../../../utils';
import { getUserByAccess } from '../../../redux/user/userApi';
import swal from 'sweetalert';
import { vnpay } from '../../../services/payment';

function Home({ title='' }) {
    const [displayTicket, setDisplayTicket] = useState(false);
    useEffect(() => {
        const clearParamByVNPay = async () => {
            if (searchParams && searchParams.get('vnp_ResponseCode')) {
                const params = [];

                for (let entry of searchParams.entries()) {
                    params.push(entry);
                }
                const param = params.map(([key, value]) => ({ key, value }));
                let status = param.find(({ key, value }) => key === 'vnp_ResponseCode');
                if (status?.value === '00') {
                    swal({
                        title: 'Thành công',
                        text: 'Giao dịch thành công',
                        icon: 'success',
                    });
                } else {
                    swal({
                        title: 'Thất bại',
                        text: 'Giao dịch thất bại, vui lòng kiểm tra lại',
                        icon: 'error',
                    });
                }
                await vnpay.getReturnVNPay(param);
            }
        };
        const clearParamByGoogle = async () => {
            let token = searchParams.get(DEFAULT_STORE.TOKEN) || param[DEFAULT_STORE.TOKEN];
            localStorage.setItem(DEFAULT_STORE.TOKEN, JSON.stringify(token));
            getUserByAccess(dispatch, token)
        }

        let param = parseQueryString(window.location.search);
        if (searchParams || param) {
            if (searchParams.get('vnp_ResponseCode') || param['vnp_ResponseCode']) {
                clearParamByVNPay(searchParams.get('vnp_ResponseCode') || param['vnp_ResponseCode']);
                window.location.search = '';
            } else if (searchParams.get(DEFAULT_STORE.TOKEN) || param[DEFAULT_STORE.TOKEN]) {
                clearParamByGoogle();
                swal({text: 'Đăng nhập với google thành công!', icon: 'success'}).then(() => {
                    if (param[DEFAULT_STORE.TOKEN]) {
                        window.location.search = '';
                    }
                })
            }
            navigate('/');
        }
        document.title = title;
        const handleScroll = (event) => {
            setDisplayTicket(window.scrollY > 500);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, []);
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    // useEffect(() => {
        
    // }, []);
    return (
        <>
            <div>
                <main className={styles.main}>
                    <ProductCategory />
                    <Ticket show={displayTicket} />
                    <ProductSuggest />
                    <ProductDeal />
                </main>
            </div>
        </>
    );
}
export default Home;
