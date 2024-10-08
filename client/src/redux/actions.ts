import axios from './axiosService';
import {
  GET_ALL_BUSINESS,
  GET_ALL_CATEGORIES,
  GET_ALL_USERS,
  SET_RATING,
  SET_FILTERS,
  SET_UPLOAD_IMAGE,
  GET_USER_BY_ID,
  UPDATE_USER_DETAIL,
  GET_SELLER_BY_ID,
  UPDATE_SELLER_DETAIL,
  SET_AUTH,
  SET_USER_ID,
  CLEAN_SELLER_DETAIL,
  UPDATE_SELLER_IMAGE_INDEX,
  GET_USER_METRICS,
  GET_SELLER_METRICS,
  UPDATE_SELLER_BALANCE,
  SELLER_EMAIL,
  POST_SERVICES,
  PUT_SERVICES,
  SEE_REPORTS,
  DELETE_SERVICES,
  SEE_PAYMENTS,
  GET_CLIENTS_BY_ID
} from './Action-Types';
import type { ServiceAction } from './types';
import type { SellerDetailAction } from '../interfaces';

const API_URL = import.meta.env.VITE_SERVER_URL;

export const setAuth: any = (isAuth: any) => ({
  type: SET_AUTH,
  payload: isAuth
});

export const setUserId: any = (id: any) => ({
  type: SET_USER_ID,
  payload: id
});

