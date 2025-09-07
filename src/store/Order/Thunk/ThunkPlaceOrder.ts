import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@services/axios-global";
import { RootState } from "@store/index";
import axiosErrorHandle from "@utils/axiosErrorHandle";

const ThunkPlaceOrder= createAsyncThunk('order/ThunkPlaceOrder',
    async (subtotal:number,thunkApi)=>{
        const {rejectWithValue,getState,fulfillWithValue} =thunkApi;
        const { cartSlice} = getState() as RootState;
        const orderItems = cartSlice.productFullInfo.map((product)=>({

            id:product.id,
            title:product.title,
            price: product.price,
            img: product.img,
            quantity: cartSlice.items[product.id],

        }));
        try {
            const res = await api.post('/orders',{
                items:orderItems,
                subtotal:subtotal
            })
            return fulfillWithValue(res.data)
            
        } catch (error) {
            return rejectWithValue(axiosErrorHandle(error))
        }
})
export default ThunkPlaceOrder;