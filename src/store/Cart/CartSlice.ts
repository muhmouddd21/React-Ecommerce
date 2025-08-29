import { createSlice } from "@reduxjs/toolkit";


import { TProduct } from "src/Types/product";
import ThunkGetFillInfoOfCartItems from "./Thunk/ThunkGetFillInfoOfCartItems";
import { TLoading } from "src/Types/shared";


interface ICartState {
    items:{[key:number]:number},
    productFullInfo:TProduct[]
    loading: TLoading;
    error: null | string;
}

const initialState: ICartState = {
  items: {},
  productFullInfo:[],
  loading: "idle",
  error: null,
};


const cartSlice =createSlice({
    name:"Cart",
    initialState: initialState,
    reducers:{
        addToCart:(state,action)=>{
            
            const id = action.payload;
            if(state.items[id]){
                state.items[id]++;
            }else{
                state.items[id] =1;
            }
        },
        cartChangeQuantity:(state,action)=>{
            state.items[action.payload.id] = action.payload.quantity;

        },
        cartRemoveItem :(state,action)=>{
            delete(state.items[action.payload.id])
            state.productFullInfo =state.productFullInfo.filter((product)=>{
                return product.id !== action.payload.id;
            })    

        },
        cleanUpCart:(state)=>{
                state.productFullInfo=[];
                
        }
    },
    extraReducers:(builder) =>{
            builder.addCase(ThunkGetFillInfoOfCartItems.pending,(state)=>{
                state.loading = "pending";
                state.error = null;
            });
            builder.addCase(ThunkGetFillInfoOfCartItems.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.productFullInfo = action.payload as TProduct[];
            });
            builder.addCase(ThunkGetFillInfoOfCartItems.rejected, (state, action) => {
                state.loading = "failed";
                if (action.payload && typeof action.payload === "string") {
                    state.error = action.payload;
                }
            });


            }
});


export default cartSlice.reducer;
export const { addToCart ,cartChangeQuantity,cartRemoveItem,cleanUpCart} = cartSlice.actions;
