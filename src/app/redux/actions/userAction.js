
import {
  ALL_USERS_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  CLEAR_ERRORS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
} from "app/utils/constants/userConstants";

import axios from "axios";

const setCookie = (cookieName, cookieValue, expirationDays) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + expirationDays);

  const cookieString =
    encodeURIComponent(cookieName) +
    "=" +
    encodeURIComponent(cookieValue) +
    "; expires=" +
    expirationDate.toUTCString() +
    "; path=/";

  document.cookie = cookieString;
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const data = await axios.post(
      `/api/v1/users/login`,
      { email, password },
      config
    );
    dispatch({ type: LOGIN_SUCCESS, payload: data.data.user });

    sessionStorage.setItem("isAuthenticated", true);
    sessionStorage.setItem("role", data.data.user.role);
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.description });
    sessionStorage.setItem("isAuthenticated", false);
  }
};


export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    const data = await axios.get("/api/v1/users/details");
    // console.log(data);
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.description,
    });
  }
};

export const logOut = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/users/logout");
    dispatch({ type: LOGOUT_SUCCESS });
    sessionStorage.setItem("isAuthenticated", false);
    sessionStorage.setItem("role", "null");
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.description,
    });
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });
    const data = await axios.get("/api/v1/admin/users");
    // console.log(data);
    dispatch({ type: ALL_USERS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: ALL_USERS_FAIL,
      payload: error.response.data.description,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
