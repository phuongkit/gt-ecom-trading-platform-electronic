import { configureStore } from '@reduxjs/toolkit';



import userReducer from './user/userSlice';
import categoryReducer from './category/categoriesSlice';
import searchSlice from './search/searchSlice';
import rateReducer from './rate/ratesSlice';
import productReducer from './product/productsSlice';
import cartItemsReducer from './shopping-cart/cartItemsSlide';
import orderSlice from './order/orderSlice';
import historyOrdersSlice from './history/historyOrdersSlice';
import discountReducer from './discount/discountsSlice';
import brandReducer from './brand/brandSlice';
//khoi tao store
export const store = configureStore({
    reducer: {
        search: searchSlice,
        user: userReducer,
        categories: categoryReducer,
        cartItems: cartItemsReducer,
        products: productReducer,
        rates: rateReducer,
        orders: orderSlice,
        historyOrders: historyOrdersSlice,
        discounts: discountReducer,
        brands: brandReducer,
    },
});
