import { Heading } from '@components/common';
import { Col, Row,Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { SubmitHandler,useForm } from 'react-hook-form';
import { signUpSchema, signUpType } from '@validations/signUpSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import Input from '@components/forms/Input/Input';
import useCheckEmailForAvailability from '@hooks/useCheckEmailForAvailability';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import thunkAuthRegister from '@store/Auth/Thunk/ThunkAuthRegister';
import { useNavigate } from 'react-router-dom';



export default function Register() {
  const dispatch = useAppDispatch();
  const {loading,error}=useAppSelector(state=> state.AuthSlice)
  const navigate = useNavigate();

      const {
        register,
        handleSubmit,
        formState: { errors },
        getFieldState,
        trigger,

      } = useForm<signUpType>({
        mode:"onBlur",
        resolver:zodResolver(signUpSchema)
      });

    
const {emailAvailabilityStatus,enteredEmail,checkEmailAvailability,resetEmailAvailability} =useCheckEmailForAvailability();
const submitForm:SubmitHandler<signUpType> =(data) =>{
    const { firstName, lastName, email, password } = data;
    dispatch(thunkAuthRegister({firstName, lastName, email, password}))
    .unwrap()
    .then(()=>{
      navigate("/login?message=account_created");
    })
  
}
const emailOnBlurHandler =async (e:React.FocusEvent<HTMLInputElement>)=>{
  await trigger('email');
  const {invalid,isDirty}=getFieldState('email');
  const value = e.target.value;
  if(!invalid && isDirty && value !== enteredEmail){
    checkEmailAvailability(value)
  }
  if(enteredEmail && isDirty && invalid){
    resetEmailAvailability();
  }
  
}


  return (
    <>
    <Heading title ="User Registration" />
     <Row>
      <Col md={{span:"6", offset:"3"}}>
         <Form onSubmit={handleSubmit(submitForm)}>

              <Input 
              label='First Name'
              name ="firstName"
              register={register}
              error ={errors.firstName?.message}
              />

              <Input 
              label='Last Name'
              name ="lastName"
              register={register}
              error ={errors.lastName?.message}
              />
              <Input 
              label='Email Address'
              name ="email"
              register={register}
              error ={errors.email?.message ? errors.email?.message : 
              emailAvailabilityStatus==="notAvailable" ? "This email is already in use." :
               emailAvailabilityStatus === "failed" ? "Error from the server." : ""}
              onBlur= {emailOnBlurHandler}
              success={emailAvailabilityStatus === "available" ? "This email is available for use." : "" }
              formText={emailAvailabilityStatus ==="checking" ? "We're currently checking the availability of this email address. Please wait a moment." : ""}
              disabled={emailAvailabilityStatus=== "checking" ? true: false}    
              />
              <Input 
              label='Password'
              name ="password"
              type='password'
              register={register}
              error ={errors.password?.message}
              />
              <Input 
              label='Confirm Password'
              name ="confirmPassword"
              type='password'
              register={register}
              error ={errors.confirmPassword?.message}
              />

               <Button 
                variant="info" 
                type="submit" 
                className='text-light' 
                disabled={emailAvailabilityStatus === "checking" ? true : false}
              >
              {loading === "pending" ? (
                <>
                  <Spinner animation="border" size="sm" />
                  Loading...
                </>
              ) : (
                'Submit'
              )}
                
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
