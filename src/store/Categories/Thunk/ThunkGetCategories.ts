import { createAsyncThunk } from "@reduxjs/toolkit";
import  axiosErrorHandle  from "@utils/axiosErrorHandle";
import api from "@services/axios-global";




const ThunkGetCategories = createAsyncThunk("categories/ThunkGetCategories",
    async(_, thunkAPI)=>{
        const { signal} = thunkAPI;
    try {
        const response = await api.get("/categories",{signal});
        return response.data;
    } catch (error) {
        return axiosErrorHandle(error);

    }
})
export default ThunkGetCategories;