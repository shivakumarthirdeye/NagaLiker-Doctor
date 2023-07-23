import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tests: [],
};

const newBooking = createSlice({
  name: 'newBooking',
  initialState,
  reducers: {
    addTest: (state, action) => {
      console.log('🚀 ~ file: newBooking.js:20 ~ action:', action);

      const { newTest } = action.payload;
      state.tests = [...state.tests, newTest];
    },
    removeTest: (state, action) => {
      const { testId } = action.payload;

      state.tests = state.tests.filter(test => test.id !== testId);
    },
    clearTest: (state, action) => {
      state.tests = [];
    },
  },
});

// action creators
export const { addTest, removeTest, clearTest } = newBooking.actions;

// reducer
export default newBooking.reducer;
