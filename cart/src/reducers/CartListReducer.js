import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react';

export const cartListSlice = createSlice({
    name: 'cartlist',
    initialState: {
        items: {
        },
        total_price: 0,
        discount: {
        },
        total_discount: 0
    },
    reducers: {
        addToCart: (state, action) => {
            state.items[action.payload] = 1;

        },
        removeFromCart: (state, action) => {
            delete state.items[action.payload];
        },
        increaseQuantity: (state, action) => {
            state.items[action.payload.id] += 1;
            state.total_price += Number(action.payload.price);
            const discount = state.discount[action.payload.id];
            const discount_amount = Number(discount)*Number(action.payload.price)/100;
            state.total_discount += discount_amount;
        },
        decreaseQuantity: (state, action) => {
            if (state.items[action.payload.id] > 1) {
                state.items[action.payload.id] -= 1;
                state.total_price -= Number(action.payload.price);
                const discount = state.discount[action.payload.id];
                const discount_amount = Number(discount)*Number(action.payload.price)/100;
                state.total_discount -= discount_amount;
            }
            else {
                delete state.items[action.payload.id];
                state.total_price -= Number(action.payload.price);
                const discount = state.discount[action.payload.id];
                const discount_amount = Number(discount)*Number(action.payload.price)/100;
                state.total_discount -= discount_amount;
            }
        },
        changeQuantity: (state, action) => {
            state.items[action.payload.id] = Number(action.payload.value);
        },
        calculateTotal: (state, action) => {
            state.total_price += Number(action.payload);
        },
        calculateIntialDiscount : (state,action) => {
            const discount = action.payload.dis_value;
            const discount_amount = Number(discount)*Number(action.payload.price)/100;
            state.total_discount += discount_amount;
        },
        addDiscount: (state, action) => {
            state.discount[action.payload.productId] = action.payload.value;
        }
    }
})

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, changeQuantity, calculateTotal, addDiscount,calculateIntialDiscount } = cartListSlice.actions

export default cartListSlice.reducer