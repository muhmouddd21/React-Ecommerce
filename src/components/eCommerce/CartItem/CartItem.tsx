import { Form, Button } from "react-bootstrap";
import styles from './styles.module.css'
import { TProduct } from "src/Types/product";
const {cartItem,product,productImg,productInfo,cartItemSelection} = styles;

type cartItemProps = TProduct & {
  cartChangeQuantityHandler: (id: number, quantity: number) => void;
};

export default function CartItem({img,title,price,quantity,id,max,cartChangeQuantityHandler}:cartItemProps) {

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
        <div className={product}>
          <div className={productImg}>
            <img src={img} alt={title} />
          </div>
          <div className={productInfo}>
            <h2>{title}</h2>
            <h3>{price?.toFixed(2) ?? "—"} EGP</h3>
            <Button
              variant="secondary"
              style={{ color: "white", width: "100px" }}
              className="mt-auto"
            //   onClick={() => removeItemHandler(id)}
            >
              Remove
            </Button>
          </div>
        </div>

        <div className={cartItemSelection}>
          <span className="d-block mb-1">Quantity</span>
          <Form.Select value={quantity} onChange={changeQuantity}>
            {renderOptions}
          </Form.Select>
        </div>
      </div>
    );
  };

