import React, { useEffect, useState } from 'react';
import { Field, useField } from 'formik';
import ErrorBox from './ErrorBox';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Input = ({ label, type, placeholder, Icon, ...props }) => {
  const [field, meta, setFn] = useField({ ...props, type });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='form-group  mb-6 xs:mb-5 relative'>
      {label && (
        <label
          className={`${
            props.disabled && 'opacity-60'
          } text-[#181C32] hidden xs:block mb-1.5 text-sm font-medium   `}
        >
          {label}
        </label>
      )}
      {Icon && (
        <Icon className='text-xl md:text-[24px] text-[#93989B] absolute left-2.5 top-4 ' />
      )}
      <input
        {...field}
        {...props}
        type={showPassword && type === 'password' ? 'text' : type}
        placeholder={placeholder}
        className={Icon && '!pl-12'}
      />
      {type === 'password' && (
        <div className='absolute right-4 top-[15px]'>
          <button type='button' onClick={() => setShowPassword(prev => !prev)}>
            {!showPassword ? (
              <AiOutlineEyeInvisible size={22} className='text-[#93989B]' />
            ) : (
              <AiOutlineEye size={22} className='text-[#93989B]' />
            )}
          </button>
        </div>
      )}
      {meta.touched && meta.error && <ErrorBox msg={meta.error} />}
    </div>
  );
};

export default Input;
