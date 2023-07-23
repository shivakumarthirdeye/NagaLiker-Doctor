import React from 'react';

const ErrorBox = ({ msg, font }) => {
  return <p className={` text-red-600  text-xs  mt-2`}>*{msg}</p>;
};

export default ErrorBox;
