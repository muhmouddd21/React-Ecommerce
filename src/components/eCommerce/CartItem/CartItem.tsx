import { Form, Button } from "react-bootstrap";
import styles from './styles.module.css'
import { TProduct } from "src/Types/product";
import { memo } from "react";
import ProductInfo from "../ProductInfo/ProductInfo";
const {cartItem,cartItemSelection} = styles;

type cartItemProps = TProduct & {
  cartChangeQuantityHandler: (id: number, quantity: number) => void;
} &{
    removeItemHandler:(id:number)=>void
};

  const CartItem = memo(({img,title,price,quantity,id,max,cartChangeQuantityHandler,removeItemHandler}:cartItemProps)=>{

    const changeQuantity = (event: React.ChangeEvent<HTMLSelectElement>)=>{
        const quantity = +event.target.value;
        cartChangeQuantityHandler(id,quantity);
    }
   
    const renderOptions = Array(max)
      .fill(0)
      .map((_, idx) => {
        const quantity = ++idx;
        return (
          <option value={quantity} key={quantity}>
            {quantity}
          </option>
        );
      });

  return (
      <div className={cartItem}>
        <ProductInfo title={title} img ={img} price={price} direction="column">
     

        <div className={cartItemSelection}>
          <span className="d-block mb-1">Quantity</span>
          <Form.Select value={quantity} onChange={changeQuantity}>
            {renderOptions}
          </Form.Select>
          <Button
              variant="secondary"
              style={{ color: "white", width: "100px" }}
              className="mt-auto"
              onClick={() => removeItemHandler(id)}
            >
              Remove
          </Button>
        </div>
      </ProductInfo>
      </div>
    );
  });
export default CartItem;
