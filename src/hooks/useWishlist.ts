import { useAppDispatch, useAppSelector } from "@store/hooks";
import ThunkGetWishlist from "@store/Wishlist/Thunk/ThunkGetWishlist";
import { cleanUpWishlist } from "@store/Wishlist/wishlistSlice";
import { useEffect } from "react";


function useWishlist() {
const dispatch =useAppDispatch();

  const { loading, error, productsFullInfo } = useAppSelector(
    (state) => state.wishlistSlice
  );

  useEffect(()=>{

    dispatch(ThunkGetWishlist());

    return ()=>{
      dispatch(cleanUpWishlist())
    };
  },[dispatch])

  
  const records = productsFullInfo.map((el) => ({
    ...el,
    isLiked: true,
  }));

  return {loading,error,records}
}

export default useWishlist
