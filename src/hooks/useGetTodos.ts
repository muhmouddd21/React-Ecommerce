import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";
import { TStatusType, TTodo } from "src/Types/shared";
const API_URL = 'https://jsonplaceholder.typicode.com';
const PAGE_LIMIT = 10;

interface UseQueryResult<TData> {
  data: TData | undefined;
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
  isStale:boolean
}


 export const getTodos = async (selectedStatus:TStatusType,paginate:number): Promise<TTodo[]> => {
    if(selectedStatus === "all"){
        const response = await axios.get<TTodo[]>(`${API_URL}/todos?_page=${paginate}&_limit=${PAGE_LIMIT}&_sort=id&_order=desc`);
        return response.data;
    }else if(selectedStatus === "Completed"){
        const response = await axios.get<TTodo[]>(`${API_URL}/todos?completed=true&_page=${paginate}&_limit=${PAGE_LIMIT}&_sort=id&_order=desc`);
        return response.data;
    }else{
        const response = await axios.get<TTodo[]>(`${API_URL}/todos?completed=false&_page=${paginate}&_limit=${PAGE_LIMIT}&_sort=id&_order=desc`);
        return response.data;
    }

};
const useGetTodos =(selectedStatus:TStatusType,paginate:number ):UseQueryResult<TTodo[]>=>{
    const {data: todos, isLoading, error, isFetching, isStale } = useQuery({
        queryKey: ['todos',{selectedStatus,paginate}], 
        queryFn: ()=>getTodos(selectedStatus,paginate),    
        staleTime: 1000 * 10,
        refetchInterval:1000 * 15
    });

    // handle search and filter and return filtered if there is not search query
   const filteredTodos = useMemo(() => {
    if (!todos) {
      return []; 
    }
      return todos;
    
  }, [todos]);

    return {
    isLoading,
    isFetching,
    isStale,
    error,
    data: filteredTodos, 
  };
}

export default useGetTodos;

