import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandle from "@utils/axiosErrorHandle";
import axios from "axios";

type TFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const thunkAuthRegister=createAsyncThunk('auth/ThunkAuthRegister',async(formData: TFormData,ThunkApi)=>{
    const {fulfillWithValue,rejectWithValue} = ThunkApi;
    try {
        const response = await axios.post('/users/signup',formData)
        return  fulfillWithValue(response.data);
    } catch (error) {
        return rejectWithValue(axiosErrorHandle(error)) ;
    }
})
export default thunkAuthRegister;
