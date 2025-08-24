import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";




const ThunkGetProductsByCatPrefix = createAsyncThunk("products/ThunkGetProductsByCatPrefix",
    async(prefix :string, thunkAPI)=>{
        const { rejectWithValue } = thunkAPI;
    try {
        const response = await axios.get(`http://localhost:5005/products?cat_prefix=${prefix}`);
        return response.data;
    } catch (error) {
        if(axios.isAxiosError(error)){
            return rejectWithValue(error.response?.data?.message || error.message);     
        }else{
            rejectWithValue("unExpected error");
        }

    }
})
export default ThunkGetProductsByCatPrefix;