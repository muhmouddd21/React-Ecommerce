import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@services/axios-global";
import axiosErrorHandle from "@utils/axiosErrorHandle";

type TFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const thunkAuthRegister=createAsyncThunk('auth/ThunkAuthRegister',async(formData: TFormData,ThunkApi)=>{
    const {fulfillWithValue,rejectWithValue} = ThunkApi;
    try {   
        const response = await api.post('/users/signup',formData)
        return  fulfillWithValue(response.data);
    } catch (error) {
        return rejectWithValue(axiosErrorHandle(error)) ;
    }
})
export default thunkAuthRegister;
