import { createSlice } from '@reduxjs/toolkit';

export const shops = createSlice({
    name: 'shops',
    initialState: {
        oneShop: {
            data: '',
        },
    },
    reducers: {
        getOneShop: (state, action) => {
            state.oneShop.data = action.payload;
        },
    },
});
export const {
    getOneShop,
} = shops.actions;

export default shops.reducer;