import { useState, useEffect } from 'react';
import styles from './home.module.scss';

import Ticket from './Ticket';


import ProductDeal from './ProductDeal';

import ProductSuggest from './ProductSuggest';
import ProductCategory from './ProductCategory';
import { Sticky } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DEFAULT_STORE } from '../../../utils';
import { getUserByAccess } from '../../../redux/user/userApi';
function Home({ title='' }) {
    const [displayTicket, setDisplayTicket] = useState(false);
    useEffect(() => {
        console.log(searchParams, searchParams.entries);
        const clearParamByGoogle = async () => {
            let token = searchParams.get(DEFAULT_STORE.TOKEN);
            localStorage.setItem(DEFAULT_STORE.TOKEN, JSON.stringify(token));
            console.log(token);
            getUserByAccess(dispatch, token)
        }
        if (searchParams) {
            if (searchParams.get(DEFAULT_STORE.TOKEN)) {;
                clearParamByGoogle();
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
