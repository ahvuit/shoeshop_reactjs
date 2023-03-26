import {
  INSERT_ORDER_SUCCESS,
  INSERT_ORDER_FAIL,
  SET_MESSAGE,
  GET_ALL_ORDER_BY_USER_SUCCESS,
  GET_ALL_ORDER_BY_USER_FAIL,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_FAIL,
  GET_ALL_ORDER_SUCCESS,
  GET_ALL_ORDER_FAIL,
} from "./types";

import OrderService from "../services/order.service";

export const addOrder = (orderModel, listOrderDetails) => (dispatch) => {
  return OrderService.addOrder(orderModel, listOrderDetails).then(
    (response) => {
      if (response.data != null && Object.keys(response.data).length !== 0) {
        dispatch({
          type: INSERT_ORDER_SUCCESS,
          payload: { order: response.data },
        });

        dispatch({
          type: SET_MESSAGE,
          payload: response.message,
        });

        return Promise.resolve();
      } else {
        const message = response.message;
        dispatch({
          type: INSERT_ORDER_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        return Promise.reject();
      }
    }
  );
};
export const getAllOrderByUserId = (userId) => (dispatch) => {
  return OrderService.getAllOrderByUserId(userId).then((data) => {
    if (data.data != null && Object.keys(data.data).length !== 0) {
      dispatch({
        type: GET_ALL_ORDER_BY_USER_SUCCESS,
        payload: { order: data.data },
      });
      return Promise.resolve();
    } else {
      dispatch({
        type: GET_ALL_ORDER_BY_USER_FAIL,
      });
      return Promise.reject();
    }
  });
};
export const cancelOrder = (orderId) => (dispatch) => {
  return OrderService.cancelOrder(orderId).then((data) => {
    if (data.data != null && Object.keys(data.data).length !== 0) {
      dispatch({
        type: CANCEL_ORDER_SUCCESS,
        payload: { order: data.data },
      });
      return Promise.resolve();
    } else {
      dispatch({
        type: CANCEL_ORDER_FAIL,
      });
      return Promise.reject();
    }
  });
};
export const getAllOrders = () => (dispatch) => {
  return OrderService.getAllOrders().then((data) => {
    if (data.data != null && Object.keys(data.data).length !== 0) {
      dispatch({
        type: GET_ALL_ORDER_SUCCESS,
        payload: { orders: data.data },
      });

      return Promise.resolve();
    } else {
      dispatch({
        type: GET_ALL_ORDER_FAIL,
      });
      return Promise.reject();
    }
  });
};
