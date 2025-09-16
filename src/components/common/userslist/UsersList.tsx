// import useGetUsers from "@hooks/useGetUsers";
// import { Button, Table } from "react-bootstrap"
// import { TRoleType } from "src/Types/shared";

// interface UsersListProps {
//   roleFilter: TRoleType;
// }
// const UsersList = ({roleFilter}:UsersListProps) => {
//     const{isLoading,data,isError,error} =useGetUsers(roleFilter);
//     console.log(data);
    
//     if (isLoading) {
//     return <p>loading please wait</p>;
//     }
    
//     if (isError) {
//       return <div>error: {error.message}</div>;
//     }

//   return (
//  <Table striped bordered hover>
//               <thead>
//                 <tr>
//                   <th>#</th>
//                   <th>First Name</th>
//                   <th>Last Name</th>
//                   <th>Email</th>
//                    <th>Actions</th> 
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>1</td>
//                   <td>Mark</td>
//                   <td>Otto</td>
//                   <td>@mdo</td>
//                    <td>
//                     <Button variant="primary" size="sm" className="me-2">
//                       Edit
//                     </Button>
//                     <Button variant="danger" size="sm">
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               </tbody>
//         </Table>
//   )
// }

// export default UsersList
