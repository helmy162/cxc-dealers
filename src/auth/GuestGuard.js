import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
// components
import LoadingScreen from '../components/loading-screen';
//
import { useAuthContext } from './useAuthContext';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default function GuestGuard({ children }) {
  const { isAuthenticated, isInitialized, user} = useAuthContext();

  if (isAuthenticated && user.role === 'admin') {
    return <Navigate to="/dashboard" />;
  }
  else if (isAuthenticated && user.role === 'dealer') {
    return <Navigate to="/dealer" />;
  }
  else if (isAuthenticated && user.role === 'inspector') {
    return <Navigate to="/inspector" />;
  }
  else if (isAuthenticated && user.role === 'closer') {
    return <Navigate to="/dashboard/seller/list" />;
  }
  else if (isAuthenticated && user.role === 'sales') {
    return <Navigate to="/dashboard" />;
  }
  if (!isInitialized) {
    return <LoadingScreen />;
  }

  return <> {children} </>;
}
