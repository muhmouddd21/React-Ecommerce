import { useState, useEffect } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import useAddTodo from '@hooks/useAddTodo'; 

interface IAddTodoModalProps {
  show: boolean;
  handleClose: () => void;
}

const AddTodoModal = ({ show, handleClose }: IAddTodoModalProps) => {

  const [title, setTitle] = useState('');

  const { mutate, isPending, isSuccess, isError, error, reset } = useAddTodo(); 
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim()) return;

    mutate({
      userId: 1,
      title: title,
      completed: false,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setTitle(''); 
      handleClose(); 
      // Reset the mutation state after a successful submission
      reset(); 
    }
  }, [isSuccess, handleClose, reset]);

  //  reset the state when the modal is closed to handle cases where the user closes the modal without submitting
  useEffect(() => {
    if (!show) {
      setTitle('');
      reset(); 
    }
  }, [show, reset]);


  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add a New Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Todo Title</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What needs to be done?"
                disabled={isPending}
                autoFocus 
              />
            </InputGroup>
            {isError && (
              <Form.Text className="text-danger">
                {error instanceof Error ? error.message : 'An unknown error occurred.'}
              </Form.Text>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={isPending}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={isPending || !title.trim()}>
          {isPending ? 'Adding...' : 'Add Todo'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddTodoModal;