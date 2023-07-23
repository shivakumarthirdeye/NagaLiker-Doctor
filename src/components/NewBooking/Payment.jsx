import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SubmitBtn from '../common/Form/SubmitBtn';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import RadioCheckbox from '../common/Form/RadioCheckbox';
import ErrorBox from '../common/Form/ErrorBox';
import { format } from 'date-fns';
import { BOOKING_SUCCESS_MODAL } from '../../utils/constant';
import { showModal } from '../../redux/features/modalSlice';
import { useDispatch } from 'react-redux';
import { clearTest } from '../../redux/features/newBooking';
import axios from 'axios';
import { API } from '../../config';
import { toast } from 'react-toastify';

const Payment = ({
  currentStep,
  setCurrentStep,
  patientValues,
  testInfoValues,
  setShowConfirmMessage,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    paymentMethod: '',
  };

 const amount =  testInfoValues?.tests?.reduce((accumulator, currentValue) => {
    return (accumulator = accumulator + currentValue.Rate);
  }, -100)

  const TOKEN = localStorage.getItem("access_token");




  const validationSchema = Yup.object({
    paymentMethod: Yup.string().required('Payment Method is required'),
  });

  const handleSubmit = async (values) => {  
    try {
      const response = await axios.post(`${API}/register-web-patience`, {
        patientValues,
        testInfoValues,amount,
        paymentInfo: values
      },{
        headers: { authtoken: `${TOKEN}` }
      });
      console.log("response",response);
      if(response.data.patients){
        setShowConfirmMessage(false);
        dispatch(clearTest());
        dispatch(
          showModal({
            modalType: BOOKING_SUCCESS_MODAL,
            modalProps: {
              testInfoValues: {
                ...testInfoValues,
                pickupTime: new Date(
                  testInfoValues.pickupTime
                ).toISOString(),
              },
              patientValues,
              paymentInfo: values,
              onClose: '/',
            },
          })
        );
      }else{
        if(response.data.errors){
          toast.error("Patient already exists")
        }
      }
    } catch (error) {
      console.error(error); 
      toast.error("Patient already exists")
    }
  };
  return (
    <div className='py-5'>
      <div className='flex flex-col items-center justify-center max-w-lg mx-auto'>
        <div className='border border-[#F8F8F8] mb-5 rounded-md p-2.5 xs:px-5 py-3.5 w-full'>
          <h1 className='text-sm xs:text-base font-medium'>
            Sample Pick up time
          </h1>
          <p className='text-xs xs:text-sm text-[#2B2B2B] pt-1.5'>
            {format(
              new Date(testInfoValues?.pickupTime),
              'do MMM yyyy, h:mm aa'
            )}
            {/* 21st Mar 2023, 3:00 PM */}
          </p>
        </div>
        <div className='border border-[#F8F8F8] rounded-md mb-5  pt-3.5 w-full'>
          <div className=' text-sm xs:text-base border-b border-[#F8F8F8] p-2.5 xs:px-5'>
            <div className='flex justify-between items-center pb-2.5'>
              <h1>Diagnostic Center</h1>
              <p className='font-medium'>Health at Home</p>
            </div>
            <div className='text-sm xs:text-base'>
              {testInfoValues?.tests?.map(test => {
                const { id, name, Rate } = test;
                return (
                  <div
                    key={id}
                    className='flex justify-between items-center pb-2.5'
                  >
                    <h1>{name}</h1>
                    <p className='font-medium text-green'>INR. {Rate}</p>
                  </div>
                );
              })}
            </div>
            <div className='flex justify-between items-center pb-2.5'>
              <h1>Discount</h1>
              <p className='font-medium text-green'>INR. 100</p>
            </div>
          </div>
          <div className='flex text-sm xs:text-base justify-between items-center py-2.5 p-2.5 xs:px-5'>
            <h1>Total Amount</h1>
            <p className='font-medium text-primary'>
              INR.{' '}
              {testInfoValues?.tests?.reduce((accumulator, currentValue) => {
                return (accumulator = accumulator + currentValue.Rate);
              }, -100)}
            </p>
          </div>
        </div>

        <div className='w-full '>
          <h1 className='font-medium  text-sm xs:text-base '>Payment Method</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {formik => {
              const { values, setFieldValue, touched, errors } = formik;
              return (
                <Form className='form my-10'>
                  <button
                    type='button'
                    onClick={e => {
                      setFieldValue('paymentMethod', 'online');
                    }}
                    className='border flex items-center justify-between border-[#F8F8F8] rounded-md mb-5  p-2.5 xs:px-5 py-3.5 w-full'
                  >
                    <div className='flex items-center text-sm xs:text-base   space-x-3'>
                      <div className='w-8 h-8 rounded bg-[#E7FFE0]'></div>
                      <h2>Online</h2>
                    </div>
                    <RadioCheckbox
                      label=''
                      name='paymentMethod'
                      id='paymentMethod'
                      value='online'
                    />
                  </button>
                  <button
                    type='button'
                    onClick={e => {
                      setFieldValue('paymentMethod', 'cash');

                      // setFieldValue({
                      //   paymentMethod: 'cash',
                      // });
                    }}
                    className='border flex items-center  justify-between border-[#F8F8F8] rounded-md mb-5  p-2.5 xs:px-5 py-3.5 w-full'
                  >
                    <div className='flex items-center text-sm xs:text-base  space-x-3'>
                      <div className='w-8 h-8 rounded bg-[#FDF4F4] flex items-center justify-center'>
                        <svg
                          width='19'
                          height='12'
                          viewBox='0 0 19 12'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M9.02344 8.38818C9.62017 8.38818 10.1925 8.15113 10.6144 7.72917C11.0364 7.30722 11.2734 6.73492 11.2734 6.13818C11.2734 5.54145 11.0364 4.96915 10.6144 4.54719C10.1925 4.12524 9.62017 3.88818 9.02344 3.88818C8.4267 3.88818 7.8544 4.12524 7.43245 4.54719C7.01049 4.96915 6.77344 5.54145 6.77344 6.13818C6.77344 6.73492 7.01049 7.30722 7.43245 7.72917C7.8544 8.15113 8.4267 8.38818 9.02344 8.38818Z'
                            fill='#9A0007'
                          />
                          <path
                            d='M0.0234375 1.63818C0.0234375 1.33982 0.141964 1.05367 0.352942 0.842688C0.563921 0.63171 0.850069 0.513184 1.14844 0.513184H16.8984C17.1968 0.513184 17.483 0.63171 17.6939 0.842688C17.9049 1.05367 18.0234 1.33982 18.0234 1.63818V10.6382C18.0234 10.9366 17.9049 11.2227 17.6939 11.4337C17.483 11.6447 17.1968 11.7632 16.8984 11.7632H1.14844C0.850069 11.7632 0.563921 11.6447 0.352942 11.4337C0.141964 11.2227 0.0234375 10.9366 0.0234375 10.6382V1.63818ZM3.39844 1.63818C3.39844 2.23492 3.16138 2.80722 2.73943 3.22917C2.31747 3.65113 1.74517 3.88818 1.14844 3.88818V8.38818C1.74517 8.38818 2.31747 8.62524 2.73943 9.04719C3.16138 9.46915 3.39844 10.0414 3.39844 10.6382H14.6484C14.6484 10.0414 14.8855 9.46915 15.3074 9.04719C15.7294 8.62524 16.3017 8.38818 16.8984 8.38818V3.88818C16.3017 3.88818 15.7294 3.65113 15.3074 3.22917C14.8855 2.80722 14.6484 2.23492 14.6484 1.63818H3.39844Z'
                            fill='#9A0007'
                          />
                        </svg>
                      </div>
                      <h2>Cash</h2>
                    </div>
                    <RadioCheckbox
                      name='paymentMethod'
                      id='paymentMethod'
                      value='cash'
                    />
                  </button>

                  {touched.paymentMethod && errors.paymentMethod && (
                    <ErrorBox msg={errors.paymentMethod} />
                  )}

                  <div className='my-10 flex items-center justify-center space-x-4'>
                    <button
                      onClick={() => {
                        setCurrentStep(2);
                      }}
                      className='py-3 text-sm lg:text-base   px-8 bg-[#C9C9C9] text-white rounded  font-semibold'
                    >
                      Previous
                    </button>
                    <SubmitBtn
                      text='Submit'
                      className='!py-3 text-sm lg:text-base   !px-8 bg-primary max-w-[110px] rounded text-white font-semibold'
                    />
                    {/* <button
              type='submit'
              className='py-3 px-8 bg-primary rounded text-white font-semibold'
            >
              Proceed
            </button> */}
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
      {/* <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={values => {
          // setPatientValues(values);
          // setCurrentStep(2);
        }}
      >
        <Form className='form my-10'>
          <div className='my-10 flex items-center justify-center space-x-4'>
            <button
              onClick={() => {
                setCurrentStep(2);
              }}
              className='py-3 px-8 bg-[#C9C9C9] text-white rounded  font-semibold'
            >
              Previous
            </button>
            <SubmitBtn
              text='Submit'
              className='!py-3.5 !px-8 bg-primary max-w-[110px] rounded text-white font-semibold'
            />
            <button
              type='submit'
              className='py-3 px-8 bg-primary rounded text-white font-semibold'
            >
              Proceed
            </button> 
          </div>
        </Form>
      </Formik> */}
    </div>
  );
};

export default Payment;
