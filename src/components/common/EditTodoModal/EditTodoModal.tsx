import { useState, useEffect } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import useEditTodo from '@hooks/useEditTodo';
import { TTodo } from 'src/Types/shared';
import GenericModal from '../GenericModal/GenericModal';


interface IEditTodoModalProps {
  show: boolean;
  handleClose: () => void;
  todoToEdit: TTodo | null;
}

const EditTodoModal = ({ show, handleClose, todoToEdit }: IEditTodoModalProps) => {
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);
  const { mutate, isPending, isSuccess, isError, error, reset } = useEditTodo();

  useEffect(() => {
    if (todoToEdit) {
      setTitle(todoToEdit.title);
      setCompleted(todoToEdit.completed);
    } else {
      setTitle('');
      setCompleted(false);
    }
  }, [todoToEdit]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim() || !todoToEdit) return;
    mutate({
      ...todoToEdit,
      title: title,
      completed: completed,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      handleClose();
      reset();
    }
  }, [isSuccess, handleClose, reset]);

  return (
    <GenericModal show={show} onHide={handleClose} title="Edit Todo">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Todo Title</Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Edit the todo title"
              disabled={isPending}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            disabled={isPending}
          />
        </Form.Group>
        {isError && (
          <Form.Text className="text-danger">
            {error instanceof Error ? error.message : 'An unknown error occurred.'}
          </Form.Text>
        )}
      </Form>
      <div className="d-flex justify-content-end mt-3">
        <Button variant="secondary" onClick={handleClose} disabled={isPending}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={isPending || !title.trim()} className="ms-2">
          {isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </GenericModal>
  );
};

export default EditTodoModal;