import { createSlice } from '@reduxjs/toolkit';

export const discounts = createSlice({
    name: 'discounts',
    initialState: {
        allDiscounts: {
            data: [],
        },
        checkoutDiscounts: {
            data: [],
        }
    },
    reducers: {
        getAllDiscounts: (state, action) => {
            state.allDiscounts.data = action.payload || [];
        },
        updateAllCheckoutDiscount: (state, action) => {
            state.checkoutDiscounts.data = action.payload || [];
        },
        addCheckoutDiscount: (state, action) => {
            const newItem = action.payload;
            const duplicate = state.checkoutDiscounts.data.filter(
                (e) => e.id === newItem.id
            );
            if (duplicate.length > 0) {
                state.checkoutDiscounts.data = state.checkoutDiscounts.data.filter(
                    (e) => e.id !== newItem.id
                );

                state.checkoutDiscounts.data = [
                    ...state.checkoutDiscounts.data,
                    newItem
                ];
            } else {
                state.checkoutDiscounts.data = [
                    ...state.checkoutDiscounts.data,
                    {
                        ...action.payload,
                    },
                ];
            }
        },
        deleteCheckoutDiscount: (state, action) => {
            const item = action.payload;
            state.checkoutDiscounts.data = state.checkoutDiscounts.data.filter(
                (e) => e.id !== item.id,
            );
        },
        clearCheckoutDiscount: (state, action) => {
            state.checkoutDiscounts.data = [];
        },
    },
});
export const {
    getAllDiscounts,
    updateAllCheckoutDiscount,
    addCheckoutDiscount,
    clearCheckoutDiscount,
} = discounts.actions;

export default discounts.reducer;
