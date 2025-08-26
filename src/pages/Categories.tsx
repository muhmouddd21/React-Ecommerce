import { Container} from "react-bootstrap";
import { Category } from "@components/eCommerce";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { ThunkGetCategories } from "@store/Categories/CategoriesSlice";
import Loading from "@components/feedback/Loading/Loading";
import GridList from "@components/common/GridList/GridList";
import { Heading } from "@components/common";

const Categories = () => {
    const dispatch = useAppDispatch();
    const { loading, error, records } = useAppSelector((state) => state.categoriesSlice);
    useEffect(()=>{
        if(!records.length){
            dispatch(ThunkGetCategories())
        }
    },[dispatch,records])

  return (
    <Container>
      <Heading>Categories</Heading>
        <Loading status={loading} error={error} >
          <GridList records={records} renderRecords ={(record)=> <Category {...record} /> } />
        </Loading>

    </Container>
  );
};

export default Categories;