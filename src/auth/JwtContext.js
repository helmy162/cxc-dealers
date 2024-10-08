import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer, useCallback, useMemo } from 'react';
// utils
import axios from '../utils/axios';
import localStorageAvailable from '../utils/localStorageAvailable';
//
import { isValidToken, setSession } from './utils';

import Pusher from "pusher-js";

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
  pusher: null,
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
      pusher: action.payload.pusher,
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
      isAuthenticated: false,
      user: null,
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

        const response = await axios.get(`profile`);

        const user = response.data;

        const access_token = accessToken;
        const PUSHER_APP_KEY = "9d45400630a8fa077501";
        const chanelAuthEndpoint =
          "https://api.carsxchange.com/api/v1/pusher/auth-channel";
        let pusher = new Pusher(PUSHER_APP_KEY, {
          cluster: "eu",
          channelAuthorization: {
            endpoint: chanelAuthEndpoint,
            transport: "ajax",
            params: {},
            headers: {
              authorization: `Bearer ${access_token}`,
            },
          },
        });

        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: true,
            user: {...user, role: user.type, accessToken: accessToken },
            pusher: pusher,
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
    initialize();
  }, []);

  // REGISTER
  const register = useCallback(async (email, password, confirmPassword, firstName, lastName, phone) => {
    const response = await axios.post('register', {
      name: `${firstName} ${lastName}`,
      phoneNumber: phone,
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
        isAuthenticated: false,
        user: null,
      },
    });

    login(email, password)
  }, []);

  // LOGOUT
  const logout = useCallback(async () => {
    await axios.post('logout', {});

    setSession(null, '');
    dispatch({
      type: 'LOGOUT',
    });
  }, []);

  // Reset Password
  const resetPassword = useCallback(async ( email ) => {
      const response = await axios.post('reset-password', {email});
  }, []);

  // Set New Password
  const newPassword = useCallback(async (data ) => {
    const response = await axios.post('confirm-reset-password', data);
  }, []);

    // Change Password
    const changePassword = useCallback(async (data ) => {
      const response = await axios.post('new-password', data);
    }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      pusher: state.pusher,
      method: 'jwt',
      initialize,
      login,
      register,
      logout,
      resetPassword,
      newPassword,
      changePassword
    }),
    [state.isAuthenticated, state.isInitialized, state.user, login, logout, register, resetPassword, newPassword]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
