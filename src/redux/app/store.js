import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '../features/modalSlice';
import newBookingReducer from '../features/newBooking';

const store = configureStore({
  reducer: {
    modal: modalReducer,
    newBooking: newBookingReducer,
  },
  devTools: import.meta.env.MODE !== 'production',
});

export default store;
