
import AddTodoModal from "@components/common/AddTodoModal/AddTodoModal"

import SearchQuery from "@components/common/searchquery/SearchQuery"
import TodolistFilter from "@components/common/todolistFilter/TodolistFilter"
import TodosList from "@components/common/todoslist/TodosList"
import { useState } from "react"
import {  Button, Col, Row  } from "react-bootstrap"
import { TStatusType } from "src/Types/shared"



const Dashboard = () => {
  const [statusFilter,setStatuFilter]=useState<TStatusType>("all")
  const [searchQuery, setSearchQuery] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);

  // Functions to open and close the modal
  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);


  return (
    <>

    <Row className="container">
        <Col md={9} >
        <TodosList statusFilter={statusFilter} searchQuery={searchQuery}/>
        </Col>
        <Col >
        <div className="d-grid gap-2 mb-4">
            <Button variant="primary" size="lg" onClick={handleShowAddModal}>
              + Add New Todo
            </Button>
        </div>
        <SearchQuery searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {searchQuery.length === 0 && (
          <TodolistFilter
            statusFilter={statusFilter} 
            setStatuFilter={setStatuFilter}
          />
        )}

        </Col>
    </Row>
    <AddTodoModal show={showAddModal} handleClose={handleCloseAddModal} />
    
    </>

  )
}

export default Dashboard
