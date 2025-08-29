import Logo from '@assets/SVG/shopping-cart-outline-svgrepo-com.svg?react'
import WishlistItem from "@assets/SVG/wishlist.svg?react"
import { getCartTotalQuantitySelector } from "@store/Cart/Selectors"
import { useAppSelector } from "@store/hooks"
import HeaderQuantity from '../HeaderQuantity/HeaderQuantity'

import styles from './styles.module.css'

const {HeaderIcons} = styles 
function HeaderRightBat() {
    const cartTotalQuantity = useAppSelector(getCartTotalQuantitySelector)
    const wishlistTotalQuantity = useAppSelector(state => state.wishlistSlice.itemsId);
  return (
    <div className={HeaderIcons}>

      <HeaderQuantity  
        title='Wishlist'
        to='wishlist'
        quantity={cartTotalQuantity}
        IconToRender={<WishlistItem title="basket icon" width={30} height={30} />}
      
      />
      <HeaderQuantity 
      title= "Cart"
      to='cart'
      quantity={wishlistTotalQuantity.length}
      IconToRender={<Logo title="basket icon" width={30} height={30} />}
      />


    </div>
  )
}

export default HeaderRightBat
