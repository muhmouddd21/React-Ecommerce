import { useAppDispatch, useAppSelector } from "@store/hooks";
import ThunkGetWishlist from "@store/Wishlist/Thunk/ThunkGetWishlist";
import { cleanUpWishlist } from "@store/Wishlist/wishlistSlice";
import {  useLayoutEffect } from "react";


function useWishlist() {
const dispatch =useAppDispatch();

  const { loading, error, productsFullInfo } = useAppSelector(
    (state) => state.wishlistSlice
  );
useLayoutEffect(()=>{
    const promise =dispatch(ThunkGetWishlist({dataType:"productsFullInfo"}));

    return ()=>{
      promise.abort();
      dispatch(cleanUpWishlist())
    };
},[dispatch])


  
  const records = productsFullInfo.map((el) => ({
    ...el,
    isLiked: true,
    isAuthenticated:true
  }));

  return {loading,error,records}
}

export default useWishlist
