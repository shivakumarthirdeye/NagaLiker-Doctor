import { Formik, Form } from 'formik';
import Input from '../../components/common/Form/Input';
import * as Yup from 'yup';
import SubmitBtn from '../../components/common/Form/SubmitBtn';

const ResetPassword = () => {
  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords must match'
    ),
  });
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
        <h1 className='text-2xl md:text-[40px] font-semibold'>
          Reset Password
        </h1>
        <p className='text-sm md:text-base mt-3.5'>
          You can enter the new password here
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={values => {
            console.log(values);
          }}
        >
          <Form className='auth-form   max-w-2xl mt-4'>
            <Input
              placeholder='Enter New Password'
              name='password'
              id='password'
              type='password'
            />
            <Input
              placeholder='Confirm Password'
              name='confirmPassword'
              id='confirmPassword'
              type='password'
            />

            <SubmitBtn text='Submit' className='bg-primary' />
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ResetPassword;
