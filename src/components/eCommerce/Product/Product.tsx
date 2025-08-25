import { Button } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "src/Types/product";


import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/Cart/CartSlice";
const { product, productImg } = styles;


const Product = ({id,title,price,img}:TProduct) => {
const dispatch = useAppDispatch()

  return (
    <div className={product}>
      <div className={productImg}>
        <img
          src={img}
          alt={title}
        />
      </div>
      <h2>{title}</h2>
      <h3>{price} EGP</h3>

      <Button  variant="info" style={{ color: "white" }} onClick={()=>dispatch(addToCart(id)) }>
        Add to cart
      </Button>
    </div>
  );
};

export default Product;