import { useEffect } from "react";
import { useAppDispatch } from "@store/hooks";
import { useAppSelector } from "@store/hooks";
import { ProductsCleanup, ThunkGetProductsByCatPrefix } from "@store/Products/ProductsSlice";
import { useParams } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";
import { Product } from "@components/eCommerce";

const Products = () => {
    const params = useParams();
    const dispatch = useAppDispatch();
    const {loading, error, records }=useAppSelector((state)=>state.ProductsSlice);

    useEffect(() => {
        dispatch(ThunkGetProductsByCatPrefix(params.prefix as string));

        return () => {
        dispatch(ProductsCleanup());
        };
    }, [dispatch, params]);

    const productsList = records.map((record)=>{
            return(
            <Col xs={6} key={record.id} md={3} className="d-flex justify-content-center mb-5 mt-2">
              <Product {...record}/>
            </Col>
            )
    })
  return (
    <Container>
      <Row>
        {productsList}
      </Row>
    </Container>
  );
};

export default Products;