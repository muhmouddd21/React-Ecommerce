import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TProduct } from "src/Types/product";
import  axiosErrorHandle  from "@utils/axiosErrorHandle";

const ThunkGetWishlist = createAsyncThunk('wishlish/ThunkGetWishlist',
    async(_,thunkApi)=>{
        const {fulfillWithValue,signal}= thunkApi;


        try {
            const itemsIdOfUser = await axios.get<{productId:number}[]>(`/wishlist?userId=1`,{signal});
           
            
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
            return axiosErrorHandle(error);
        }
    })


    export default ThunkGetWishlist;