import { Heading } from "@components/common";
import GridList from "@components/common/GridList/GridList";
import { Product } from "@components/eCommerce";
import Loading from "@components/feedback/Loading/Loading";
import LottieHandler from "@components/feedback/LottieHandler/LottieHandler";
import useWishlist from "@hooks/useWishlist";
import { Container } from "react-bootstrap";

export default function Wishlist() {
   const {loading,error,records}= useWishlist();

  return (
    <Container>
      <Heading title="Your Wishlist"></Heading>
      <Loading status={loading} error={error}>
        <GridList records={records} renderRecords ={(record)=> <Product {...record} /> } />
    
      </Loading>
      

      {(records.length === 0) && (
        <LottieHandler message="Your Wishlist is empty" type="empty" />
      )}

    </Container>
  )
}
