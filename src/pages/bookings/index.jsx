import React from 'react';
import { Link } from 'react-router-dom';
import BookingMobile from '../../components/booking/BookingMobile';

const Bookings = () => {
  return (
    <>
      <BookingMobile />
      <div className='mainContainer hidden xs:block mt-12'>
        <div className='flex justify-between items-center'>
          <div>
            <h1 className='text-lg font-medium text-black-500 '>
              Today’s Bookings
            </h1>
            <p className='text-[#B5B5C3] mt-2'>No bookings yet!</p>
          </div>
          <div>
            <Link
              to='/new-booking'
              className='bg-primary py-2.5 text-sm px-4 rounded-[10px] text-white font-semibold'
            >
              Book Sample Test
            </Link>
          </div>
        </div>
        {/* No Info */}
        <div className='py-60 flex flex-col items-center justify-center'>
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
        {/* EF No Info */}
      </div>
    </>
  );
};

export default Bookings;
