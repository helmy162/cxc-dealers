// routes
import { PATH_AUTH } from '../routes/paths';
// utils
import axios from '../utils/axios';

const MOCKED_TOKEN_EXP = 259200;

// ----------------------------------------------------------------------

// function jwtDecode(token) {
//   const base64Url = token.split('.')[1];
//   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//   const jsonPayload = decodeURIComponent(
//     window
//       .atob(base64)
//       .split('')
//       .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
//       .join('')
//   );

//   return JSON.parse(jsonPayload);
// }

// ----------------------------------------------------------------------

export const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }

  // const decoded = jwtDecode(accessToken);

  // const currentTime = Date.now() / 1000;

  // return decoded.exp > currentTime;
  return true
};

// ----------------------------------------------------------------------

export const tokenExpired = (exp) => {
  // eslint-disable-next-line prefer-const
  let expiredTimer;

  const currentTime = Date.now();

  // Test token expires after 3d
  const timeLeft = currentTime + MOCKED_TOKEN_EXP - currentTime; // ~3d
  // const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');

    window.location.href = PATH_AUTH.login;
  }, timeLeft);
};

// ----------------------------------------------------------------------

export const setSession = (accessToken, userId) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userId', userId);

    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    // This function below will handle when token is expired
    // const { exp } = jwtDecode(accessToken); // ~3 days by minimals server
    //  ~3days
    tokenExpired(MOCKED_TOKEN_EXP);
  } else {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');

    delete axios.defaults.headers.common.Authorization;
  }
};
