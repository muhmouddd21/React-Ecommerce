
import {Row, Col } from "react-bootstrap";

interface GridListProps<T>{
    records:T[],
    renderRecords:(record:T)=>React.ReactNode
}
interface hasId{
    id?:number
}

export default function GridList<T extends hasId>({records,renderRecords}:GridListProps<T>) {

    const categoryList = records.map((record)=>{
        return(
        <Col xs={6} key={record.id} md={3} className="d-flex justify-content-center mb-5 mt-2">
            {renderRecords(record)}
        </Col>
        )
    })
  return (
    <Row>
        {categoryList}
    </Row>
  )
}
