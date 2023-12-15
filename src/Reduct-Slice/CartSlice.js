import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {url} from "../Url/Url.js";
const cartSlice = createSlice({
    name: "cartList",
    initialState: {
        status: "idle",
        cartList: []
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartThunkAction.pending, (state, action) => {
                state.status = "loadding"
            })
            .addCase(fetchCartThunkAction.fulfilled, (state, action) => {
                state.status = "idle";
                state.cartList = action.payload
            })
            .addCase(fetchCartDownThunkAction.fulfilled, (state, action) => {
                state.cartList = action.payload
            })
            .addCase(fetchCartDeleteThunkAction.fulfilled, (state, action) => {
                state.cartList = action.payload
            })
            .addCase(fetchCartUpThunkAction.fulfilled, (state, action) => {
                state.cartList = action.payload
            })     
    }
});

export const fetchCartThunkAction = createAsyncThunk("cartList/getData",
    async (id) => {
            const data = await axios.get(`${url}api/Carts/${id}`);
            return data.data;
    }
);
export const fetchCartDownThunkAction = createAsyncThunk("cartList/cartProductDown",
    async ({productId,customerId}) => {
            await axios.delete(`${url}api/Carts/down`,{
                data:{
                    "customerId": customerId,
                    "productId": productId,
                    "quantity": 1
                }
            });
            const data = await axios.get(`${url}api/Carts/${customerId}`);
            return data.data;
    }
);
export const fetchCartUpThunkAction = createAsyncThunk("cartList/cartProductUp",
    async ({productId,customerId}) => {
            await axios.post(`${url}api/Carts/up`,{
                    "customerId": customerId,
                    "productId": productId,
                    "quantity": 1
            });
            const data = await axios.get(`${url}api/Carts/${customerId}`);
            return data.data;
    }
);
export const fetchCartDeleteThunkAction = createAsyncThunk("cartList/cartProductDelete",
    async ({productId,customerId}) => {
            await axios.delete(`${url}api/Carts`,{
                data:{
                    "customerId": customerId,
                    "productId": productId,
                    "quantity": 1
                }
            });
            const data = await axios.get(`${url}api/Carts/${customerId}`);
            return data.data;
    }
);
export default cartSlice;