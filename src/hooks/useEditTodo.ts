import { useMutation, useQueryClient, QueryKey } from "@tanstack/react-query";
import axios from "axios";
import { TTodo } from "src/Types/shared";

const API_URL = 'https://jsonplaceholder.typicode.com';

interface EditMutationContext {
  previousQueries: [QueryKey, TTodo[] | undefined][];
}

const editTodo = async (todo: TTodo): Promise<TTodo> => {
  const { data } = await axios.put<TTodo>(`${API_URL}/todos/${todo.id}`, todo);
  return data;
};

const useEditTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<TTodo, Error, TTodo, EditMutationContext>({
    mutationFn: editTodo,
    
    onMutate: async (editedTodo: TTodo) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      await queryClient.cancelQueries({ queryKey: ['todo', { id: editedTodo.id }] });

      const previousQueries = queryClient.getQueriesData<TTodo[]>({ queryKey: ['todos'] });

      previousQueries.forEach(([queryKey, data]) => {
        if (data && Array.isArray(data)) {
          queryClient.setQueryData<TTodo[]>(queryKey, (old) =>
            old?.map(todo =>
              todo.id === editedTodo.id
                ? editedTodo
                : todo
            )
          );
        }
      });
      
      queryClient.setQueryData(['todo', { id: editedTodo.id }], editedTodo);

      return { previousQueries };
    },

    onError: (_, __, context) => {
      if (context?.previousQueries) {
        context.previousQueries.forEach(([queryKey, previousData]) => {
          queryClient.setQueryData(queryKey, previousData);
        });
      }
    },

    // Remove the invalidateQueries calls from onSettled
    onSettled: () => {
        // No action needed here to prevent refetching the original data
    },
  });
};

export default useEditTodo;