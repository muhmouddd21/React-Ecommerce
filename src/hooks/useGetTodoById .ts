import { useQuery,useQueryClient,UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { TTodo } from "src/Types/shared";

const API_URL = 'https://jsonplaceholder.typicode.com';

const fetchTodoById = async (id: number ): Promise<TTodo> => {
  const response = await axios.get<TTodo>(`${API_URL}/todos/${id}`);
  return response.data;
};


const useGetTodoById = (todoId: number | null, paramType:string, paramkey:string):UseQueryResult<TTodo> => {
  const queryClient =useQueryClient()
  let getCachedData: TTodo[] | undefined;
  if(paramType === "paginate"){
     getCachedData = queryClient.getQueryData([
      "todos",
      { paginate: +paramkey, selectedStatus: "all" },
    ]);

  }else if(paramType === "search") {
    
    getCachedData = queryClient.getQueryData([
      "todos",
      "search",
      { q: paramkey },
    ]);
        console.log(getCachedData);
  }
  
  return useQuery({

    queryKey: ['todo', {id:todoId}],
    
    queryFn: () => fetchTodoById(todoId!), 

    initialData: () => {
      if (!getCachedData) {
        return undefined;
      } else {
        const result = getCachedData.find((el) => el.id === todoId);
        return result;
      }
    },

  });
};

export default useGetTodoById;