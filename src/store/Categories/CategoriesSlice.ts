import { createSlice } from "@reduxjs/toolkit";
import ThunkGetCategories from "./Thunk/ThunkGetCategories";
import { ICategory } from "src/Types/category";
import { TLoading } from "src/Types/shared";

interface ICategoriesState {
  records: ICategory[];
  loading: TLoading;
  error: string | null;
}

const initialState: ICategoriesState = {
  records: [],
  loading: "idle",
  error: null,
};
const categoriesSlice =createSlice({
    name:"categoriesSlice",
    initialState: initialState,
    reducers:{},
   extraReducers: (builder) => {
    builder.addCase(ThunkGetCategories.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });

    builder.addCase(ThunkGetCategories.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });

    builder.addCase(ThunkGetCategories.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  }
});


export default categoriesSlice.reducer;
export {ThunkGetCategories};