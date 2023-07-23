import { Transition } from '@headlessui/react';
import React, { useEffect } from 'react';
import { MdLogout } from 'react-icons/md';
import { useMediaQuery } from 'react-responsive';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = ({ user, navLinks, showSidebar, setShowSidebar, logout }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({
    query: '(max-width: 450px)',
  });
  const isLap = useMediaQuery({
    query: '(max-width: 768px)',
  });

  const handleLogout = ()=>{
    localStorage.removeItem('access_token')
  }

  useEffect(() => {
    if (!isLap) setShowSidebar(false);
  }, [isLap]);

  return (
    <aside>
      <Transition
        show={showSidebar}
        enter='transition ease-in-out duration-300 transform'
        enterFrom={`${
          isMobile ? '-translate-x-full' : 'translate-x-full'
        }   opacity-0 `}
        enterTo={` ${
          isMobile ? '-translate-x-0' : 'translate-x-0'
        }   opacity-100`}
        leave='transition ease-in-out duration-300 transform'
        leaveFrom='translate-x-0 opacity-100'
        leaveTo={` ${
          isMobile ? '-translate-x-full' : 'translate-x-full'
        }   opacity-0`}
        className={`fixed  top-0  bottom-0  max-w-md  w-full   text-white bg-[#B82C3A] ${
          isMobile ? 'left-0' : 'right-0'
        } z-20   `}
      >
        <div className='py-8 px-7'>
          <div className='flex items-center justify-between'>
            <h1 className='font-semibold'>NAGLIKER</h1>
            <button
              onClick={() => {
                setShowSidebar(prev => !prev);
              }}
            >
              <svg
                width={18}
                height={18}
                viewBox='0 0 18 18'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M1 17L17 1M1 1L17 17'
                  stroke='white'
                  strokeWidth={1.88067}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </div>
          <div className='my-4 mt-7 flex justify-between items-center'>
            <div className=' flex items-center space-x-4 pb-1.5'>
              <div className='h-10 w-10  text-xl font-medium bg-white/[0.08] rounded-md flex items-center justify-center'>
                {user.fullName[0]}
              </div>
              <h2 className=''>{user.fullName}</h2>
            </div>
            <div>
              <svg
                width='9'
                height='14'
                viewBox='0 0 9 14'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M1.9749 0.849952L8.1499 7.02495L1.9749 13.2L0.749902 11.975L5.6999 7.02495L0.749902 2.07495L1.9749 0.849952Z'
                  fill='white'
                />
              </svg>
            </div>
          </div>
          <div className='h-[0.5px] w-full bg-white  my-5 '></div>
          <ul className=''>
            {navLinks.map(link => {
              const { href, id, name, links } = link;
              return (
                <li
                  onClick={() => {
                    setShowSidebar(prev => !prev);
                    navigate(href);
                  }}
                  className={` flex cursor-pointer justify-between items-center w-full py-3 overflow-hidden ${
                    pathname === href ||
                    links?.includes(pathname) ||
                    links?.includes(`/${pathname.split('/')[1]}`)
                      ? 'text-white font-bold'
                      : 'text-white'
                  }`}
                  key={id}
                >
                  <h3>{name}</h3>
                  {/* <Link to={href}>{name}</Link> */}
                  <svg
                    width='9'
                    height='14'
                    viewBox='0 0 9 14'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M1.9749 0.849952L8.1499 7.02495L1.9749 13.2L0.749902 11.975L5.6999 7.02495L0.749902 2.07495L1.9749 0.849952Z'
                      fill='white'
                    />
                  </svg>
                </li>
              );
            })}
          </ul>
        </div>
        <div className='px-8 fixed bottom-10'>
          <button onClick={logout} className='flex items-center space-x-4 '>
            <span className='h-9 w-9 bg-white rounded flex items-center justify-center'>
              <MdLogout className='text-primary text-xl' />
            </span>
            <span onClick={handleLogout}>Logout</span>
          </button>
        </div>
      </Transition>
    </aside>
  );
};

export default Sidebar;
