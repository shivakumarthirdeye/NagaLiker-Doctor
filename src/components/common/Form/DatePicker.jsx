import { useField } from 'formik';
import React, { useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import { FaRegCalendarAlt } from 'react-icons/fa';
import ErrorBox from './ErrorBox';

const DatePicker = ({
  label,
  type,
  placeholder,
  showTime,
  externalValue,
  setExternalValue,
  ...props
}) => {
  const test = useField({ ...props, type });
  const [field, meta, setField] = useField({ ...props, type });

  return (
    <div className='w-full'>
      <label className='block mb-1 text-sm'>{label}</label>

      <div className='relative w-full mb-4'>
        <ReactDatePicker
          showTimeSelect={showTime}
          {...field}
          {...props}
          dateFormat='dd/MM/yy hh:mm a'
          onTouch={setField.setTouched}
          placeholder={placeholder}
          selected={field.value}
          onChange={date => {
            setField.setValue(date);
            if (externalValue) {
              setExternalValue(externalValue => {
                return {
                  ...externalValue,
                  [field.name]: date,
                };
              });
            }
          }}
          className='border border-black/30  text-sm  w-full !py-3 mt-1 rounded-md   pl-12'
        />
        <div className='absolute left-4 top-4'>
          <FaRegCalendarAlt className='text-black/50 text-xl ' />
        </div>
        {meta.touched && meta.error && <ErrorBox msg={meta.error} />}
      </div>
    </div>
  );
};

export default DatePicker;
