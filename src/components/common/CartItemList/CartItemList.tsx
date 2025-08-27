import { CartItem } from "@components/eCommerce";
import { TProduct } from "src/Types/product";

interface CartItemListProps {
  products: (TProduct & { quantity: number })[];
}

export default function CartItemList({products}:CartItemListProps) {

    const RenderedProducts = products.map((el) => {
    return (
        <CartItem 
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
