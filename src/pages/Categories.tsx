import { Container} from "react-bootstrap";
import { Category } from "@components/eCommerce";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { ThunkGetCategories } from "@store/Categories/CategoriesSlice";
import Loading from "@components/feedback/Loading/Loading";
import GridList from "@components/common/GridList/GridList";

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
        <Loading status={loading} error={error} >
          <GridList records={records} renderRecords ={(record)=> <Category {...record} /> } />
        </Loading>

    </Container>
  );
};

export default Categories;