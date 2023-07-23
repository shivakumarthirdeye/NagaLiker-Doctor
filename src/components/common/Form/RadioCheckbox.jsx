import { useField } from 'formik';
import React from 'react';

const RadioCheckbox = ({ label, ...props }) => {
  const [field, meta, setFn] = useField({ ...props });

  return (
    <div className='flex items-center'>
      <input
        {...field}
        // onFocus={() => {
        //   setFn.setTouched({
        //     [field.name]: true,
        //   });
        // }}
        // onChange={e => {
        //   console.log(e);
        // }}
        checked={field.value === props.value}
        {...props}
        type='radio'
        className='opacity-0 absolute z-10 w-5 h-5 xs:w-8 xs:h-8 cursor-pointer'
      />
      <label
        htmlFor={props.id}
        className='flex items-center  cursor-pointer text-smw xs:text-base lg:text-xl'
      >
        <span className='w-[18px] h-[18px] xs:w-7 xs:h-7 inline-block mr-2 rounded-full border border-grey flex-no-shrink'></span>
        {label && label}
      </label>
    </div>
  );
};

export default RadioCheckbox;
