import { createSlice } from "@reduxjs/toolkit";


import { TProduct } from "src/Types/product";


interface ICartState {
items:{[key:number]:number},
productFullInfo:TProduct[]
}

const initialState: ICartState = {
  items: {},
  productFullInfo:[],

};


const cartSlice =createSlice({
    name:"Cart",
    initialState: initialState,
    reducers:{
        addToCart:(state,action)=>{
            
            const id = action.payload.id;
            if(state.items[id]){
                state.items[id]++;
            }else{
                state.items[id] =1;
            }
        }
    },
});


export default cartSlice.reducer;
export const { addToCart} = cartSlice.actions;
