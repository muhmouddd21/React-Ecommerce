import { Container} from "react-bootstrap";
import { Product } from "@components/eCommerce";
import Loading from "@components/feedback/Loading/Loading";
import GridList from "@components/common/GridList/GridList";
import { Heading } from "@components/common";
import useProducts from "@hooks/useProducts";

const Products = () => {
     const {loading,error,productsFullInfo} = useProducts();

  return (
    <Container>
      <Heading title='Products' /> 
      <Loading status={loading} error={error}>
        <GridList records={productsFullInfo} renderRecords ={(record)=> <Product {...record} /> } />

      </Loading>

    </Container>
  );
};

export default Products;