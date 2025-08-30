import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosErrorHandle } from "src/utils";




const ThunkGetCategories = createAsyncThunk("categories/ThunkGetCategories",
    async(_, thunkAPI)=>{
        const { signal} = thunkAPI;
    try {
        const response = await axios.get("/categories",{signal});
        return response.data;
    } catch (error) {
        return axiosErrorHandle(error);

    }
})
export default ThunkGetCategories;