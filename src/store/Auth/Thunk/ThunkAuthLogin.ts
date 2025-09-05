import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@services/axios-global";
import axiosErrorHandle from "@utils/axiosErrorHandle";
import { signInType } from '@validations/signInSchema';

type TResponse ={
        user:{
            id:number,
            email:string,
            firstName:string,
            lastName:string
        } | null,
        jwt:string|null
}

const ThunkAuthLogin =createAsyncThunk('auth/ThunkAuthLogin',async(formData:signInType,Thunkapi)=>{

    const {rejectWithValue,fulfillWithValue} = Thunkapi;
    const {email :login,password} = formData;
    const payload ={login,password}
try {
    const response =await api.post<TResponse>('/users/signin',payload);

    
    return fulfillWithValue(response.data);
} catch (error) {
    return rejectWithValue(axiosErrorHandle(error));
}

});

export default ThunkAuthLogin;