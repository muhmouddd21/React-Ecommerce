import { Container} from "react-bootstrap";
import { Category } from "@components/eCommerce";

import Loading from "@components/feedback/Loading/Loading";
import GridList from "@components/common/GridList/GridList";
import { Heading } from "@components/common";
import useCategories from "@hooks/useCategories";

const Categories = () => {
  const {error,loading,records}=useCategories();

  return (
    <Container>
      <Heading title="Categories"></Heading>
        <Loading status={loading} error={error} type="category">
          <GridList records={records} renderRecords ={(record)=> <Category {...record} /> } />
        </Loading>

    </Container>
  );
};

export default Categories;