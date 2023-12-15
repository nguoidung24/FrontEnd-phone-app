import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {url} from "../Url/Url.js"
const productListSlice = createSlice({
    name: "productList",
    initialState:{
        status: "idle",
        products: []
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchProductThunkAction.pending,(state, action)=>{
            state.status = "loadding";
            })
            .addCase(fetchProductThunkAction.fulfilled,(state, action)=>{
            state.status = "idle";
            state.products = action.payload
            })
            .addCase(fetchProductHotThunkAction.pending,(state, action)=>{
                state.status = "loadding";
            })
            .addCase(fetchProductHotThunkAction.fulfilled,(state, action)=>{
            state.status = "idle";
            state.products = action.payload
            })
            .addCase(fetchProductDiscountThunkAction.pending,(state, action)=>{
                state.status = "loadding";
            })
            .addCase(fetchProductDiscountThunkAction.fulfilled,(state, action)=>{
            state.status = "idle";
            state.products = action.payload
            })
            .addCase(fetchProductBrandThunkAction.pending,(state, action)=>{
                state.status = "loadding";
            })
            .addCase(fetchProductBrandThunkAction.fulfilled,(state, action)=>{
            state.status = "idle";
            state.products = action.payload
            })
            .addCase(fetchProductTypeThunkAction.pending,(state, action)=>{
                state.status = "loadding";
            })
            .addCase(fetchProductTypeThunkAction.fulfilled,(state, action)=>{
            state.status = "idle";
            state.products = action.payload
            })
            .addCase(fetchProductSearchThunkAction.pending,(state, action)=>{
                state.status = "loadding";
            })
            .addCase(fetchProductSearchThunkAction.fulfilled,(state, action)=>{
            state.status = "idle";
            state.products = action.payload
            })
    }
});
export const fetchProductThunkAction = createAsyncThunk("productList/getALL",
    async () => {
        const data = await axios.get(`${url}api/Products?pageIndex=1&pageSize=10`);
        return data.data;
})
export const fetchProductHotThunkAction = createAsyncThunk("productList/getHotProduct",
    async () => {
        const data = await axios.get(`${url}api/Products/hot`);
        return data.data;
})
export const fetchProductDiscountThunkAction = createAsyncThunk("productList/getDiscountProduct",
    async () => {
        const data = await axios.get(`${url}api/Products/discount?pageIndex=1&pageSize=10`);
        return data.data;
})
export const fetchProductBrandThunkAction = createAsyncThunk("productList/getDiscountBrand",
    async ({id, filterPriceState, filterSortState}) => {
        //api/Products/brand/1?pageIndex=1&pageSize=2&filterSort=1&filterPrice=1
        const data = await axios.get(`${url}api/Products/brand/${id}?pageIndex=1&pageSize=10&filterSort=${filterSortState}&filterPrice=${filterPriceState}`);
        return data.data;
})
export const fetchProductTypeThunkAction = createAsyncThunk("productList/getDiscountType",
    async ({id, filterPriceState, filterSortState}) => {
        //api/Products/type/1?pageIndex=1&pageSize=2&filterSort=0&filterPrice=0
        const data = await axios.get(`${url}api/Products/type/${id}?pageIndex=1&pageSize=10&filterSort=${filterSortState}&filterPrice=${filterPriceState}`);
        return data.data;
})
export const fetchProductSearchThunkAction = createAsyncThunk("productList/getProductSearch",
    async ({query, filterPriceState , filterSortState }) => {
        //api/Products/search?query=15&pageIndex=1&pageSize=2&filterSort=1&filterPrice=1
        const data = await axios.get(`${url}api/Products/search?query=${query}&pageIndex=1&pageSize=10&filterSort=${filterSortState}&filterPrice=${filterPriceState}`);
        return data.data;
})
export default productListSlice;