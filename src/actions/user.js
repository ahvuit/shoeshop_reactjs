import {
  GET_ALL_USER_SUCCESS,
  GET_ALL_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  INSERT_USER_SUCCESS,
  INSERT_USER_FAIL,
} from "./types";
import UserService from "../services/user.service";

export const getAllUsers = () => (dispatch) => {
  return UserService.getAllUser().then((data) => {
    if (data.data != null && Object.keys(data.data).length !== 0) {
      dispatch({
        type: GET_ALL_USER_SUCCESS,
        payload: { users: data.data },
      });
      return Promise.resolve();
    } else {
      dispatch({
        type: GET_ALL_USER_FAIL,
      });
      return Promise.reject();
    }
  });
};

export const insertUser = (user) => (dispatch) => {
  return UserService.insertUser(user).then((response) => {
    if (response.data != null && Object.keys(response.data).length !== 0) {
      dispatch({
        type: INSERT_USER_SUCCESS,
        payload: { user: response.data },
      });
      return Promise.resolve();
    } else {
      dispatch({
        type: INSERT_USER_FAIL,
        payload: { error: response.message },
      });
      return Promise.reject();
    }
  });
};

export const updateUser = (userId, user) => (dispatch) => {
  return UserService.updateUser(userId, user).then((response) => {
    if (response.data != null && Object.keys(response.data).length !== 0) {
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user: response.data },
      });
      return Promise.resolve();
    } else {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: { error: response.message },
      });
      return Promise.reject();
    }
  });
};
