import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ThunkAddRemoveWishlist =createAsyncThunk('wishlist/ThunkAddRemoveWishlist',
    async(id:number,thunkApi)=>{
        const {rejectWithValue,fulfillWithValue} = thunkApi;
        console.log("from thunk");
        
        try {
            const isRecordExist = await axios.get(`/wishlist?userId=1&productId=${id}`);
            console.log("from geeeeeeeeeeet");
            if(isRecordExist.data.length >0){
                await axios.delete(`/wishlist/${isRecordExist.data[0].id}`);
                return fulfillWithValue({ type: "remove", id });
            }else{
                console.log("from possssssssst");
                
                await axios.post("/wishlist",{userId:1,productId:id});
                return fulfillWithValue({ type: "add", id })
            }

        } catch (error) {
        if(axios.isAxiosError(error)){
            return rejectWithValue(error.response?.data?.message || error.message);     
        }else{
            return rejectWithValue("unExpected error");
        }
        }
})
export default ThunkAddRemoveWishlist;