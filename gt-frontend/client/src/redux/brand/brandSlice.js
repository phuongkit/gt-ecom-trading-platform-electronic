import { createSlice } from '@reduxjs/toolkit';

export const brands = createSlice({
    name: 'brands',
    initialState: {
        allBrand: {
            data: [],
        }
    },
    reducers: {
        getAllBrands: (state, action) => {
            state.allBrand.data = action.payload;
        }
    },
});
export const { getAllBrands } = brands.actions;
export default brands.reducer;