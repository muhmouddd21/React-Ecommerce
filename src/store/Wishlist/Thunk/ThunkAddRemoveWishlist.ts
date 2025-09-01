import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import  axiosErrorHandle  from "@utils/axiosErrorHandle";

const ThunkAddRemoveWishlist =createAsyncThunk('wishlist/ThunkAddRemoveWishlist',
    async(id:number,thunkApi)=>{
        const {fulfillWithValue} = thunkApi;

        
        try {
            const isRecordExist = await axios.get(`/wishlist?userId=1&productId=${id}`);
            
            if(isRecordExist.data.length >0){
                await axios.delete(`/wishlist/${isRecordExist.data[0].productId}`);
                return fulfillWithValue({ type: "remove", id });
            }else{

                
                await axios.post("/wishlist",{userId:1,productId:id});
                return fulfillWithValue({ type: "add", id })
            }

        } catch (error) {
            return axiosErrorHandle(error);
        }
})
export default ThunkAddRemoveWishlist;