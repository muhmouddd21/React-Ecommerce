import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import  axiosErrorHandle  from "@utils/axiosErrorHandle";




const ThunkGetProductsByCatPrefix = createAsyncThunk("products/ThunkGetProductsByCatPrefix",
    async(prefix :string, thunkAPI)=>{
        const { signal } = thunkAPI;
    try {
        const response = await axios.get(`/products?cat_prefix=${prefix}`,{signal});
        return response.data;
    } catch (error) {
        return axiosErrorHandle(error);

    }
})
export default ThunkGetProductsByCatPrefix;