import { configureStore } from '@reduxjs/toolkit';



import userReducer from './user/userSlice';

import searchSlice from './search/searchSlice';

//khoi tao store
export const store = configureStore({
    reducer: {
        search: searchSlice,
        user: userReducer,
    },
});
