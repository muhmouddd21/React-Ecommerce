import { cartChangeQuantity, cartRemoveItem, cleanUpCart } from "@store/Cart/CartSlice";
import ThunkGetFillInfoOfCartItems from "@store/Cart/Thunk/ThunkGetFillInfoOfCartItems";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useCallback, useEffect } from "react";


function useCart() {
    const dispatch = useAppDispatch();
    const {productFullInfo,error,items,loading} = useAppSelector(state => state.cartSlice);

    
    useEffect(()=>{
        dispatch(ThunkGetFillInfoOfCartItems());
        
        return ()=>{
            dispatch(cleanUpCart());
        }; 
    },[dispatch])
    
    const products =productFullInfo.map(el =>({
        ...el,
        quantity:items[el.id]
    }));
    const cartChangeQuantityHandler = useCallback((id:number,quantity:number)=>{
        dispatch(cartChangeQuantity({id,quantity}))
    },[dispatch])

    const removeItemHandler =useCallback((id:number)=>{
        dispatch(cartRemoveItem({id}));
    },[dispatch])

  return {loading,error,cartChangeQuantityHandler,removeItemHandler,products}
}

export default useCart
