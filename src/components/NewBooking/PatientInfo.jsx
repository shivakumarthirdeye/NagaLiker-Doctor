import { Form, Formik, useFormikContext } from 'formik';
import * as Yup from 'yup';
import Input from '../common/Form/Input';
import CustomSelect from '../common/Form/CustomSelect';
import { Link } from 'react-router-dom';
import SubmitBtn from '../common/Form/SubmitBtn';
import 'yup-phone-lite';
import Checkbox from '../common/Form/Checkbox';
import RadioCheckbox from '../common/Form/RadioCheckbox';
import ErrorBox from '../common/Form/ErrorBox';
import Textarea from '../common/Form/Textarea';

const genderOption = [
  { id: 1, value: 'male', label: 'Male' },
  { id: 2, value: 'female', label: 'Female' },
  {
    id: 3,
    value: 'others',
    label: 'Others',
  },
];

const PatientInfo = ({
  currentStep,
  setCurrentStep,
  patientValues,
  setPatientValues,
}) => {
  const initialValues = patientValues || {
    firstName: '',
    lastName: '',
    pat_id: '',
    age: '',
    gender: '',
    mobileNumber: '',
    email: '',
    address: '',
    city: '',
    notes: '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string(),
    pat_id: Yup.string(),
    age: Yup.string().required('Age is required'),
    gender: Yup.string().required('Gender is required'),
    mobileNumber: Yup.string().phone('IN', 'Please enter a valid phone number'),
    email: Yup.string().email('Enter valid email address'),
    address: Yup.string(),
    city: Yup.string(),
    notes: Yup.string(),
  });

  return (
    <div className='px-1.5 xl:px-8'>
      {/* <Prompt when={true} message='Are you sure you want to leave?' /> */}
      <h1 className='text-xl font-medium hidden xs:block'>Basic information</h1>
      <p className='pt-3 text-[#2B2B2B] text-xs'>
        Lorem Ipsum has been the industry's standard dummy text.
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={values => {
          setPatientValues(values);     
          setCurrentStep(2);
        }}
      >
        {formik => {
          const { values, touched, errors } = formik;

          return (
            <Form className='form my-10'>
              <div className='md:grid  grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8 xl:gap-12 gap-y-5'>
                <Input
                  label='Patient First Name*'
                  name='firstName'
                  id='firstName'
                  placeholder='Enter first name'
                />
                <Input
                  label='Last name'
                  name='lastName'
                  id='lastName'
                  placeholder='Enter last name'
                />
                <Input
                  label='Patient ID'
                  name='pat_id'
                  id='pat_id'
                  placeholder='Enter ID'
                />

                <div className='hidden xs:block'>
                  <CustomSelect
                    label='Gender*'
                    name='gender'
                    id='gender'
                    placeholder='Select gender'
                    options={genderOption}
                  />
                </div>
                <div className='xs:hidden my-5'>
                  <h2 className='text-sm'>Select Gender</h2>
                  <div className='flex items-center mt-3 mb-1 justify-between'>
                    {genderOption.map(item => {
                      const { id, label, value } = item;
                      return (
                        <RadioCheckbox
                          key={id}
                          name='gender'
                          id={value}
                          label={label}
                          value={value}
                        />
                      );
                    })}
                  </div>
                  {touched.gender && errors.gender && (
                    <ErrorBox msg={errors.gender} />
                  )}
                </div>
                <Input
                  label='Age*'
                  name='age'
                  id='age'
                  placeholder='Enter Age'
                />
                <Input
                  label='Mobile Number'
                  name='mobileNumber'
                  id='mobileNumber'
                  placeholder='Enter mobile number'
                />
                <Input
                  label='Email'
                  name='email'
                  id='email'
                  placeholder='Enter email address'
                />
                <br className='hidden md:block' />
                <div className='col-span-2'>
                  <Input
                    label='Address'
                    name='address'
                    id='address'
                    placeholder='Enter Address'
                  />
                </div>
                <Input
                  label='City'
                  name='city'
                  id='city'
                  placeholder='Enter City Name'
                />
                <div className='col-span-3'>
                  <Textarea
                    label='Notes'
                    name='notes'
                    id='notes'
                    placeholder='Enter Notes'
                  />
                </div>
              </div>
              <div className='my-5 xs:my-10 flex items-center justify-center space-x-4'>
                <Link
                  to='/'
                  className='py-3 hidden xs:block 
                  text-sm lg:text-base px-8 bg-[#C9C9C9] text-white rounded  font-semibold'
                >
                  Cancel
                </Link>
                <SubmitBtn
                  text='Proceed'
                  className='py-4 xs:!py-3 !w-full  text-sm lg:text-base !px-8 bg-primary xs:max-w-[110px] rounded text-white font-semibold'
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
  );
};

export default PatientInfo;
