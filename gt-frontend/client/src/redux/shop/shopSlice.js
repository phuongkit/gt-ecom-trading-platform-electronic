import { createSlice } from '@reduxjs/toolkit';

export const shops = createSlice({
    name: 'shops',
    initialState: {
        oneShop: {
            data: '',
        },
        overviewShop: {
            data: '',
        },
    },
    reducers: {
        getOneShop: (state, action) => {
            state.oneShop.data = action.payload;
        },
        getOverviewShop: (state, action) => {
            state.overviewShop.data = action.payload;
        },
    },
});
export const {
    getOneShop,
    getOverviewShop
} = shops.actions;

export default shops.reducer;