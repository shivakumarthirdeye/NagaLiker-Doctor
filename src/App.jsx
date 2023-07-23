import AuthLayout from './layout/AuthLayout';
import DefaultLayout from './layout/DefaultLayout';
import PrivateRoute from './PrivateRoute';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import store from './redux/app/store';
import { AllTest } from './pages/AllTest';

// @Lazy import
const Login = lazy(() => import('./pages/auth/login'));
const Register = lazy(() => import('./pages/auth/register'));
const ForgotPassword = lazy(() => import('./pages/auth/forgot-password'));
const ResetPassword = lazy(() => import('./pages/auth/reset-password'));
const VerifyOtp = lazy(() => import('./pages/auth/verify-otp'));
const AllTests = lazy(() => import('./pages/AllTest'));


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div className='text-center'>Loading...</div>}>
          <Routes>
            {/* /auth */}
            <Route exact path='/' element={<Login />} />
            <Route path='/auth/register' element={<Register />} />
            <Route path='auth' element={<AuthLayout />}>
              <Route path='verify-otp' element={<VerifyOtp />} />
              <Route path='forgot-password' element={<ForgotPassword />} />
              <Route path='reset-password' element={<ResetPassword />} />
              <Route
                path='*'
                element={<Navigate to='/auth/login' replace={true} />}
              />
            </Route>

            {/* MAIN (/) */}
            <Route
              path='/*'
              element={
                <PrivateRoute>
                  <DefaultLayout />
                  <Routes>
                    <Route to="/patient/:id" element={<AllTests/>}/>
                  </Routes>
                </PrivateRoute>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default App;
