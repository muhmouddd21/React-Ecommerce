import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TProduct } from "src/Types/product";

const ThunkGetWishlist = createAsyncThunk('wishlish/ThunkGetWishlist',
    async(_,thunkApi)=>{
        const {fulfillWithValue,rejectWithValue}= thunkApi;


        try {
            const itemsIdOfUser = await axios.get<{productId:number}[]>(`/wishlist?userId=1`);
           
            
            if (!itemsIdOfUser.data.length) {
                return fulfillWithValue([]);
            }
            
            
            const concatenatedItemsId = itemsIdOfUser.data.map((itemId)=> `id=${itemId.productId}`).join('&');
 
            console.log(concatenatedItemsId);
            
            const response = await axios.get<TProduct[]>(
            `/products?${concatenatedItemsId}`
            );   
            return fulfillWithValue(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.message || error.message);
            } else {
                return rejectWithValue("An unexpected error");
            }
        }
    })


    export default ThunkGetWishlist;