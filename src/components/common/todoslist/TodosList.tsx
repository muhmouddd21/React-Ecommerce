import LottieHandler from "@components/feedback/LottieHandler/LottieHandler";
import useGetTodos, { getTodos } from "@hooks/useGetTodos";
import { ColumnDefinition, TStatusType, TTodo } from "src/Types/shared";
import CustomTable from "../CustomTable/CustomTable";
import { useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useSearch from "@hooks/useSearch";
import EditTodoModal from "../EditTodoModal/EditTodoModal";
import useRemoveTodo from "@hooks/useRemoveTodo";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import useGetTotalTodosCount from "@hooks/useGetTotalTodosCount"; 

interface ITodoListProps {
    statusFilter: TStatusType;
    searchQuery: string;
}

const TodosList = ({ statusFilter, searchQuery }: ITodoListProps) => {

    const [paginate, setPaginate] = useState(1);
    const queryClient = useQueryClient();

    const { data: searchedTodos } = useSearch(searchQuery);
    const { isLoading, data: todos, error } = useGetTodos(statusFilter, paginate);
    const { data: totalCount, isLoading: isTotalCountLoading } = useGetTotalTodosCount();

    const [showEditModal, setShowEditModal] = useState(false);
    const [todoToEdit, setTodoToEdit] = useState<TTodo | null>(null);

    const handleShowEditModal = (todo: TTodo) => {
        setTodoToEdit(todo);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setTodoToEdit(null);
        setShowEditModal(false);
    };

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [todoIdToDelete, setTodoIdToDelete] = useState<number | null>(null);
    const { mutate: removeTodoMutation, isPending: isRemoving } = useRemoveTodo();

    const handleShowConfirmModal = (id: number) => {
        setTodoIdToDelete(id);
        setShowConfirmModal(true);
    };

    const handleCloseConfirmModal = () => {
        setTodoIdToDelete(null);
        setShowConfirmModal(false);
    };

    const handleConfirmDelete = () => {
        if (todoIdToDelete !== null) {
            removeTodoMutation(todoIdToDelete);
            handleCloseConfirmModal();
        }
    };

    useEffect(() => {
        const nextPage = paginate + 1;
        const totalPages = totalCount ? Math.ceil(totalCount / 10) : 0;
        if (nextPage > totalPages) return;
        if (searchQuery) return;

        queryClient.prefetchQuery({
            queryKey: ["todos", { "paginate": nextPage, "selectedStatus": statusFilter }],
            queryFn: () => getTodos(statusFilter, nextPage)
        });
    }, [paginate, queryClient, searchQuery, statusFilter, totalCount]);

    const todoColumns: ColumnDefinition<TTodo>[] = [
        { header: 'ID', width: '10%', cell: (todo) => todo.id },
        {
            header: 'Title', width: '60%', cell: (todo) => {
                if (searchQuery.length === 0) {
                    return (
                        <div className="text-truncate">
                            <Link to={`/todos?id=${todo.id}&type=paginate&key=${paginate}`}>{todo.title}</Link>
                        </div>
                    );
                } else {
                    return (
                        <div className="text-truncate">
                            <Link to={`/todos?id=${todo.id}&type=search&key=${searchQuery}`}>{todo.title}</Link>
                        </div>
                    );
                }
            }
        },
        {
            header: 'Status',
            cell: (todo) => (
                <div className="d-flex justify-content-center">
                    <span className={`badge ${todo.completed ? 'bg-success' : 'bg-warning'}`}>
                        {todo.completed ? 'Completed' : 'Pending'}
                    </span>
                </div>
            ),
            width: '10%'
        },
        {
            header: 'Actions',
            width: '20%',
            cell: (todo) => (
                <div className="d-flex justify-content-center">
                    <Button variant="info" size="sm" onClick={() => handleShowEditModal(todo)}>
                        Edit
                    </Button>
                    <Button variant="danger" size="sm" className="ms-2" onClick={() => handleShowConfirmModal(todo.id)} disabled={isRemoving}>
                        Remove
                    </Button>
                </div>
            )
        }
    ];

    // Combine loading states for a single loading screen.
    if (isLoading || isTotalCountLoading) {
        return (
            <div className="d-flex justify-content-center mt-4">
                <LottieHandler type="loading" message="Loading ..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="d-flex justify-content-center mt-4">
                <LottieHandler type="error" message={error.message || "An error occurred"} />
            </div>
        );
    }

    const dataToDisplay = searchQuery.length > 0 ? searchedTodos : todos;

    // Calculate total pages only after totalCount is available.
    const totalPages = totalCount ? Math.ceil(totalCount / 10) : 0;
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="container mt-2">
            {/* Conditionally render the table or "no results" message */}
            {dataToDisplay && dataToDisplay.length > 0 ? (
                <>
                    <CustomTable data={dataToDisplay} columns={todoColumns} />

                    {/* Show pagination buttons only if not searching */}
                    {searchQuery.length === 0 && totalPages > 1 && (
                        <ButtonGroup aria-label="Pagination">
                            {pageNumbers.map(page => (
                                <Button
                                    key={page}
                                    variant={paginate === page ? "primary" : "light"}
                                    onClick={() => setPaginate(page)}
                                >
                                    {page}
                                </Button>
                            ))}
                        </ButtonGroup>
                    )}
                </>
            ) : (
                <div className="d-flex justify-content-center mt-4">
                    <LottieHandler type="empty" message="No Results Found" />
                </div>
            )}

            <EditTodoModal
                show={showEditModal}
                handleClose={handleCloseEditModal}
                todoToEdit={todoToEdit}
            />
            <ConfirmDeleteModal
                show={showConfirmModal}
                handleClose={handleCloseConfirmModal}
                handleConfirm={handleConfirmDelete}
                message="Are you sure you want to delete this todo?"
            />
        </div>
    );
};

export default TodosList;