import React, { useEffect, useState } from 'react';
import BreadCrumb from '../../../components/common/BreadCrumb';
import { Link, useNavigate } from 'react-router-dom';
import PatientInfo from '../../../components/NewBooking/PatientInfo';
import Investigation from '../../../components/NewBooking/Investigation';
import useExitPrompt from '../../../hooks/useExitPrompt';
import { usePrompt } from '../../../hooks/usePrompt';
import disableBrowserBackButton from 'disable-browser-back-navigation';
import Payment from '../../../components/NewBooking/Payment';
import { HiArrowNarrowLeft, HiOutlineArrowSmLeft } from 'react-icons/hi';
import { current } from '@reduxjs/toolkit';

const steps = [
  { id: 1, name: 'Patient Information' },
  { id: 2, name: 'Investigations' },
  { id: 3, name: 'Payments' },
];

const NewBooking = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showMessage, setShowMessage] = useExitPrompt(false);
  const [patientValues, setPatientValues] = useState(null);

  const [testInfoValues, setTestInfoValues] = useState({
    reportCategory: '',
    sample: '',
    pickupTime: new Date(),
    tests: [],
  });

  usePrompt('Changes that you made may not be saved.', showMessage);

  useEffect(() => {
    if (patientValues) setShowMessage(true);
  }, [patientValues]);

  useEffect(() => {
    if (showMessage) disableBrowserBackButton();
  }, [showMessage]);

  function checkObjectValues(obj) {
    for (let key in obj) {
      if (!obj.hasOwnProperty(key)) {
        continue;
      }

      if (!obj[key]) {
        return false;
      }
    }

    return true;
  }

  return (
    <div>
      {' '}
      <BreadCrumb
        paths={[{ id: 1, name: 'Booking List', to: '/' }]}
        currentPage='New Booking Form'
      />
      <div className='mainContainer'>
        <div className='hidden xs:flex justify-between items-center'>
          <div>
            <h1 className='text-lg font-medium text-black-500 '>Lab Booking</h1>
            <p className='text-[#B5B5C3] mt-2'>Complete all 3 steps</p>
          </div>
          <div>
            <Link
              to='/patients'
              className='bg-primary py-2.5 text-sm px-4 rounded-[10px] text-white font-semibold'
            >
              Back to all
            </Link>
          </div>
        </div>

        <div className='flex justify-between xs:hidden'>
          <div className='flex space-x-3'>
            <button
              onClick={() => {
                if (currentStep === 1) {
                  navigate('/');
                } else {
                  setCurrentStep(step => step - 1);
                }
              }}
            >
              <HiOutlineArrowSmLeft className='text-3xl' />
            </button>
            <h1 className='text-2xl font-medium  '>
              {currentStep === 1
                ? 'Patient details'
                : current === 2
                ? 'Lab Booking'
                : 'Confirmation'}
            </h1>
          </div>

          <div>
            <h2 className='text-xs font-semibold'>
              <span className='text-base  text-primary'>0{currentStep}</span>
              /03
            </h2>
          </div>
        </div>
        <div className='xs:py-20 space-x-1  md:space-x-4 max-w-3xl mx-auto flex items-center justify-center'>
          {steps.map(step => {
            const { id, name } = step;
            return (
              <div
                className={`flex-1 text-sm md: hidden xs:block border-b-4 pb-3  ${
                  currentStep === id
                    ? 'text-black border-black'
                    : currentStep > id
                    ? 'text-green border-none'
                    : 'text-[#C9C9C9] border-[#C9C9C9]'
                }`}
                key={id}
              >
                <h1 className='text-xs md:text-sm font-semibold'>
                  <span className='text-[26px]'>{id}</span>
                  &nbsp; {name}
                </h1>
              </div>
            );
          })}
        </div>
        {currentStep === 1 && (
          <PatientInfo
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            patientValues={patientValues}
            setPatientValues={setPatientValues}
          />
        )}
        {currentStep === 2 && (
          //  patientValues &&
          <Investigation
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            testInfoValues={testInfoValues}
            setTestInfoValues={setTestInfoValues}
          />
        )}
        {currentStep === 3 && (
          // patientValues &&
          // checkObjectValues(testInfoValues) &&
          <Payment
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            testInfoValues={testInfoValues}
            setTestInfoValues={setTestInfoValues}
            patientValues={patientValues}
            setShowConfirmMessage={setShowMessage}
          />
        )}
      </div>
    </div>
  );
};

export default NewBooking;
