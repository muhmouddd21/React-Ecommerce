import Form from 'react-bootstrap/Form';
import { FieldValues,Path, UseFormRegister } from 'react-hook-form';

type InputProps<TFieldValue extends FieldValues>={
    label:string;
    name:Path<TFieldValue>;
    register: UseFormRegister<TFieldValue>;
    error?: string;
    type?: string;

}

const Input= <TFieldValue extends FieldValues>({
  label,
  name,
  type = "text",
  register,
  error,

}: InputProps<TFieldValue>) => {
  return (
         
              <Form.Group className="mb-3" >
                <Form.Label>{label}</Form.Label>
                <Form.Control type={type} isInvalid={error ? true:false} {...register(name)} />
                <Form.Control.Feedback type="invalid">
                  {error}
                </Form.Control.Feedback>
       
              </Form.Group>
        
  )
}

export default Input
