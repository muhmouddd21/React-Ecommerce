import { getCartTotalQuantitySelector } from '@store/Cart/Selectors';
import WishlistItem from "@assets/SVG/wishlist.svg?react"
import styles from "./styles.module.css";
import { useAppSelector } from '@store/hooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const { Container, itemQuantity,pumpItemQuantity,itemIcon } = styles;

export default function HeaderWishlist() {
  const [isAnimate, setIsAnimate] = useState(false);
  const totalQuantity = useAppSelector(getCartTotalQuantitySelector)
  const navigate = useNavigate();
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
          { totalQuantity >0 ?  <div className={quantityStyle}>{totalQuantity}</div> : null}
      
      </div>
      <h3>Wishlist</h3>

    </div>
  )
}
