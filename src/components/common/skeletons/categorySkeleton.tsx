import ContentLoader from "react-content-loader";
import { Row, Col } from "react-bootstrap";

function categorySkeleton() {
    const renderSkeletons = Array(4).fill(0).map((_,idx)=>(
        <Col key={idx} xs={3}  className="d-flex justify-content-center mb-5 mt-2">
        <ContentLoader 
            speed={2}
            width={400}
            height={180}
            viewBox="0 0 400 180"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
        >
            <circle cx="117" cy="89" r="79" />
        </ContentLoader>
        </Col>
    ))

return <Row>{renderSkeletons}</Row>;
}

export default categorySkeleton
