import { configureStore } from "@reduxjs/toolkit";
import productListSlice from "../Reduct-Slice/HomeProductList";
import cartSlice from "../Reduct-Slice/CartSlice";

const store = configureStore({
    reducer:{
        productList: productListSlice.reducer,
        cartList: cartSlice.reducer

    }
});
export default store;