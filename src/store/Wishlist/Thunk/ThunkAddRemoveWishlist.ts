import { createAsyncThunk } from "@reduxjs/toolkit";
import  axiosErrorHandle  from "@utils/axiosErrorHandle";
import { RootState } from "@store/index";
import api from "@services/axios-global";


const ThunkAddRemoveWishlist =createAsyncThunk('wishlist/ThunkAddRemoveWishlist',
    async(id:number,thunkApi)=>{
        const {fulfillWithValue,getState} = thunkApi;
        const {AuthSlice}=getState() as RootState
        
        try {
            const isRecordExist = await api.get(`/wishlist?userId=${AuthSlice.user?.id}&productId=${id}`);
            
            if(isRecordExist.data.length >0){
                await api.delete(`/wishlist/${isRecordExist.data[0].productId}`);
                return fulfillWithValue({ type: "remove", id });
            }else{

                
                await api.post("/wishlist",{userId:AuthSlice.user?.id,productId:id});
                return fulfillWithValue({ type: "add", id })
            }

        } catch (error) {
            return axiosErrorHandle(error);
        }
})
export default ThunkAddRemoveWishlist;