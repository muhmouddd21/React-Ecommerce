import { useEffect } from "react";
import { useAppDispatch } from "@store/hooks";
import { useAppSelector } from "@store/hooks";
import { ProductsCleanup, ThunkGetProductsByCatPrefix } from "@store/Products/ProductsSlice";
import { useParams } from "react-router-dom";

import { Container} from "react-bootstrap";
import { Product } from "@components/eCommerce";
import Loading from "@components/feedback/Loading/Loading";
import GridList from "@components/common/GridList/GridList";
import { Heading } from "@components/common";

const Products = () => {
    const params = useParams();
    const dispatch = useAppDispatch();
    const {loading, error, records }=useAppSelector((state)=>state.ProductsSlice);
      const cartItems = useAppSelector((state) => state.cartSlice.items);
      const productsFullInfo = records.map((el) => ({
        ...el,
        quantity: cartItems[el.id] || 0,
      }));

    useEffect(() => {
        dispatch(ThunkGetProductsByCatPrefix(params.prefix as string));
        
        return () => {
        dispatch(ProductsCleanup());
        };
    }, [dispatch, params]);

  return (
    <Container>
      <Heading> <span className="text-capitalize">{params.prefix}</span> Products</Heading>
      <Loading status={loading} error={error}>
        <GridList records={productsFullInfo} renderRecords ={(record)=> <Product {...record} /> } />

      </Loading>

    </Container>
  );
};

export default Products;