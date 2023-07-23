import React from 'react';
import { Link } from 'react-router-dom';

const BreadCrumb = ({ paths, currentPage }) => {
  return (
    <div className=' hidden xs:flex py-3 pb-5 items-center '>
      {paths.map((path, i) => {
        return (
          <div key={i} className='text-[#B5B5C3] text-sm '>
            <Link to={path.to}>{path.name}</Link>
            <span>&nbsp; / &nbsp;</span>
          </div>
        );
      })}
      <h3 className='text-primary text-sm font-medium'>{currentPage}</h3>
    </div>
  );
};

export default BreadCrumb;
