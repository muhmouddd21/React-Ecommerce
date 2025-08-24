import { Container, Row, Col } from "react-bootstrap";
import { Category } from "@components/eCommerce";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { ThunkGetCategories } from "@store/Categories/CategoriesSlice";

const Categories = () => {
    const dispatch = useAppDispatch();
    const { loading, error, records } = useAppSelector((state) => state.categoriesSlice);
    useEffect(()=>{
        if(!records.length){
            dispatch(ThunkGetCategories())
        }
    },[dispatch,records])

    const categoryList = records.map((record)=>{
        return(
        <Col xs={6} key={record.id} md={3} className="d-flex justify-content-center mb-5 mt-2">
          <Category {...record}/>
        </Col>
        )
    })
  return (
    <Container>
      <Row>
       {categoryList}
      </Row>
    </Container>
  );
};

export default Categories;