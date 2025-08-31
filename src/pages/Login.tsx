import { Heading } from '@components/common';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { SubmitHandler,useForm } from 'react-hook-form';
import { signInSchema,signInType } from 'src/Validations/signInSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import Input from '@components/forms/Input/Input';




export default function Login() {
      const {
        register,
        handleSubmit,
        formState: { errors },

      } = useForm<signInType>({
        mode:"onBlur",
        resolver:zodResolver(signInSchema)
      });
      const submitForm:SubmitHandler<signInType> =(data) =>{
        console.log(data);
        
      }
  return (
    <>
    <Heading title ="User Login" />
     <Row>
      <Col md={{span:"6", offset:"3"}}>
         <Form onSubmit={handleSubmit(submitForm)}>



              <Input 
              label='Email Address'
              name ="email"
              register={register}
              error ={errors.email?.message}
              />
              <Input 
              label='Password'
              name ="password"
              register={register}
              error ={errors.password?.message}
              />

              <Button variant="info" type="submit" className='text-light'>
                Submit
              </Button>
          </Form>
      </Col>
       
      </Row>
    </>
     

  )
}
