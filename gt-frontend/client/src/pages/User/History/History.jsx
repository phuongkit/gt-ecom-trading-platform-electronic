import { useEffect } from 'react';
import PurchaseHistory from './PurchaseHistory';
import SingInForm from '../../../components/SingInForm';
import { useDispatch } from 'react-redux';
import { getHistoryOrderbyUserIds } from '~/redux/history/historyOrdersApi';
import Info from './Info';
import { DEFAULT_STORE } from '../../../utils';
const History = () => {
    let customer = JSON.parse(localStorage.getItem(DEFAULT_STORE.USER_INFO));

   
    const dispatch = useDispatch();
    useEffect(() => {
        if(customer){
            let userId = customer.id;
            getHistoryOrderbyUserIds(dispatch, userId);
        }   
    }, []);

    return <div>{customer ? <Info /> : <SingInForm />}</div>;
};
export default History;
