import {  logOut } from '@store/Auth/authSlice';
import { createSlice } from "@reduxjs/toolkit";
import ThunkAddRemoveWishlist from "./Thunk/ThunkAddRemoveWishlist";
import { TLoading } from "src/Types/shared";
import { TProduct } from "src/Types/product";
import ThunkGetWishlist from "./Thunk/ThunkGetWishlist";

interface IWishListState {
    itemsId:number[],
    productsFullInfo:TProduct[]
    loading: TLoading;
    error: null | string;
}

const initialState: IWishListState = {
  itemsId: [],
  productsFullInfo:[],
  loading: "idle",
  error: null,
};

const wishlistSlice = createSlice({
    name:"wishlistSlice",
    initialState:initialState,
    reducers:{
        cleanUpWishlist:(state)=>{
             state.productsFullInfo=[];
             
        }
    },
    extraReducers:(builder)=>{
            builder.addCase(ThunkAddRemoveWishlist.pending,(state)=>{
                state.loading ="pending";
                state.error =null;
            });
            builder.addCase(ThunkAddRemoveWishlist.fulfilled,(state,action)=>{
                state.loading ="succeeded";
                if(action.payload?.type === "add"){
                    
                    state.itemsId.push(action.payload.id);

                }else{
                    state.itemsId = state.itemsId.filter((el) => el !== action.payload?.id);
                    state.productsFullInfo = state.productsFullInfo.filter(
                    (el) => el.id !== action.payload?.id
                    );
                }
            });
            builder.addCase(ThunkAddRemoveWishlist.rejected,(state,action)=>{
                state.loading="failed";
                if (action.payload && typeof action.payload === "string") {
                    state.error = action.payload;
                }
            });

            builder.addCase(ThunkGetWishlist.pending, (state) => {
            state.loading = "pending";
            state.error = null;
            });

            builder.addCase(ThunkGetWishlist.fulfilled, (state, action) => {
            state.loading = "succeeded";

            if (action.payload.dataType === "ProductsFullInfo") {
                state.productsFullInfo = action.payload.data as TProduct[];
            } else if (action.payload.dataType === "productsIds") {
                state.itemsId = action.payload.data as number[];
            }

            
            });

            builder.addCase(ThunkGetWishlist.rejected, (state, action) => {
            state.loading = "failed";
            if (action.payload && typeof action.payload === "string") {
                state.error = action.payload;
            }
            });

            builder.addCase(logOut,(state)=>{
                state.itemsId = [];
                state.productsFullInfo = [];
            })


    }
})
export default wishlistSlice.reducer;
export const { cleanUpWishlist } = wishlistSlice.actions;