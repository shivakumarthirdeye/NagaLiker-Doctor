/* eslint-disable react/prop-types */
import { useField, useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import Select, { components } from 'react-select';
import ErrorBox from './ErrorBox';

const CustomSelect = ({
  label,
  type,
  placeholder,
  options,
  disabled,
  isLoading,
  externalValue,
  setExternalValue,
  form,
  ...props
}) => {
  const [field, meta, { setValue, setError, setTouched }] = useField({
    ...props,
    type,
  });
  const { values } = useFormikContext();
  const onChange = ({ value }) => {
    setValue(value);
  };


  

  

  return (
    <div className='form-group mb-5 w-full'>
      <label className={`${disabled && 'opacity-60'} text-sm block mb-2 text`}>
        {label}
      </label>
      <Select
        options={options}
        {...props}
        value={
          values[field.name] && {
            label:
              values[field.name].charAt(0).toUpperCase() +
              values[field.name].slice(1),
            value: values[field.name],
          }
        }
        onChange={onChange}
        onBlur={setTouched}
        placeholder={placeholder}
        components={{ IndicatorSeparator: null }}
        styles={{
          control: (styles, { data, isDisabled, isFocused, isSelected }) => ({
            ...styles,
            border: '1px solid rgba(0, 0, 0, 0.3)',
            boxShadow: 'none',
            fontSize: '14px',
            borderRadius: '6px',
            padding: '4px 7px',
            color: '#000',
            fontWeight: '500',
            cursor: 'pointer',
            opacity: isDisabled && '0.7',
            '&:hover': {
              border: '1px solid rgba(0, 0, 0, 0.3)',
            },
          }),
          option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
              ...styles,
              fontSize: '15px',
              cursor: 'pointer',
              background: isSelected
                ? '#B82C3A'
                : isFocused
                ? '#b82c3a27'
                : 'none',

              ':active': {
                background: '#B82C3A',
                color: '#fff',
              },
            };
          },

          placeholder: style => ({
            ...style,
            fontSize: '14px',
            color: 'rgba(0, 0, 0, 0.5)',
            margin: '0',
          }),
        }}
      />
      {meta.touched && meta.error && <ErrorBox msg={meta.error} />}
    </div>
  );
};

export default CustomSelect;
