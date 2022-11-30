import { createSlice } from '@reduxjs/toolkit';

export const discounts = createSlice({
    name: 'discounts',
    initialState: {
        allDiscounts: {
            data: [],
        },
        checkoutDiscounts: {
            data: [],
        },
        allDiscountsUser:{
            data: [],
        }
    },
    reducers: {
        getAllDiscounts: (state, action) => {
            state.allDiscounts.data = action.payload;
        },
        getAllDiscountsUser: (state, action) => {
            state.allDiscountsUser.data = action.payload;
        },
        savetDiscountsUser: (state, action) => {
            const newItem = action.payload
            const duplicatie = state.allDiscountsUser.data.filter(item=> item.id===newItem.id)
            if(duplicatie.length>0){
                state.allDiscountsUser.data= state.allDiscountsUser.data.filter(item=>item.id!==newItem.id)
                state.allDiscountsUser.data=[...state.allDiscountsUser.data,newItem]
            }else{
                state.allDiscountsUser.data=[...state.allDiscountsUser.data,{...action.payload}]
            }
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
                state.allDiscounts.data = [...state.allDiscounts.data, action.payload];
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
    savetDiscountsUser,
    getAllDiscountsUser
} = discounts.actions;

export default discounts.reducer;
