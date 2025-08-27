import { createSlice } from "@reduxjs/toolkit";
import ThunkAddRemoveWishlist from "./Thunk/ThunkAddRemoveWishlist";
import { TLoading } from "src/Types/shared";
import { TProduct } from "src/Types/product";

interface IWishListState {
    itemsId:number[],
    productFullInfo:TProduct[]
    loading: TLoading;
    error: null | string;
}

const initialState: IWishListState = {
  itemsId: [],
  productFullInfo:[],
  loading: "idle",
  error: null,
};

const wishlistSlice = createSlice({
    name:"wishlistSlice",
    initialState:initialState,
    reducers:{

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
                    state.productFullInfo = state.productFullInfo.filter(
                    (el) => el.id !== action.payload?.id
                    );
                }
            });
            builder.addCase(ThunkAddRemoveWishlist.rejected,(state,action)=>{
                state.loading="failed";
                if (action.payload && typeof action.payload === "string") {
                    state.error = action.payload;
                }
            })
    }
})
export default wishlistSlice.reducer;