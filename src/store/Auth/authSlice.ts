import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from 'src/Types/shared';
import thunkAuthRegister from "./Thunk/ThunkAuthRegister";


interface IAuthState{
    user:{
        id:number,
        email:string,
        firstName:string,
        lastName:string
    } | null,
    loading:TLoading
    error:string|null
    accessToken:string|null
}

const initialState:IAuthState={
    user:null,
    loading:"idle",
    error:null,
    accessToken:null
}

const AuthSlice =createSlice({
    name:"AuthSlice",
    initialState:initialState,
    reducers:{

    },
    extraReducers(builder){
        builder.addCase(thunkAuthRegister.pending,(state)=>{
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(thunkAuthRegister.fulfilled,(state)=>{
            state.loading = "succeeded";

        });
        builder.addCase(thunkAuthRegister.rejected,(state,action)=>{
            state.loading = "failed";
            if (typeof action.payload ==="string"){
                state.error = action.payload;
            }
            
        });
    }
})

export default AuthSlice.reducer
// export {} = authSlice.actions