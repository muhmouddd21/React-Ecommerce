import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TProduct } from "src/Types/product";
import  axiosErrorHandle  from "@utils/axiosErrorHandle";
import { RootState } from '@store/index';


type TDataType ={
    dataType: "productsId" | "productsFullInfo" 
}


const ThunkGetWishlist = createAsyncThunk('wishlish/ThunkGetWishlist',
    async({dataType}:TDataType,thunkApi)=>{
        const {fulfillWithValue,signal,getState}= thunkApi;
        const {AuthSlice}=getState()as RootState 

        

        try {
            const itemsIdOfUser = await axios.get<{productId:number}[]>(
                `/wishlist?userId=${AuthSlice.user?.id}`
                ,{signal});
           
            if (!itemsIdOfUser.data.length) {
                return fulfillWithValue({data:[], dataType:"empty"});
            }
            
            if(dataType === "productsId"){
                const concatenatedItemsId = itemsIdOfUser.data.map((itemId)=> itemId.productId);
                return fulfillWithValue({data:concatenatedItemsId,dataType:"productsId"});
            }else{
            const concatenatedItemsId = itemsIdOfUser.data.map((itemId)=> `productId=${itemId.productId}`).join('&');

            const response = await axios.get<TProduct[]>(
            `/products?${concatenatedItemsId}`
            );   
            return fulfillWithValue({data:response.data,dataType:"productsFullInfo"})
            }
 
        

        } catch (error) {
            return axiosErrorHandle(error);
        }
    })


    export default ThunkGetWishlist;