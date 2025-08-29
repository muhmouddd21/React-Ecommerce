import { Heading } from "@components/common";
import GridList from "@components/common/GridList/GridList";
import { Product } from "@components/eCommerce";
import Loading from "@components/feedback/Loading/Loading";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import ThunkGetWishlist from "@store/Wishlist/Thunk/ThunkGetWishlist";
import { cleanUpWishlist } from "@store/Wishlist/wishlistSlice";
import { useEffect } from "react";
import { Container } from "react-bootstrap";

export default function Wishlist() {
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



  return (
    <Container>
      <Heading title="Your Wishlist"></Heading>
      <Loading status={loading} error={error}>
        <GridList records={records} renderRecords ={(record)=> <Product {...record} /> } />

      </Loading>

    </Container>
  )
}
