import { Formik, Form } from 'formik';
// import React from 'react';
import Input from '../../components/common/Form/Input';
import * as Yup from 'yup';
import { FiLock, FiUser } from 'react-icons/fi';
import Checkbox from '../../components/common/Form/Checkbox';
import { Link, useNavigate } from 'react-router-dom';
import SubmitBtn from '../../components/common/Form/SubmitBtn';
import axios from 'axios';
import { SERVER_URL } from '../../utils/config';
import { API } from '../../config';

const Login = () => {
  const initialValues = {
    email: '',
    password: '',
    stayLoggedIn: true,
  };

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Enter a valid Email')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
    stayLoggedIn: Yup.boolean(),
  });

  const handleSubmit = async (values) => {
    const { email, password } = values; 
  
    try {
      const response = await axios.post(`${API}/web-doctor-login`, {
        email,
        password,
      });
      console.log("response",response);
      if(response?.data?.token){
        localStorage.setItem("access_token",response.data.token)
        localStorage.setItem("user_name",JSON.stringify(response.data.doctor.fullName))
        navigate('/patients')
      }
    } catch (error) {
      console.error(error); 
    }
  };
  

  return (
    <div className='h-screen flex max-w-xl md:max-w-none mx-auto flex-col md:flex-row justify-center md:items-center md:justify-between relative '>
      <p className='absolute hidden md:block bottom-[20px] mb-2 text-sm left-[50%] translate-x-[-50%]'>
        {' '}
        Powered by <span className='font-medium'> Xyz Pvt. Ltd.</span>
      </p>
      <div className='md:flex-1 flex mb-10 md:mb-0 flex-col items-center md:block '>
        <span className='inline-block md:hidden bg-[#B82C3A]/[0.23] h-[45px] w-[45px] rounded'></span>{' '}
        <h2 className='text-lg md:text-4xl'>
          Welcome to{' '}
          <span className='hidden md:inline-block bg-[#B82C3A]/[0.23] h-[80px] w-[90px]'>
            {' '}
          </span>{' '}
          <span className=' text-lg md:text-5xl xl:text-6xl inline md:block font-medium text-primary'>
            PathoPlus
          </span>
        </h2>
      </div>
      <div className='md:flex-1'>
        <h1 className='text-2xl md:text-[40px] font-semibold'>Sign In</h1>
        <p className='text-sm md:text-base mt-3.5'>
          Please Sign in to enjoy our services.
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className='auth-form  max-w-2xl mt-4'>
            <Input
              Icon={FiUser}
              placeholder='User Email'
              name='email'
              id='email'
              type='email'
            />
            <Input
              Icon={FiLock}
              placeholder='Password'
              type='password'
              name='password'
              id='password'
            />

            <div className='flex justify-between items-center'>
              <div className='flex items-center space-x-3'>
                <Checkbox
                  name='stayLoggedIn'
                  id='stayLoggedIn'
                  label='Keep me login'
                />
                <p className='text-xs md:text-sm'> Keep me login</p>
              </div>
              <div>
                <Link
                  to='/auth/forgot-password'
                  className='text-xs md:text-sm text-primary font-medium'
                >
                  Forgot Password ?
                </Link>
              </div>
            </div>
            <SubmitBtn text='Login' className='bg-primary' />
            <p className='text-center text-xs md:text-sm '>
              {' '}
              Don’t Have an account?{' '}
              <Link className=' text-primary font-medium' to='/auth/register'>
                Sign Up
              </Link>{' '}
            </p>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
