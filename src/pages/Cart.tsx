import { Heading } from "@components/common";
import { CartItem } from "@components/eCommerce";
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
    
    const RenderedProducts = products.map((product) => {
    return (
        <CartItem 
        key={product.id}   // always add a key in lists!
        id={product.id} 
        img={product.img} 
        quantity={product.quantity} 
        title={product.title}
        price={product.price}
        max={product.max}
        />
    )
    });


  return (
    <>
        <Heading>Your Cart</Heading>
        <Loading status={loading} error={error}  >
            {RenderedProducts}
        </Loading>
    </>
  )
}
