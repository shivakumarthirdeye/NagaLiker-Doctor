import React from 'react';
import homeImg from '/assets/images/home-hand.png';
import homeStats from '/assets/images/home-stats.png';
import { Link } from 'react-router-dom';

const BookingMobile = () => {
  return (
    <div className='block xs:hidden overflow-x-hidden'>
      <div className='relative bg-[#8F3E97] py-6 px-8 rounded-lg'>
        <div>
          <svg
            className='absolute right-28 top-10 '
            width='20'
            height='15'
            viewBox='0 0 20 15'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M1.83765 14.6636L1.29642 13.5412C-1.04552 8.68485 1.07595 3.0324 6.03485 0.916142V0.916142C10.9937 -1.20012 16.9123 1.0212 19.2542 5.87759L19.7954 6.99992L1.83765 14.6636Z'
              fill='#9A0007'
              fillOpacity='0.2'
            />
          </svg>

          <svg
            className='absolute right-0 bottom-0'
            width='130'
            height='135'
            viewBox='0 0 130 135'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M129.941 0.513184H67.7932C30.6863 0.513184 0.605285 30.5943 0.605285 67.7012V70.2212C0.605285 105.936 29.5581 134.889 65.2732 134.889V134.889C100.988 134.889 129.941 105.936 129.941 70.2211V0.513184Z'
              fill='#9A0007'
              fillOpacity='0.2'
            />
          </svg>

          <img className='absolute right-[-23px] ' src={homeImg} alt='' />
          <img
            className='absolute  right-3.5 bottom-7 '
            src={homeStats}
            alt=''
          />
        </div>
        <div className=' text-white '>
          <h1 className='font-semibold '>
            Dummy content <br /> can be added here
          </h1>
          <p className='text-white/80 text-xs py-2'>Dummy content added here</p>
          <Link
            to='/new-booking'
            className='bg-primary block rounded-lg mt-4 py-3.5  text-sm uppercase font-semibold max-w-[200px] w-full text-center'
          >
            Book sample Test
          </Link>
        </div>
      </div>
      <div className='flex my-10 justify-between items-center'>
        <div>
          <h1 className='text-lg font-medium text-black-500 '>
            Today’s Bookings
          </h1>
          <p className='text-[#B5B5C3] mt-1'>No bookings yet!</p>
        </div>
      </div>
      <div className='py-20 w-full flex flex-col items-center justify-center'>
        <Link
          to='/new-booking'
          className='bg-primary py-2.5 text-sm px-4 rounded-[10px] text-white font-semibold'
        >
          Book Sample Test
        </Link>
        <div className='text-center mt-3'>
          <h1 className='text-lg  font-medium text-black-500 '>
            No Bookings Yet
          </h1>
          <p className='text-[#B5B5C3] mt-1'>Book for a sample test now!</p>
        </div>
      </div>
    </div>
  );
};

export default BookingMobile;
