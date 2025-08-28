import WishlistItem from "@assets/SVG/wishlist.svg?react"
import styles from "./styles.module.css";
import { useAppSelector } from '@store/hooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const { Container, itemQuantity,pumpItemQuantity,itemIcon } = styles;

export default function HeaderWishlist() {
  const [isAnimate, setIsAnimate] = useState(false);
  const navigate = useNavigate();
  const totalQuantity = useAppSelector(state => state.wishlistSlice.itemsId);


  const quantityStyle = `${itemQuantity} ${
    isAnimate ? pumpItemQuantity : ""
  }`;


  useEffect(()=>{
    if (!totalQuantity) {
      return;
    }
    setIsAnimate(true);

   const debounce = setTimeout(() => {
      setIsAnimate(false);
    }, 300);

    return () => clearTimeout(debounce);
  },[totalQuantity])
  
  return (
    <div className={Container} onClick={()=> navigate('/wishlist')}>
      <div className={itemIcon}>
          <WishlistItem title="basket icon" width={30} height={30} />
          { totalQuantity.length >0 ?  <div className={quantityStyle}>{totalQuantity.length}</div> : null}
      
      </div>
      <h3>Wishlist</h3>

    </div>
  )
}
