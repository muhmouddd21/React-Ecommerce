import styles from "./styles.module.css";

type ProductInfoType ={
    img:string;
    direction?: "row" | "column"
    title:string;
    price:number;
    style?:React.CSSProperties;
    children?:React.ReactNode;
    quantity?:number;

}
const ProductInfo = ({direction="row",img,title,price,children,style}:ProductInfoType) => {
  return (
 <div className={`${styles[`product-${direction}`]}`} style={style}>
      <div className={`${styles[`productImg-${direction}`]}`}>
        <img
          src={img}
          alt={title}
        />
      </div>
      <h2>{title}</h2>
      <h3>{price.toFixed(2)} EGP</h3>
      {children}
    </div>
  )
}

export default ProductInfo


   