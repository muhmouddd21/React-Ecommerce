import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { TTodo } from "src/Types/shared";
const API_URL = 'https://jsonplaceholder.typicode.com';


const fetchData = async (q: string): Promise<TTodo[]> => {
  const response = await axios.get(`${API_URL}/todos?q=${q}`);
  return response.data;
};
const useSearch = (q: string): UseQueryResult<TTodo[]> => {
  return useQuery({
    queryKey: ["todos", "search", { q}],
    queryFn: () => fetchData(q),
    enabled: q.length > 0,
    refetchInterval: 1000 * 20,
  });
};

export default useSearch;