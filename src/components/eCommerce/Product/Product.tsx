import { Button,Modal,Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "src/Types/product";

import Like from "@assets/SVG/like.svg?react"
import Like_fill from "@assets/SVG/like-fill.svg?react"
import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/Cart/CartSlice";
import { memo, useEffect, useState } from "react";
import ThunkAddRemoveWishlist from "@store/Wishlist/Thunk/ThunkAddRemoveWishlist";
import ProductInfo from "../ProductInfo/ProductInfo";
const {  maximumNotice,like_button } = styles;


const Product = memo(({id,title,price,img,max,quantity,isLiked,isAuthenticated}:TProduct) => {
const [isBtnDisabled, setIsBtnDisabled]=useState(false);
const [isLoading,setIsloading] = useState(false);
const[showModal,setShowModal]=useState(false);

const dispatch = useAppDispatch();

  const currentRemainingQuantity = max - (quantity ?? 0);
  const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false;

useEffect(()=>{
      if (!isBtnDisabled) {
      return;
    }

  const debounce = setTimeout(()=>{
    setIsBtnDisabled(false);
    
  },300)

  return ()=>  {
    clearTimeout(debounce)
  }
},[isBtnDisabled])

const addToCartHandler =()=>{

  dispatch(addToCart(id));
  setIsBtnDisabled(true);
}
const addTowishListHandler =()=>{

  if(isAuthenticated){
    if (isLoading) return;
    setIsloading(true);

    dispatch(ThunkAddRemoveWishlist(id)).unwrap()
    .finally(() => {
          setIsloading(false);
    });
  }else{
    setShowModal(true);
  }
}
  return (
    <ProductInfo img={img} title={title} price={price}>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Login Required</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>You have to login first to add this item to your wishlist.</p>
          </Modal.Body>

      </Modal>
     

      <div className={like_button} onClick={addTowishListHandler}>
        {isLoading ? (<Spinner animation="border" size="sm" variant="primary" />) :
        (isLiked ? <Like_fill /> : <Like  style={{ fill: "#999" }}/>)
      }
        
      
      </div>


      <p className={maximumNotice}>
        {quantityReachedToMax
          ? "You reach to the limit"
          : `You can add ${currentRemainingQuantity} item(s)`}
      </p>
      <Button  
      variant="info" style={{ color: "white" }} 
      onClick={addToCartHandler}
      disabled ={isBtnDisabled || quantityReachedToMax}
      >
        {isBtnDisabled ? (
          <>
            <Spinner animation="border" size="sm" /> Loading...
          </>
        ) : (
          "Add to cart"
        )}
      </Button>
    </ProductInfo>
  );
});

export default Product;