import { createSlice } from "@reduxjs/toolkit";
import { TProduct } from "src/Types/product";
import { TLoading } from "src/Types/shared";
import ThunkPlaceOrder from "./Thunk/ThunkPlaceOrder";


type TOrderItem ={
    id:string;
    subtotal: number;
    items: TProduct[];
}

interface IOrderSlice {
  orderList: TOrderItem[];
  loading: TLoading;
  error: string | null;
}



const initialState:IOrderSlice={
orderList:[],
loading:"idle",
error:null
}

const OrderSlice =createSlice({
    name:"Order",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(ThunkPlaceOrder.pending,(state)=>{
            state.loading ="pending";
            state.error=null;

        });
        builder.addCase(ThunkPlaceOrder.fulfilled,(state)=>{
            state.loading ="succeeded";
            state.error=null;
            
        });
        builder.addCase(ThunkPlaceOrder.rejected,(state,action)=>{
            state.loading ="failed";
        if (action.payload && typeof action.payload === "string") {
            state.error = action.payload;
        }
            
        });

    },

});

export default OrderSlice.reducer