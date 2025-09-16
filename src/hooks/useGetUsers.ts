// import { useQuery, UseQueryResult  } from "@tanstack/react-query";
// import { TRoleType } from "src/Types/shared";
// import api from "@services/axios-global";

// interface DataItem{
//     id:number,
//     firstName:string,
//     lastName:string,
//     email:string
// }

// const fetchData = async(selectedRole:TRoleType):Promise<DataItem[]>=>{

//   if (selectedRole === "all") {
//     const response = await api.get<DataItem[]>("users");
//     return response.data;
//   } else {
//     const response = await api.get<DataItem[]>(
//       `/users?status=${selectedRole}`
//     );
//     return response.data;
//   }
// }   

// const useGetUsers = (selectedRole:TRoleType):UseQueryResult<DataItem[]> => {
//     const query=useQuery({
//         queryKey: ["users", { selectedRole }],
//         queryFn: () => fetchData(selectedRole),
//         staleTime: 1000 * 10,
//     })

//   return query
// }

// export default useGetUsers;
