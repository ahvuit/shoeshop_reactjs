import {
  GET_SALE_DETAILS_SUCCESS,
  GET_SALE_DETAILS_FAIL,
  DELETE_SALE_DETAILS_SUCCESS,
  DELETE_SALE_DETAILS_FAIL,
  GET_SALE_DETAILS_IS_COMING_SUCCESS,
  GET_SALE_DETAILS_IS_COMING_FAIL,
  GET_SALE_DETAILS_IS_ACTIVE_SUCCESS,
  GET_SALE_DETAILS_IS_ACTIVE_FAIL,
  INSERT_SALE_DETAILS_SUCCESS,
  INSERT_SALE_DETAILS_FAIL
} from "./types";

import SaleDetailsService from "../services/saleDetails.service";
import saleDetailsService from "../services/saleDetails.service";

export const getAllSaleDetails = (id) => (dispatch) => {
  return SaleDetailsService.getSaleDetailsBySalesId(id).then((data) => {
    if (data.data != null && Object.keys(data.data).length !== 0) {
      dispatch({
        type: GET_SALE_DETAILS_SUCCESS,
        payload: { saleDetails: data.data },
      });
      return Promise.resolve();
    } else {
      dispatch({
        type: GET_SALE_DETAILS_FAIL,
      });
      return Promise.reject();
    }
  });
};
export const getAllSaleDetailsIsComing = () => (dispatch) => {
  return SaleDetailsService.getSaleDetailsIsComing().then((data) => {
    if (data.data != null && Object.keys(data.data).length !== 0) {
      dispatch({
        type: GET_SALE_DETAILS_IS_COMING_SUCCESS,
        payload: { saleDetails: data.data },
      });
      return Promise.resolve();
    } else {
      dispatch({
        type: GET_SALE_DETAILS_IS_COMING_FAIL,
      });
      return Promise.reject();
    }
  });
};
export const getAllSaleDetailsIsActive = () => (dispatch) => {
  return SaleDetailsService.getSaleDetailsIsActive().then((data) => {
    if (data.data != null && Object.keys(data.data).length !== 0) {
      dispatch({
        type: GET_SALE_DETAILS_IS_ACTIVE_SUCCESS,
        payload: { saleDetails: data.data },
      });
      return Promise.resolve();
    } else {
      dispatch({
        type: GET_SALE_DETAILS_IS_ACTIVE_FAIL,
      });
      return Promise.reject();
    }
  });
};
export const insertSaleDetails = (sale) => (dispatch) => {
  return saleDetailsService.insertSaleDetails(sale).then((response) => {
    if (response.data != null && Object.keys(response.data).length !== 0) {
      dispatch({
        type: INSERT_SALE_DETAILS_SUCCESS,
        payload: { saleDetails: response.data },
      });
      return Promise.resolve();
    } else {
      dispatch({
        type: INSERT_SALE_DETAILS_FAIL,
        payload: { error: response.message },
      });
      return Promise.reject();
    }
  });
};

export const deleteSaleDetails = (sale) => (dispatch) => {
  return SaleDetailsService.deleteSaleDetails(sale).then((response) => {
    if (response.success === true) {

      dispatch({
        type: DELETE_SALE_DETAILS_SUCCESS,
        payload: { saleDetails: sale },
      });
      return Promise.resolve();
    } else {
      dispatch({
        type: DELETE_SALE_DETAILS_FAIL,
        payload: { error: response.message },
      });
      return Promise.reject();
    }
  });
};
