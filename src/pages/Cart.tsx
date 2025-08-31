import { Heading } from "@components/common";
import CartItemList from "@components/common/CartItemList/CartItemList";
import CartSubtotalPrice from "@components/eCommerce/CartItemSubTotal/CartItemSubtotal";
import Loading from "@components/feedback/Loading/Loading";
import LottieHandler from "@components/feedback/LottieHandler/LottieHandler";
import useCart from "@hooks/useCart";


export default function Cart() {
    const {loading,error,cartChangeQuantityHandler,removeItemHandler,products}=useCart();

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
            <LottieHandler message="Your cart is empty" type="empty" />
        )}
        </Loading>
    </>
  )
}
