import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from 'src/Types/shared';
import thunkAuthRegister from "./Thunk/ThunkAuthRegister";
import ThunkAuthLogin from "./Thunk/ThunkAuthLogin";


interface IAuthState{
    user:{
        id:number,
        email:string,
        firstName:string,
        lastName:string
    } | null,
    loading:TLoading
    error:string|null
    jwt:string|null
}

const initialState:IAuthState={
    user:null,
    loading:"idle",
    error:null,
    jwt:null
}

const AuthSlice =createSlice({
    name:"AuthSlice",
    initialState:initialState,
    reducers:{
        resetUI:(state)=>{
            state.loading="idle";
            state.error=null;
        },
        logOut:(state)=>{
            state.jwt =null;
            state.user =null;
        }
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
        builder.addCase(ThunkAuthLogin.pending,(state)=>{
            state.loading = "pending";
            state.error=null

        });
        builder.addCase(ThunkAuthLogin.fulfilled,(state,action)=>{
            state.loading = "succeeded";
            state.user=action.payload.user;
            state.jwt=action.payload.jwt;
            
        });
        builder.addCase(ThunkAuthLogin.rejected,(state,action)=>{
            state.loading = "failed";
            if (typeof action.payload ==="string"){
                state.error = action.payload;
            }
            
        });

        
    }
})

export default AuthSlice.reducer
export const {resetUI,logOut} = AuthSlice.actions