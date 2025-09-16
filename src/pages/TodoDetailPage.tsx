import {  Link, useSearchParams } from 'react-router-dom';
import useGetTodoById from '@hooks/useGetTodoById '; // The hook you already created
import LottieHandler from '../components/feedback/LottieHandler/LottieHandler';

const TodoDetailPage = () => {
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id") as string;
  const paramType = searchParams.get("type") as string;
  const paramKey = searchParams.get("key") as string;


    const { data:todo, isLoading, isError } = useGetTodoById(

    +id,
    paramType,
    paramKey
  );


  if (isLoading) return <LottieHandler type="loading" message="Loading Todo..." />;
  if (isError || !todo) return <LottieHandler type="error" message="Could not load todo." />;

  return (
    <div className="container mt-5">
      <Link to="/dashboard">&larr; Back to List</Link>
      <h1 className="mt-3">Todo: {todo.title}</h1>
      <div className="card mt-4">
        <div className="card-body">
          <p><strong>User ID:</strong> {todo.userId}</p>
          <p><strong>Todo ID:</strong> {todo.id}</p>
          <p><strong>Status:</strong> {todo.completed ? 'Completed' : 'Pending'}</p>
        </div>
      </div>
    </div>
  );
};

export default TodoDetailPage;