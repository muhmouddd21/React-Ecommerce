import { CartItem } from "@components/eCommerce";
import { TProduct } from "src/Types/product";

interface CartItemListProps {
  products: (TProduct & { quantity: number })[],
  cartChangeQuantityHandler :(id:number,quantity:number)=> void;
  removeItemHandler:(id:number)=>void
}

export default function CartItemList({products,cartChangeQuantityHandler,removeItemHandler}:CartItemListProps) {

    const RenderedProducts = products.map((el) => {
    return (
        <CartItem 
        removeItemHandler ={removeItemHandler}
        cartChangeQuantityHandler ={cartChangeQuantityHandler}
        key={el.id}
        {...el}
        />
    )
    });
  return (
    <div>
      {RenderedProducts}
    </div>
  )
}
