import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import useClose from '../../hooks/useClose';
import { hideModal } from '../../redux/features/modalSlice';
import { ADD_TEST_MODAL, BOOKING_SUCCESS_MODAL } from '../../utils/constant';
import BookingSuccess from '../ModalComponents/BookingSuccess';
import { useNavigate } from 'react-router-dom';
import AddTestMobileModal from '../ModalComponents/AddTestMobileModal';

const Modal = ({ modalType, modalProps }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ref = useClose(() => {
    if (modalProps?.onClose) {
      navigate(modalProps?.onClose);
    }
    dispatch(hideModal());
  });

  const handleClose = () => {
    if (modalProps?.onClose) {
      navigate('/patients');
    }
    dispatch(hideModal());
  };

  let Component = null;

  switch (modalType) {
    case BOOKING_SUCCESS_MODAL: {
      Component = BookingSuccess;
      break;
    }
    case ADD_TEST_MODAL: {
      Component = AddTestMobileModal;
      break;
    }

    default: {
      Component = null;
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflowX = 'hidden';
      document.body.style.overflowY = 'auto';
    };
  });

  return (
    <div
      className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto  max-h-[100vh] bg-black backdrop bg-opacity-60'
      // style={{
      //   maxHeight: '100vh',
      // }}
    >
      <div
        className='absolute z-10  md:top-[20%]'
        // ref={ref}
      >
        {/* <div className="absolute top-16" ref={ref}> */}
        {/* <div className='w-auto modal' ref={ref}> */}
        <div className='relative  z-10 modal w-screen sm:w-auto sm:min-w-[400px]'>
          {/* <button
            type='button'
            onClick={handleClose}
            className='absolute z-10 flex items-center justify-center w-8 h-8 rounded-full bg-redPrimary dark:bg-opacity-20 bg-opacity-10 text-redPrimary btn-p0 right-5 top-5'
          >
            <FaTimes />
          </button> */}

          {Component !== null && (
            <Component {...{ ...modalProps }} handleClose={handleClose} />
          )}
        </div>
        <div className='empty-space sm:pb-5'></div>
      </div>
    </div>
  );
};

export default Modal;
