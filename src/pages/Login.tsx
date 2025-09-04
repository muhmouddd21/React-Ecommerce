import { Heading } from '@components/common';
import { Col, Row } from 'react-bootstrap';
import {Button,Form,Alert,Spinner} from 'react-bootstrap';
import { SubmitHandler,useForm } from 'react-hook-form';
import { signInSchema,signInType } from '@validations/signInSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import Input from '@components/forms/Input/Input';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import ThunkAuthLogin from '@store/Auth/Thunk/ThunkAuthLogin';
import { useEffect } from 'react';
import { resetUI } from '@store/Auth/authSlice';




export default function Login() {
  const [searchParams,setSearchParams]=useSearchParams();
  const navigate =useNavigate();
  const dispatch = useAppDispatch();
    const { error, loading, jwt } = useAppSelector((state) => state.AuthSlice);
      const {
        register,
        handleSubmit,
        formState: { errors },

      } = useForm<signInType>({
        mode:"onBlur",
        resolver:zodResolver(signInSchema)
      });
      const submitForm:SubmitHandler<signInType> =(data) =>{
          if (searchParams.get("message")) {
            setSearchParams("");
          }
        dispatch(ThunkAuthLogin(data)).unwrap().then(()=>{
          navigate('/');
        })
        
      }
      useEffect(()=>{

        return ()=>{
          dispatch(resetUI());  
        }
      },[dispatch])


    if (jwt) {
      return <Navigate to="/" />;
    }
  return (
    <>
    <Heading title ="User Login" />
     <Row>

      <Col md={{span:"6", offset:"3"}}>

        {searchParams.get('message') === 'login_required' &&
          <Alert variant="info">
              You don't authorize to go here, please login first
            </Alert>
          
        }


          {searchParams.get('message') === "account_created" &&
          (
            <Alert variant="success">
              Your account successfully created, please login
            </Alert>
          )}
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
              type='password'
              />
              
              
              <Button variant="info" type="submit" className='text-light'>
                {loading === "pending" ?
                <>
                    <Spinner animation='border' size='sm' /> 
                    Loading... 
                </>
                 : ('Submit')}
                
              </Button>
              {error && (
                <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
              )}
          </Form>
      </Col>
       
      </Row>
    </>
     

  )
}
