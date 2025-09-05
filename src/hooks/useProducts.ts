import { useAppDispatch, useAppSelector } from "@store/hooks";
import { ProductsCleanup, ThunkGetProductsByCatPrefix } from "@store/Products/ProductsSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";


function useProducts() {
    const params = useParams();
    const dispatch = useAppDispatch();
    const {loading, error, records }=useAppSelector((state)=>state.ProductsSlice);
      const cartItems = useAppSelector((state) => state.cartSlice.items);
      const itemsIdOfWishList = useAppSelector(state => state.wishlistSlice.itemsId);
      const  userAccessToken= useAppSelector(state => state.AuthSlice.jwt)
        const productPrefix = params.prefix;


    useEffect(() => {
        dispatch(ThunkGetProductsByCatPrefix(productPrefix as string));
        
        return () => {
        dispatch(ProductsCleanup());
        };
    }, [dispatch, productPrefix]);

      const productsFullInfo = records.map((el) => ({
        ...el,
        isLiked:itemsIdOfWishList.includes(el.id),
        quantity: cartItems[el.id] || 0,
        isAuthenticated:userAccessToken ? true:false
      }));

  return {loading,error,productsFullInfo,productPrefix};
}

export default useProducts
