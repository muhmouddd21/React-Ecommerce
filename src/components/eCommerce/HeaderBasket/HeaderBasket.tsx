import { getCartTotalQuantitySelector } from '@store/Cart/Selectors';
import Logo from '../../../assets/SVG/shopping-cart-outline-svgrepo-com.svg?react'
import styles from "./styles.module.css";
import { useAppSelector } from '@store/hooks';
const { basketContainer, basketQuantity } = styles;

export default function HeaderBasket() {
  const totalQuantity = useAppSelector(getCartTotalQuantitySelector)
  
  return (
    <div className={basketContainer}>
        <Logo title="basket icon" width={30} height={30} />
        <div className={basketQuantity}>{totalQuantity}</div>
    </div>
  )
}
