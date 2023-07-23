import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { HiOutlineArrowSmLeft, HiSearch } from 'react-icons/hi';
import * as Yup from 'yup';
import CustomSelect from '../common/Form/CustomSelect';
import { useDispatch, useSelector } from 'react-redux';
import { addTest, removeTest } from '../../redux/features/newBooking';
import { useMediaQuery } from 'react-responsive';
import SubmitBtn from '../common/Form/SubmitBtn';

const AddTestMobileModal = ({ handleClose, testsArray }) => {
  const initialValues = {
    reportCategory: '',
    tests: '',
  };

  const validationSchema = Yup.object({
    reportCategory: Yup.string().required('Report Category Name is required'),
    tests: Yup.array()
      .of(
        Yup.object().shape({
          id: Yup.string(),
          name: Yup.string(),
          shortName: Yup.string(),
          price: Yup.number(),
        })
      )
      .required('Tests List is required'),
  });

  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();
  const { tests } = useSelector(state => state.newBooking);

  const isMobile = useMediaQuery({
    query: '(max-width: 450px)',
  });
  useEffect(() => {
    if (!isMobile) {
      handleClose();
    }
  }, [isMobile]);

  return (
    <div className='bg-white min-h-[100dvh] py-4 px-4'>
      {' '}
      <div className='flex justify-between xs:hidden'>
        <div className='flex space-x-3'>
          <button type='button' onClick={handleClose}>
            <HiOutlineArrowSmLeft className='text-3xl' />
          </button>
          <h1 className='text-2xl font-medium  '>Select Test</h1>
        </div>
      </div>
      <Formik initialValues={initialValues} validationSchema={validationSchema}>
        <Form className='my-5'>
          <div className='flex-1'>
            {/* <CustomSelect
              label='Report Category*'
              name='reportCategory'
              id='reportCategory'
              placeholder='Select Report Category'
              options={[
                {
                  label: 'Category Name 1',
                  value: 'Category Name',
                },
                {
                  label: 'Category Name 2',
                  value: 'Category Name 2',
                },
                {
                  label: 'Category Name 3',
                  value: 'Category Name 3',
                },
              ]}
            /> */}
          </div>
          <div>
            <p className='text-[#2B2B2B] text-xs my-5'>
              Select the test to perform
            </p>
            <div className='relative'>
              <input
                value={searchValue}
                onChange={e => {
                  setSearchValue(e.target.value);
                }}
                type='text'
                className='bg-[#F1F1F1] w-full p-3 py-3.5 rounded-md'
                placeholder='Search for test'
              />
              <HiSearch className='absolute top-3 text-3xl text-[#93989B] right-4' />
            </div>

            <div className='mt-5'>
              <h2 className='text-sm mb-4'>Select Test</h2>
              {testsArray
                .filter(testItem => {
                  return testItem.name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
                })
                .map(test => {
                  const { id, name, price, shortName } = test;
                  return (
                    <div
                      onClick={() => {
                        if (tests.findIndex(obj => obj.id === test.id) !== -1) {
                          // setFieldValue('tests', [
                          //   ...tests.filter(obj => obj.id !== test.id),
                          // ]);
                          dispatch(removeTest({ testId: test.id }));
                        } else {
                          dispatch(addTest({ newTest: test }));
                          // setFieldValue('tests', [...tests, test]);
                        }
                      }}
                      as='button'
                      className='border relative cursor-pointer rounded-md mb-5 flex items-center justify-between border-[#F8F8F8] p-3 py-2'
                      key={id}
                    >
                      <div>
                        <h2 className='text-sm'>{name}</h2>
                        <p className='text-xs text-[#ABABAB] py-1'>₹{price}</p>
                      </div>
                      <div>
                        {tests &&
                          tests?.findIndex(obj => obj.id === test.id) !==
                            -1 && (
                            <div className='absolute top-5 right-5'>
                              <svg
                                width='23'
                                height='23'
                                viewBox='0 0 23 23'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <g clipPath='url(#clip0_883_7878)'>
                                  <path
                                    d='M6.94873 11.9486L10.2406 15.055L16.8244 8.39844'
                                    stroke='#27AE60'
                                    strokeWidth='2.88241'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                  />
                                </g>
                                <rect
                                  x='1.31374'
                                  y='1.15359'
                                  width='21.146'
                                  height='21.146'
                                  rx='3.84321'
                                  stroke='#27AE60'
                                  strokeWidth='0.854047'
                                />
                                <defs>
                                  <clipPath id='clip0_883_7878'>
                                    <rect
                                      x='0.886719'
                                      y='0.726562'
                                      width='22'
                                      height='22'
                                      rx='4.27023'
                                      fill='white'
                                    />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                          )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className='fixed bottom-5  max-w-[90vw]  w-full  left-[50%] translate-x-[-50%] '>
            <button
              type='button'
              onClick={handleClose}
              // isSubmitting={!values.tests.length}
              className='!py-4 w-full text-sm lg:text-base !px-8 bg-primary xs:max-w-[110px] rounded text-white font-semibold'
            >
              Proceed
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default AddTestMobileModal;
