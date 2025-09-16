import { useMutation, useQueryClient, QueryKey } from "@tanstack/react-query";
import axios from "axios";
import { TTodo } from "src/Types/shared";

const API_URL = 'https://jsonplaceholder.typicode.com';

interface RemoveMutationContext {
  previousQueries: [QueryKey, TTodo[] | undefined][];
}

const removeTodo = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/todos/${id}`);
};

const useRemoveTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number, RemoveMutationContext>({
    mutationFn: removeTodo,

    onMutate: async (todoId: number) => {

      await queryClient.cancelQueries({ queryKey: ['todos'] });
      await queryClient.cancelQueries({ queryKey: ['todo', { id: todoId }] });


      const previousQueries = queryClient.getQueriesData<TTodo[]>({ queryKey: ['todos'] });


      previousQueries.forEach(([queryKey, data]) => {
        if (data && Array.isArray(data)) {
          queryClient.setQueryData<TTodo[]>(queryKey, (old) =>
            old?.filter(todo => todo.id !== todoId)
          );
        }
      });


      return { previousQueries };
    },

    onError: (_, __, context) => {

      if (context?.previousQueries) {
        context.previousQueries.forEach(([queryKey, previousData]) => {
          queryClient.setQueryData(queryKey, previousData);
        });
      }
    },

    onSettled: () => {},
  });
};

export default useRemoveTodo;