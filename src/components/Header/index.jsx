import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import HeaderMobile from './HeaderMobile';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import useClose from '../../hooks/useClose';

const navLinks = [
  {
    id: 1,
    name: 'Bookings',
    href: '/new-booking',
    links: ['/new-booking'],
  },
  {
    id: 2,
    name: 'Patients',
    href: '/patients',
  },
  {
    id: 3,
    name: 'All Tests',
    href: '/all-tests',
  },
];

const Header = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = {
    fullName: 'Test Use',
  };

  const [showSidebar, setShowSidebar] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    if (showSidebar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflowX = 'hidden';
      document.body.style.overflowY = 'auto';
    }

    return () => {
      document.body.style.overflowX = 'hidden';
      document.body.style.overflowY = 'auto';
    };
  }, [showSidebar]);

  const ref = useClose(() => setShowLogout(false));
  const logout = () => {
    // dispatch(logoutUser());
    localStorage.removeItem('access_token');
    localStorage.removeItem('access_token')
    navigate('/')
  };
  return (
    <>
      {pathname === '/' && (
        <HeaderMobile
          navLinks={navLinks}
          pathname={pathname}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
      )}
      <header className='bg-primary hidden xs:block   py-2 md:pt-5 md:py-0'>
        <nav className='container text-white font-semibold  flex justify-between items-center space-x-8 '>
          <div className='flex items-center space-x-16'>
            <div>
              <h1 className=' py-4'>
                <Link to='/'>NAGLIKER</Link>
              </h1>
            </div>
            <ul className=' items-center hidden md:flex  lg:space-x-6 xl:space-x-8  '>
              {navLinks.map(link => {
                const { href, id, name, links } = link;
                return (
                  <li
                    className={` relative rounded-t-2xl  px-7 py-4 overflow-hidden ${
                      pathname === href ||
                      links?.includes(pathname) ||
                      links?.includes(`/${pathname.split('/')[1]}`)
                        ? 'bg-white text-primary'
                        : 'text-white'
                    }`}
                    key={id}
                  >
                    <Link to={href}>{name}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div ref={ref} className='hidden md:block relative'>
            <button
              onClick={() => {
                setShowLogout(prev => !prev);
              }}
              className=' flex items-center space-x-4 pb-1.5'
            >
              <h2 className=''>{user.fullName}</h2>
              <div className='h-10 w-10  text-xl font-medium bg-white/[0.08] rounded-md flex items-center justify-center uppercase'>
                {user.fullName[0]}
              </div>
            </button>
            {showLogout && (
              <div className='absolute right-0 shadow-xl bottom-[-50px] '>
                <button
                  onClick={logout}
                  className='bg-primary rounded-lg text-white p-2.5 px-10'
                >
                  Logout
                </button>
              </div>
            )}
          </div>
          <div className='block md:hidden'>
            <button
              className='text-2xl'
              onClick={() => {
                setShowSidebar(prev => !prev);
              }}
            >
              <GiHamburgerMenu />
            </button>
          </div>
        </nav>
      </header>
      {showSidebar && (
        <div
          onClick={() => {
            setShowSidebar(prev => !prev);
          }}
          className='fixed w-screen h-screen bg-black/30 z-10 top-0'
        >
          {' '}
        </div>
      )}
      <Sidebar
        user={user}
        navLinks={navLinks}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        logout={logout}
      />
    </>
  );
};

export default Header;