export const getAllBusiness = (): any => {
  const endpoint = `${API_URL}sellers`;

  return async (dispatch: (action: ServiceAction) => void) => {
    try {
      const { data } = await axios.get(endpoint);

      dispatch({
        type: GET_ALL_BUSINESS,
        payload: data
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };
};

export const setFilter = (
  filter: string
): {
  type: string;
  payload: string;
} => {
  return {
    type: SET_FILTERS,
    payload: filter
  };
};

export const setRating = (
  rating: number
): {
  type: string;
  payload: number;
} => {
  return {
    type: SET_RATING,
    payload: rating
  };
};

export const setUploadImage = (
  image: string
): {
  type: string;
  payload: string;
} => {
  return {
    type: SET_UPLOAD_IMAGE,
    payload: image
  };
};

export const getCategories = (): any => {
  const endCategorie = `${API_URL}categories`;

  return async (dispatch: (action: ServiceAction) => void) => {
    try {
      const { data } = await axios.get(endCategorie);
      dispatch({
        type: GET_ALL_CATEGORIES,
        payload: data
      });
    } catch (error: any) {
      return { error: error.message };
    }
  };
};

export const postSeller: any = (payload: any) => {
  const endpoint = `${API_URL}sellers`;

  return async function (_dispatch: any) {
    const response = await axios.post(endpoint, payload);
    return response;
  };
};

export const postUser: any = (payload: any) => {
  const endpoint1 = `${API_URL}users`;
  return async function (_dispatch: any) {
    try {
      const response = await axios.post(endpoint1, payload);
      return response;
    } catch (error: any) {
      return { error: error.message };
    }
  };
};

export const getUsers: any = () => {
  const endUser = `${API_URL}users`;

  return async (dispatch: (action: ServiceAction) => void) => {
    try {
      const { data } = await axios.get(endUser);
      dispatch({
        type: GET_ALL_USERS,
        payload: data
      });
    } catch (error: any) {
      return error.message;
    }
  };
};

export const postValidate: any = (payload: any) => {
  const endpointLogin = `${API_URL}users/login`;
  return async function () {
    try {
      const response = await axios.post(endpointLogin, payload);
      localStorage.setItem('token', response.data.token);
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  };
};

// User Detail
export const getUserbyId: any = (id: string) => {
  const endpoint = `${API_URL}users/${id}`;

  return async (dispatch: (action: ServiceAction) => void) => {
    try {
      const { data } = await axios.get(endpoint);

      dispatch({
        type: GET_USER_BY_ID,
        payload: data
      });
    } catch (error: any) {
      return { error: error.message };
    }
  };
};

export const updateUserInfo: any = (id: string, updateinfo: any) => {
  const endpoint = `${API_URL}users/${id}`;

  return async (dispatch: (action: ServiceAction) => void) => {
    try {
      const { data } = await axios.put(endpoint, updateinfo);

      dispatch({
        type: UPDATE_USER_DETAIL,
        payload: data
      });

      return { success: true };
    } catch (error: any) {
      return { error: error.message };
    }
  };
};
// Seller Detail
export const getSellerbyId: any = (id: string) => {
  const endpoint = `${API_URL}sellers/${id}`;

  return async (dispatch: (action: ServiceAction) => void) => {
    try {
      const { data } = await axios.get(endpoint);

      dispatch({
        type: GET_SELLER_BY_ID,
        payload: data
      });
    } catch (error: any) {
      return { error: error.message };
    }
  };
};

export const updateSellerInfo: any = (id: string, updateinfo: any) => {
  const endpoint = `${API_URL}sellers/${id}`;

  return async (dispatch: (action: ServiceAction) => void) => {
    try {
      const { data } = await axios.put(endpoint, updateinfo);

      dispatch({
        type: UPDATE_SELLER_DETAIL,
        payload: data
      });
    } catch (error: any) {
      return { error: error.message };
    }
  };
};

// Services
export const postService: any = (payload: any) => {
  const endpoint = `${API_URL}services`;

  return async (dispatch: (action: ServiceAction) => void) => {
    try {
      const { data } = await axios.post(endpoint, payload);

      dispatch({
        type: POST_SERVICES,
        payload: data
      });
      return { success: true };
    } catch (error: any) {
      return { error: error.message };
    }
  };
};

export const updateService: any = (id: string, payload: any) => {
  const endpoint = `${API_URL}services/${id}`;

  return async (dispatch: (action: ServiceAction) => void) => {
    try {
      const { data } = await axios.put(endpoint, payload);

      dispatch({
        type: PUT_SERVICES,
        payload: data
      });
      return { success: true };
    } catch (error: any) {
      return { error: error.message };
    }
  };
};

export const deleteService: any = (id: string) => {
  const endpoint = `${API_URL}services/${id}`;

  return async (dispatch: (action: ServiceAction) => void) => {
    try {
      const { data } = await axios.delete(endpoint);

      dispatch({
        type: DELETE_SERVICES,
        payload: data
      });
      return { success: true };
    } catch (error: any) {
      return { error: error.message };
    }
  };
};

// Clients by ID

export const getClientsById: any = (id: string) => {
  const endpoint = `${API_URL}sellers/${id}/clients`;

  return async (dispatch: (action: ServiceAction) => void) => {
    try {
      const { data } = await axios.get(endpoint);

      dispatch({
        type: GET_CLIENTS_BY_ID,
        payload: data
      });
    } catch (error: any) {
      return { error: error.message };
    }
  };
};

export const cleanSellerDetail: any = (): SellerDetailAction => {
  return {
    type: CLEAN_SELLER_DETAIL,
    payload: {
      _id: '',
      sellerName: '',
      sellerEmail: '',
      sellerPhone: '',
      sellerGender: '',
      reviews: [],
      categoriesArray: [],
      servicesArray: [],
      images: [],
      isActive: true
    }
  };
};

export const updateSellerImageIndex: any = (payload: number) => {
  return {
    type: UPDATE_SELLER_IMAGE_INDEX,
    payload
  };
};

export const postSellerValidate: any = (payload: any) => {
  const endpointLogin = `${API_URL}sellers/login`;
  return async function (dispatch: (action: ServiceAction) => void) {
    try {
      const response = await axios.post(endpointLogin, payload);
      localStorage.setItem('token', response.data.token);
      dispatch({
        type: UPDATE_SELLER_BALANCE,
        payload: response.data.accountBalance
      });
      dispatch({
        type: SELLER_EMAIL,
        payload: payload.sellerEmail
      });
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  };
};

export const deleteUser: any = (id: string) => {
  const endpointDelete = `${API_URL}admin/dropUser/${id}`;

  return async function () {
    try {
      const response = await axios.delete(endpointDelete);
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  };
};

export const deleteReport: any = (id: string) => {
  const endpointDelete = `${API_URL}admin/reports/${id}`;

  return async function () {
    try {
      const response = await axios.delete(endpointDelete);
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  };
};

export const disableUser: any = (id: string) => {
  const endpointDisable = `${API_URL}admin/user/disable/${id}`;

  return async function () {
    try {
      const response = await axios.put(endpointDisable);
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  };
};

export const enableUser: any = (id: string) => {
  const endpointEnable = `${API_URL}admin/user/enable/${id}`;

  return async function () {
    try {
      const response = await axios.put(endpointEnable);
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  };
};

export const getUserMetrics: any = () => {
  const endpoint = `${API_URL}admin/userMetrics`;

  return async (dispatch: (action: ServiceAction) => void) => {
    try {
      const { data } = await axios.get(endpoint);

      dispatch({
        type: GET_USER_METRICS,
        payload: data
      });
    } catch (error: any) {
      return { error: error.message };
    }
  };
};

export const getSellerMetrics: any = () => {
  const endpoint = `${API_URL}admin/sellerMetrics`;

  return async (dispatch: (action: ServiceAction) => void) => {
    try {
      const { data } = await axios.get(endpoint);

      dispatch({
        type: GET_SELLER_METRICS,
        payload: data
      });
    } catch (error: any) {
      return { error: error.message };
    }
  };
};

export const disableSellerAdmin: any = (id: string) => {
  const endpointDisable = `${API_URL}admin/seller/disable/${id}`;

  return async function () {
    try {
      const response = await axios.put(endpointDisable);
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  };
};

export const enableSellerAdmin: any = (id: string) => {
  const endpointEnable = `${API_URL}admin/seller/enable/${id}`;
  console.log('holaa', id);
  return async function () {
    try {
      const response = await axios.put(endpointEnable);
      console.log(response);
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  };
};

export const getReports: any = () => {
  const endpoint = `${API_URL}admin/reports`;

  return async (dispatch: (action: ServiceAction) => void) => {
    try {
      const { data } = await axios.get(endpoint);

      dispatch({
        type: SEE_REPORTS,
        payload: data
      });
    } catch (error: any) {
      return { error: error.message };
    }
  };
};

export const getPayments: any = () => {
  const endpoint = `${API_URL}admin/payments`;

  return async (dispatch: (action: ServiceAction) => void) => {
    try {
      const { data } = await axios.get(endpoint);

      dispatch({
        type: SEE_PAYMENTS,
        payload: data
      });
    } catch (error: any) {
      return { error: error.message };
    }
  };
};
