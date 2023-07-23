/* eslint-disable react/prop-types */
import { Formik, Form } from 'formik';
import Input from '../../components/common/Form/Input';
import * as Yup from 'yup';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import SubmitBtn from '../../components/common/Form/SubmitBtn';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { SERVER_URL } from '../../utils/config';
import { toast } from 'react-toastify';
import { API } from '../../config';

const VerifyOtp = ({details}) => {
  // const { state } = useLocation();
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const {email,
    fullName,
    phoneNumber,
    city,
    address,
    password,
    hospitalName}=details;
  const initialValues = {
    otp: '',
  };

  const validationSchema = Yup.object({
    otp: Yup.number().typeError('OTP must be a number').required('OTP is required'),
  });
  

  const handleSubmit = async (values) => {
    const {
      otp
    } = values;

    try {
      const response = await axios.post(`${API}/verify-web-doctorotp`, {
        email,
        fullName,
        phoneNumber,
        city,
        address,
        password,
        hospitalName,otp,
      });
      if(response.data.message==="OTP verified successfully"){
         toast.success("OTP verified successfully")
         navigate('/')
      }else{
        if(response.data.error==="Failed to verify OTP")
        toast.error("Failed To  verify OTP")
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed To  verify OTP ")
    }
  };

  return (
    <div className='py-20 md:h-screen flex max-w-xl md:max-w-none mx-auto flex-col md:flex-row justify-center md:items-center md:justify-between relative '>
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
        <h1 className='text-2xl md:text-[40px] font-semibold'>Verify OTP</h1>
        <p className='text-sm md:text-base mt-3.5'>
          OTP has sent to your registered email address
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className='auth-form   max-w-2xl mt-4'>
            <Input placeholder='Enter OTP' name='otp' id='otp' type='number' />

            <SubmitBtn text='Verify' className='bg-primary' />
            <p className='text-center text-xs md:text-sm '>
              {' '}
              Didn’t received?
              <button type='button' className=' text-primary font-medium'>
                &nbsp;Resend OTP
              </button>{' '}
            </p>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default VerifyOtp;
