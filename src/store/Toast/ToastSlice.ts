import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { TToast } from "src/Types/Toast.types";

interface IToastState {
  records: TToast[];
}

const initialState: IToastState = {
  records: [
    {
        id:"10",
        message:"added to cart",
        type:"danger",
        title:"home"
    },
      {
        id:"11",
        message:"added to cart",
        type:"primary",
        title:"home"
    }
  ],
};

const ToastSlice = createSlice({
    name:"Toasts",
    initialState,
    reducers:{
        removeToast: (state, action) => {
            state.records = state.records.filter((el) => el.id !== action.payload);
        },
        addToast: (state, action: PayloadAction<TToast>) => {
          state.records.push({
          id: nanoid(),
          title: action.payload.title || action.payload.type,
          type: action.payload.type,
          message: action.payload.message,
      });
    },
    }

})
export default ToastSlice.reducer;
export const {removeToast,addToast} = ToastSlice.actions