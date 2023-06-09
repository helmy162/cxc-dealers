import sum from 'lodash/sum';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
import { useAuthContext } from 'src/auth/useAuthContext';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  users: [],
  user: null,
  sellers: [],
  seller: null,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },
    // Reset User
    resetUser(state) {
      state.user = null;
    },
    // Reset Seller
    resetSeller(state) {
      state.seller = null;
    },
    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET USERS
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.users = action.payload;
    },

    // GET USER
    getUserSuccess(state, action) {
      state.isLoading = false;
      state.user = action.payload;
    },
    getSellersSuccess(state, action) {
      state.isLoading = false;
      state.sellers = action.payload;
    },
    getSellerSuccess(state, action) {
      state.isLoading = false;
      state.seller = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;


// Actions
export const {
  resetUser,
  resetSeller,
} = slice.actions;

// ----------------------------------------------------------------------

export function getUsers(role) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${role}/users`);
      dispatch(slice.actions.getUsersSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getUser(name) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`admin/all-users`);
      dispatch(slice.actions.getUserSuccess(response.data.find(user=> user.id == name)));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getSellers(role){
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${role}/sellers`);
      dispatch(slice.actions.getSellersSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getSeller(name, role) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${role}/sellers/${name}`);
      dispatch(slice.actions.getSellerSuccess(response.data.seller));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}