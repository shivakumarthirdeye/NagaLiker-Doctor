import { format } from 'date-fns';
import React from 'react';

const BookingSuccess = ({
  handleClose,
  testInfoValues,
  paymentInfo,
  patientValues,
}) => {

  
  
  return (
    <div className='min-h-screen xs:min-h-fit py-[10vh] xs:h-auto p-5 xs:py-6 bg-white sm:w-[520px] rounded-xl '>
      <div className='flex justify-center'>
        <svg
          width='101'
          height='101'
          viewBox='0 0 101 101'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle
            opacity='0.78'
            cx='50.5234'
            cy='50.0952'
            r='50'
            fill='#76E658'
            fillOpacity='0.28'
          />
          <circle
            opacity='0.78'
            cx='50.5234'
            cy='50.0952'
            r='45'
            fill='#76E658'
            fillOpacity='0.28'
          />
          <g clipPath='url(#clip0_883_8461)'>
            <circle cx='50.5234' cy='50.0952' r='37' fill='white' />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M13.5234 50.0952C13.5234 40.2822 17.4216 30.8711 24.3605 23.9323C31.2993 16.9934 40.7104 13.0952 50.5234 13.0952C60.3364 13.0952 69.7475 16.9934 76.6864 23.9323C83.6252 30.8711 87.5234 40.2822 87.5234 50.0952C87.5234 59.9082 83.6252 69.3193 76.6864 76.2582C69.7475 83.197 60.3364 87.0952 50.5234 87.0952C40.7104 87.0952 31.2993 83.197 24.3605 76.2582C17.4216 69.3193 13.5234 59.9082 13.5234 50.0952ZM48.412 65.9312L69.7141 39.3011L65.8661 36.2227L47.7016 58.9209L34.8354 48.2008L31.6781 51.9896L48.412 65.9361V65.9312Z'
              fill='#60BB47'
            />
          </g>
          <defs>
            <clipPath id='clip0_883_8461'>
              <rect
                width='74'
                height='74'
                fill='white'
                transform='translate(13.5234 13.0952)'
              />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className='py-4 '>
        <h1 className='text-2xl text-center font-medium'>
          Booking is Successful
        </h1>
        <p className='text-[#999999] text-center text-sm my-2'>
          Lorem Ipsum has been the industry's standard dummy text.
        </p>
        <div className='border mt-2 rounded-md border-[#F8F8F8] p-3 font-medium'>
          <div className='flex justify-between items-center text-sm mb-3.5'>
            <h2>Booking Date</h2>
            <h1>
              {format(
                new Date(testInfoValues?.pickupTime),
                'do MMM yyyy, h:mm aa'
              )}
            </h1>
          </div>
          {testInfoValues?.tests?.map((item, idx) => {
            const { id, name, price } = item;
            return (
              <div
                key={id}
                className='flex justify-between items-center text-sm mb-4'
              >
                <h2>Test {idx + 1}</h2>
                <h1>{name}</h1>
              </div>
            );
          })}
          <div className='flex justify-between items-center text-sm mb-4'>
            <h2>Mobile Number</h2>
            <h1>{patientValues.mobileNumber}</h1>
          </div>
          <div className='flex justify-between items-center text-sm mb-4'>
            <h2>Total Amount paid</h2>
            <h1 className='text-primary font-semibold'>
              INR.{' '}
              {testInfoValues?.tests?.reduce((accumulator, currentValue) => {
                return (accumulator = accumulator + currentValue.Rate);
              }, -100)}
            </h1>
          </div>
        </div>
        <div className='mt-4'>
          <h1 className='font-medium pb-3'>Payment Method</h1>
          {paymentInfo.paymentMethod === 'online' ? (
            <div className='border rounded-md border-[#F8F8F8]  p-3 font-medium'>
              <div className='flex items-center space-x-3'>
                <div className='w-8 h-8 rounded bg-[#E7FFE0]'></div>
                <h2>Online</h2>
              </div>
            </div>
          ) : (
            <div className='border rounded-md border-[#F8F8F8] mt-4 p-3 font-medium'>
              <div className='flex items-center space-x-3'>
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
            </div>
          )}
        </div>
      </div>
      <div className='flex justify-center'>
        <button
          onClick={handleClose}
          className='bg-[#B82C3A] text-white py-4 rounded-[10px]  font-semibold max-w-sm  w-full'
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default BookingSuccess;
