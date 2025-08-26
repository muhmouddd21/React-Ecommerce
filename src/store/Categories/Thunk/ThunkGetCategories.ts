import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";




const ThunkGetCategories = createAsyncThunk("categories/ThunkGetCategories",
    async(_, thunkAPI)=>{
        const { rejectWithValue } = thunkAPI;
    try {
        const response = await axios.get("/categories");
        return response.data;
    } catch (error) {
        if(axios.isAxiosError(error)){
            return rejectWithValue(error.response?.data?.message || error.message);     
        }else{
            rejectWithValue("unExpected error");
        }

    }
})
export default ThunkGetCategories;