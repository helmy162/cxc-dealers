import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// components
import LoadingScreen from '../components/loading-screen';
//
import Login from '../pages/auth/LoginPage';
import { useAuthContext } from './useAuthContext';

// redux
import { useDispatch, useSelector } from '../redux/store';
import { getProducts,  } from '../redux/slices/product';
// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized, user} = useAuthContext();
  const { products } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  
  useEffect(() => {
    if(isAuthenticated && (!products || products.length == 0)){
      dispatch(getProducts());
    }
  }, [dispatch, user]);

  const { pathname } = useLocation();

  const [requestedLocation, setRequestedLocation] = useState(null);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Navigate to={'/auth/login'} />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <> {children} </>;
}
