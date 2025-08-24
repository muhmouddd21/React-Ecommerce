import { createSlice } from "@reduxjs/toolkit";

import { TLoading } from "src/Types/shared";
import { TProduct } from "src/Types/product";
import ThunkGetProductsByCatPrefix from "./Thunk/ThunkGetProductsByCatPrefix";

interface IProductsState {
  records: TProduct[];
  loading: TLoading;
  error: string | null;
}

const initialState: IProductsState = {
  records: [],
  loading: "idle",
  error: null,
};
const ProductsSlice =createSlice({
    name:"ProductsSlice",
    initialState: initialState,
    reducers:{
      ProductsCleanup:(state)=>{
        state.records=[];
      }
    },
   extraReducers: (builder) => {
    builder.addCase(ThunkGetProductsByCatPrefix.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(ThunkGetProductsByCatPrefix.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });

    builder.addCase(ThunkGetProductsByCatPrefix.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  }
});

export const {ProductsCleanup} = ProductsSlice.actions;
export default ProductsSlice.reducer;
export {ThunkGetProductsByCatPrefix};