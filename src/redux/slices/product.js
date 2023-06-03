import sum from 'lodash/sum';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: true,
  error: null,
  products: [],
  product: null,
  productAsAdmin: null,
  productStatus: null,
  userBids: [],
  userOffers: [],
  checkout: {
    activeStep: 0,
    cart: [],
    subtotal: 0,
    total: 0,
    discount: 0,
    shipping: 0,
    billing: null,
    totalItems: 0,
  },
};

const slice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },
    resetProduct(state) {
      state.product = null;
      state.productStatus = null;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PRODUCTS
    getProductsSuccess(state, action) {
      state.isLoading = false;
      state.products = action.payload;
    },
    
    // GET BIDS 
    getUserBidsSuccess(state, action) {
      state.isLoading = false;
      state.userBids = action.payload;
    },

    // GET OFFERS 
    getUserOffersSuccess(state, action) {
      state.isLoading = false;
      state.userOffers = action.payload;
    },

    // GET PRODUCT
    getProductSuccess(state, action) {
      state.isLoading = false;
      state.product = action.payload;
    },

    getProductAsAdminSuccess(state, action) {
      state.isLoading = false;
      state.productAsAdmin = action.payload;
    },

    getProductStatus(state, action) {
      state.isLoading = false;
      state.productStatus = action.payload;
    },

    getExtendedTime(state, action) {
      state.isLoading = false;
      state.product.auction.end_at = action.payload;
    },

    // CHECKOUT
    getCart(state, action) {
      const cart = action.payload;

      const totalItems = sum(cart.map((product) => product.quantity));
      const subtotal = sum(cart.map((product) => product.price * product.quantity));
      state.checkout.cart = cart;
      state.checkout.discount = state.checkout.discount || 0;
      state.checkout.shipping = state.checkout.shipping || 0;
      state.checkout.billing = state.checkout.billing || null;
      state.checkout.subtotal = subtotal;
      state.checkout.total = subtotal - state.checkout.discount;
      state.checkout.totalItems = totalItems;
    },

    addToCart(state, action) {
      const newProduct = action.payload;
      const isEmptyCart = !state.checkout.cart.length;

      if (isEmptyCart) {
        state.checkout.cart = [...state.checkout.cart, newProduct];
      } else {
        state.checkout.cart = state.checkout.cart.map((product) => {
          const isExisted = product.id === newProduct.id;

          if (isExisted) {
            return {
              ...product,
              colors: uniq([...product.colors, ...newProduct.colors]),
              quantity: product.quantity + 1,
            };
          }

          return product;
        });
      }
      state.checkout.cart = uniqBy([...state.checkout.cart, newProduct], 'id');
      state.checkout.totalItems = sum(state.checkout.cart.map((product) => product.quantity));
    },

    deleteCart(state, action) {
      const updateCart = state.checkout.cart.filter((product) => product.id !== action.payload);

      state.checkout.cart = updateCart;
    },

    resetCart(state) {
      state.checkout.cart = [];
      state.checkout.billing = null;
      state.checkout.activeStep = 0;
      state.checkout.total = 0;
      state.checkout.subtotal = 0;
      state.checkout.discount = 0;
      state.checkout.shipping = 0;
      state.checkout.totalItems = 0;
    },

    backStep(state) {
      state.checkout.activeStep -= 1;
    },

    nextStep(state) {
      state.checkout.activeStep += 1;
    },

    gotoStep(state, action) {
      const step = action.payload;
      state.checkout.activeStep = step;
    },

    increaseQuantity(state, action) {
      const productId = action.payload;

      const updateCart = state.checkout.cart.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });

      state.checkout.cart = updateCart;
    },

    decreaseQuantity(state, action) {
      const productId = action.payload;
      const updateCart = state.checkout.cart.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity - 1,
          };
        }
        return product;
      });

      state.checkout.cart = updateCart;
    },

    createBilling(state, action) {
      state.checkout.billing = action.payload;
    },

    applyDiscount(state, action) {
      const discount = action.payload;
      state.checkout.discount = discount;
      state.checkout.total = state.checkout.subtotal - discount;
    },

    applyShipping(state, action) {
      const shipping = action.payload;
      state.checkout.shipping = shipping;
      state.checkout.total = state.checkout.subtotal - state.checkout.discount + shipping;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  getCart,
  resetProduct,
  addToCart,
  resetCart,
  gotoStep,
  backStep,
  nextStep,
  deleteCart,
  createBilling,
  applyShipping,
  applyDiscount,
  increaseQuantity,
  decreaseQuantity,
} = slice.actions;

// ----------------------------------------------------------------------

export function getProducts() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('admin/cars'); 
      dispatch(slice.actions.getProductsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getProduct(name) {
  return async (dispatch, getState) => {
    // dispatch(slice.actions.startLoading());
    try {
        const response = await axios.get(`cars/${name}`);
        dispatch(slice.actions.getProductSuccess(response.data.car));
        getStatus(response.data.car)(dispatch);
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getProductAsAdmin(name) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axios.get(`admin/car/${name}`);
      dispatch(slice.actions.getProductAsAdminSuccess(response.data));
      // getStatus(response.data.find(product=> product.id == name))(dispatch);
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getStatus(product){
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      if(!product){
        dispatch(slice.actions.startLoading());
        return;
      }
      const endDate = new Date(product?.auction?.end_at);
      const currentTime = new Date();
      const difference = endDate - currentTime;
      dispatch(slice.actions.getProductStatus(difference));
      

    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function extendEndtime(auctionID) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // Make a GET request to retrieve the current auction data
      const response = await axios.get(`admin/auctions/${auctionID}`);
      const currentAuctionData = response.data.data;
      
      // Change the duration to end after 30 seconds
      const startAt = new Date(currentAuctionData.start_at).getTime();
      const endAt = new Date().getTime() + 60000;
      const duration = endAt - startAt;
      
      // Convert the duration to ISO 8601 format
      const updatedDuration = `PT${Math.floor(duration / 1000 / 60 /60)}H${Math.floor((duration / 1000 / 60) % 60 )}M${Math.round((duration / 1000) % 60)}S`;

      // Update the auction data with the new duration time
      const updatedAuctionData = {
        car_id: currentAuctionData.car_id,
        start_price: currentAuctionData.start_price,
        date: currentAuctionData.start_at,
        duration: updatedDuration
      };

      dispatch(slice.actions.getExtendedTime(new Date(endAt).toISOString()));

      await axios.put(`admin/auctions/${auctionID}`, { ...updatedAuctionData });

      await getProduct(currentAuctionData.car_id)(dispatch);
  

    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getUserBids() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('profile/bids'); 
      dispatch(slice.actions.getUserBidsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getUserOffers() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('profile/offers'); 
      dispatch(slice.actions.getUserOffersSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}