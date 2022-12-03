// import orderReducer from './order/ordersSlice';
import showModalSlice from './modal/showModalSlice';
import { configureStore} from '@reduxjs/toolkit';
import orderSlice from './order/ordersSlice';
import productSlice from './product/productsSlice';
//khoi tao store
export const store = configureStore({
    reducer: {   
        orders: orderSlice,
        products: productSlice,
        modal:showModalSlice
    },
});
