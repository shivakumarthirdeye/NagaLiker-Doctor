import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, path }) => {
  let accessToken = localStorage.getItem('access_token');

  const location = useLocation();

  if (!accessToken) {
    return <Navigate replace to='/' state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
