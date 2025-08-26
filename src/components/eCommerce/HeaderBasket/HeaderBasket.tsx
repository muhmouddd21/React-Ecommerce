import { getCartTotalQuantitySelector } from '@store/Cart/Selectors';
import Logo from '../../../assets/SVG/shopping-cart-outline-svgrepo-com.svg?react'
import styles from "./styles.module.css";
import { useAppSelector } from '@store/hooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const { basketContainer, basketQuantity,pumpCartQuantity,basketIcon } = styles;

export default function HeaderBasket() {
  const [isAnimate, setIsAnimate] = useState(false);
  const totalQuantity = useAppSelector(getCartTotalQuantitySelector)
  const navigate = useNavigate();
  const quantityStyle = `${basketQuantity} ${
    isAnimate ? pumpCartQuantity : ""
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
    <div className={basketContainer} onClick={()=> navigate('/cart')}>
      <div className={basketIcon}>
          <Logo title="basket icon" width={30} height={30} />
           <div className={quantityStyle}>{totalQuantity}</div>
      </div>
      <h3>Cart</h3>

    </div>
  )
}
