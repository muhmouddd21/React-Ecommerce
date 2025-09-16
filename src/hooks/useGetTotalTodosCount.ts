import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

// i will get one item because jsonplaceholder doesn't support head request
const fetchTotalTodosCount = async () => {
  const response = await axios.get(`${API_URL}/todos`, {
    params: { _page: 1, _limit: 1 }, 
  });
  return parseInt(response.headers['x-total-count'], 10);
};

const useGetTotalTodosCount = () => {
  return useQuery({
    queryKey: ['totalTodosCount'],
    queryFn: fetchTotalTodosCount,
    staleTime: Infinity, 
  });
};

export default useGetTotalTodosCount;