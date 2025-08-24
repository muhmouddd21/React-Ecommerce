import Logo from '../../../assets/SVG/shopping-cart-outline-svgrepo-com.svg?react'
import styles from "./styles.module.css";
const { basketContainer, basketQuantity } = styles;

export default function HeaderBasket() {
  return (
    <div className={basketContainer}>
        <Logo title="basket icon" width={30} height={30} />
        <div className={basketQuantity}>0</div>
    </div>
  )
}
