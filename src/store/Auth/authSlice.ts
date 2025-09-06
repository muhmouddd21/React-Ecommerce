import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from 'src/Types/shared';
import thunkAuthRegister from "./Thunk/ThunkAuthRegister";
import ThunkAuthLogin from "./Thunk/ThunkAuthLogin";
import ThunkAuthLogout from "./Thunk/ThunkAuthLogout";
import ThunkCheckAuth from "./Thunk/ThunkCheckAuth";


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
    isInitialized:boolean
}

const initialState:IAuthState={
    user:null,
    loading:"idle",
    error:null,
    jwt:null,
    isInitialized: false,
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
        },
        setAccessToken:(state,action)=>{
      
            state.jwt=action.payload.token;
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
        builder.addCase(ThunkAuthLogout.pending,(state)=>{
            state.loading = "pending";
            state.error=null

        });
        builder.addCase(ThunkAuthLogout.fulfilled,(state)=>{
            state.loading = "succeeded";
            logOut();
            
        });
        builder.addCase(ThunkAuthLogout.rejected,(state,action)=>{
            state.loading = "failed";
            if (typeof action.payload ==="string"){
                state.error = action.payload;
            }
            
        });
        builder
            // ... (loginUser cases)
            // --- Handle checkAuth cases ---
            .addCase(ThunkCheckAuth.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(ThunkCheckAuth.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                // Assuming the refresh endpoint returns { accessToken, user }                
                state.user = action.payload.user; 
                state.jwt = action.payload.accessToken;
                state.isInitialized = true;
                
            })
            .addCase(ThunkCheckAuth.rejected, (state) => {
                state.loading = 'failed';
                state.isInitialized = true; // We tried, and it failed. App can now proceed.

            });


        
    }
})

export default AuthSlice.reducer
export const {resetUI,logOut,setAccessToken} = AuthSlice.actions