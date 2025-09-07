
import { TProduct } from "src/Types/product";
import styles from "./styles.module.css";
import { Button, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useState } from "react";
import ThunkPlaceOrder from "@store/Order/Thunk/ThunkPlaceOrder";

type CartSubtotalPriceProps = { products: TProduct[] };

const CartSubtotalPrice = ({ products }: CartSubtotalPriceProps) => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state=> state.AuthSlice.jwt);

  useAppSelector(state=>state.OrderSlice)

  const[showModal,setShowModal] = useState(false)

  const subtotal = products.reduce((accumulator, el) => {
    const price = el.price;
    const quantity = el.quantity;
    if (quantity && typeof quantity === "number") {
      return accumulator + price * quantity;
    } else {
      return accumulator;
    }
  }, 0);

const handlePlaceOrder = ()=>{
  if(!accessToken){
    setShowModal(true);
    return;
  }
  dispatch(ThunkPlaceOrder(subtotal));

}

  
  return (
    <>
        <Modal show={showModal} backdrop="static" onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Login Required</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>You have to login first to place an order </p>
          </Modal.Body>

      </Modal>
      <div className={styles.container}>
      <span>Subtotal:</span>
      <span>{subtotal.toFixed(2)} EGP</span>

    </div>
    <div style={{display:"flex", flexDirection:"row-reverse"}}>
      <Button variant="info" style={{color:"white"}} onClick={handlePlaceOrder}>
        Place Order
        </Button>
    </div>

    </>


  );
};

export default CartSubtotalPrice;