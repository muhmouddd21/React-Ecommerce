import { Heading } from "@components/common";
import CartItemList from "@components/common/CartItemList/CartItemList";
import CartSubtotalPrice from "@components/eCommerce/CartItemSubTotal/CartItemSubtotal";
import Loading from "@components/feedback/Loading/Loading";
import { cartChangeQuantity, cartRemoveItem, cleanUpCart } from "@store/Cart/CartSlice";
import ThunkGetFillInfoOfCartItems from "@store/Cart/Thunk/ThunkGetFillInfoOfCartItems";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useCallback, useEffect } from "react";


export default function Cart() {
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

  return (
    <>
        <Heading title="Your Cart"></Heading>
        <Loading status={loading} error={error} >
        {products.length ? (
            <>
                <CartItemList
                products={products}
                cartChangeQuantityHandler={cartChangeQuantityHandler}
                removeItemHandler={removeItemHandler}
                />
                <CartSubtotalPrice products={products} />
            </>
            ) : (
            "Your Cart is empty"
        )}
        </Loading>
    </>
  )
}
