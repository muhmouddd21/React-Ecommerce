import { Heading } from "@components/common";
import CartItemList from "@components/common/CartItemList/CartItemList";
import Loading from "@components/feedback/Loading/Loading";
import ThunkGetFillInfoOfCartItems from "@store/Cart/Thunk/ThunkGetFillInfoOfCartItems";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";


export default function Cart() {
    const dispatch = useAppDispatch();
    const {productFullInfo,error,items,loading} = useAppSelector(state => state.cartSlice);

    useEffect(()=>{
        dispatch(ThunkGetFillInfoOfCartItems());
        
    },[dispatch])
    
    const products =productFullInfo.map(el =>({
        ...el,
        quantity:items[el.id]
    }));
    


  return (
    <>
        <Heading>Your Cart</Heading>
        <Loading status={loading} error={error} >
            <CartItemList products={products}/>
        </Loading>
    </>
  )
}
