import { createAsyncThunk } from "@reduxjs/toolkit";
import  axiosErrorHandle  from "@utils/axiosErrorHandle";
import api from "@services/axios-global";




const ThunkGetProductsByCatPrefix = createAsyncThunk("products/ThunkGetProductsByCatPrefix",
    async(prefix :string, thunkAPI)=>{
        const { signal } = thunkAPI;
    try {
        const response = await api.get(`/products?cat_prefix=${prefix}`,{signal});
        return response.data;
    } catch (error) {
        return axiosErrorHandle(error);

    }
})
export default ThunkGetProductsByCatPrefix;