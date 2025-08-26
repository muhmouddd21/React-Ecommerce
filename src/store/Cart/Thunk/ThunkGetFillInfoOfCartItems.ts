import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axios from "axios";
import { TProduct } from "src/Types/product";

const ThunkGetFillInfoOfCartItems = createAsyncThunk("categories/ThunkGetCategories",
    async(_, thunkAPI)=>{
        const { rejectWithValue, fulfillWithValue ,getState} = thunkAPI;
        const { cartSlice } = getState() as RootState;
        const itemsId = Object.keys(cartSlice.items);

        if (!itemsId.length) {
            return fulfillWithValue([]);
        }
    try {
        const concatenatedItemsId = itemsId.map((el)=> `id=${el})`).join("&");
        const response = await axios.get<TProduct>(`/products?${concatenatedItemsId}`);
        return response.data;

    } catch (error) {

        if(axios.isAxiosError(error)){
            return rejectWithValue(error.response?.data?.message || error.message);     
        }else{
            rejectWithValue("unExpected error");
        }

    }
})
export default ThunkGetFillInfoOfCartItems;