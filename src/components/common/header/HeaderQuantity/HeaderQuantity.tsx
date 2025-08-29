
import styles from "./styles.module.css";

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const { Container, itemQuantity,pumpItemQuantity,itemIcon } = styles;


interface HeaderQuantityProps{
    quantity:number,
    IconToRender:React.ReactNode,
    to:string,
    title:string
}




export default function HeaderQuantity( {quantity,IconToRender,to,title}:HeaderQuantityProps) {
  const [isAnimate, setIsAnimate] = useState(false);
  const navigate = useNavigate();
  const quantityStyle = `${itemQuantity} ${
    isAnimate ? pumpItemQuantity : ""
  }`;
  useEffect(()=>{
    if (!quantity) {
      return;
    }
    setIsAnimate(true);

   const debounce = setTimeout(() => {
      setIsAnimate(false);
    }, 300);

    return () => clearTimeout(debounce);
  },[quantity])
  
  return (
    <div className={Container} onClick={()=> navigate(`/${to}`)}>
      <div className={itemIcon}>
            {IconToRender}

          { quantity >0 ?  <div className={quantityStyle}>{quantity}</div> : null}
      </div>
      <h3>{title}</h3>

    </div>
  )
}
