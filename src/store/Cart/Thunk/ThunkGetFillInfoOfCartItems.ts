import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axios from "axios";
import { TProduct } from "src/Types/product";
import  axiosErrorHandle  from "@utils/axiosErrorHandle";

const ThunkGetFillInfoOfCartItems = createAsyncThunk("cart/ThunkGetFillInfoOfCartItems",
    async(_, thunkAPI)=>{
        const {fulfillWithValue ,getState,signal} = thunkAPI;
        const { cartSlice } = getState() as RootState;
        const itemsId = Object.keys(cartSlice.items);

        if (!itemsId.length) {
            return fulfillWithValue([]);
        }
    try {
        
        const concatenatedItemsId = itemsId.map((el)=> `id=${el}`).join("&");
        const response = await axios.get<TProduct[]>(`/products?${concatenatedItemsId}`,{signal});
        return response.data;

    } catch (error) {
        axiosErrorHandle(error);
    }
})
export default ThunkGetFillInfoOfCartItems;