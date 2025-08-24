import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { ICategory } from "src/Types/category";
const { category, categoryImg, categoryTitle } = styles;


const Category = ({title,img,prefix}:ICategory) => {
  return (
    <Link to={`/categories/products/${prefix}`}>
        <div className={category}>
        <div className={categoryImg}>
            <img
            src= {img}
            alt={title}
            />
        </div>
        <h4 className={categoryTitle}>{title}</h4>
        </div>
    </Link>
  );
};

export default Category;