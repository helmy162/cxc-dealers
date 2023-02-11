import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer, useCallback, useMemo } from 'react';
// utils
import axios from '../utils/axios';
import localStorageAvailable from '../utils/localStorageAvailable';
//
import { isValidToken, setSession } from './utils';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGIN') {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === 'REGISTER') {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }

  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext(null);

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const storageAvailable = localStorageAvailable();

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';
      const userId = storageAvailable ? localStorage.getItem('userId') : '';

      if (accessToken && userId && isValidToken(accessToken)) {
        setSession(accessToken, userId);

        const response = await axios.get(`admin/users/${userId}`);

        const user = response.data;

        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: true,
            user: {...user.data, role: user.UserType, accessToken: accessToken },
          },
        });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [storageAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email, password) => {
    const response = await axios.post('login', {
      email,
      password,
    });
    const { access_token, user } = response.data;

    setSession(access_token, user?.id);

    dispatch({
      type: 'LOGIN',
      payload: {
        isAuthenticated: true,
        user: {...user, role: user.type, accessToken: access_token },
      },
    });
  }, []);

  // REGISTER
  const register = useCallback(async (email, password, confirmPassword, firstName, lastName) => {
    const response = await axios.post('register', {
      name: `${firstName} ${lastName}`,
      email,
      password,
      password_confirmation: confirmPassword,
    });
    const { accessToken, user } = response.data;

    // localStorage.setItem('accessToken', accessToken);
    setSession(accessToken, user?.id);

    dispatch({
      type: 'REGISTER',
      payload: {
        user: {...user, role: 'dealer' },
      },
    });
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    await axios.post('logout', {});

    setSession(null, '');
    dispatch({
      type: 'LOGOUT',
    });
  }, []);

  const resetPassword = useCallback(async ({ email }) => {
    await axios.post('reset-password', { email })

    sessionStorage.setItem('email-recovery', email);
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      method: 'jwt',
      login,
      register,
      logout,
      resetPassword,
    }),
    [state.isAuthenticated, state.isInitialized, state.user, login, logout, register, resetPassword]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
