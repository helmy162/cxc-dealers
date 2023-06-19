import PropTypes from 'prop-types';
import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// components
import LoadingScreen from '../components/loading-screen';
//
import Login from '../pages/auth/LoginPage';
import { useAuthContext } from './useAuthContext';

// ----------------------------------------------------------------------

AdminGuard.propTypes = {
  children: PropTypes.node,
};

export default function AdminGuard({ children }) {
  const {user} = useAuthContext();

  if (user.role !== 'admin') {
    return <Navigate to={`/${user.role}`} />;
  }

  return <> {children} </>;
}
