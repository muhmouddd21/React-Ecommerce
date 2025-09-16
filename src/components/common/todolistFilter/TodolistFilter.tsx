import { Form } from "react-bootstrap"
import { TStatusType } from "src/Types/shared";

type TSelectFilterProps={
    statusFilter:TStatusType,
    setStatuFilter:(value:TStatusType)=> void;
}
const TodolistFilter = ({statusFilter,setStatuFilter}:TSelectFilterProps) => {

    const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatuFilter(e.target.value as TStatusType);
  };

  return (
    <>
        <h5>Filter By Status</h5>
        <Form.Select
            value={statusFilter}
            onChange={onChangeHandler}
          >
            <option value="all">All Roles</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
        </Form.Select>
    </>

  )
}

export default TodolistFilter
