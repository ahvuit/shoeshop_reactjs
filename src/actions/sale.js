import {
  GET_SALE_SUCCESS,
  GET_SALE_FAIL,
  UPDATE_SALE_SUCCESS,
  UPDATE_SALE_FAIL,
  INSERT_SALE_SUCCESS,
  INSERT_SALE_FAIL
} from "./types";
import SaleService from "../services/sale.service";

export const getAllSales = () => (dispatch) => {
  return SaleService.getAllSales().then((data) => {
    if (data.data != null && Object.keys(data.data).length !== 0) {
      dispatch({
        type: GET_SALE_SUCCESS,
        payload: { sales: data.data },
      });
      return Promise.resolve();
    } else {
      dispatch({
        type: GET_SALE_FAIL,
      });
      return Promise.reject();
    }
  });
};
export const insertSale = (sale) => (dispatch) => {
  return SaleService.insertSale(sale).then((response) => {
    if (response.data != null && Object.keys(response.data).length !== 0) {
      dispatch({
        type: INSERT_SALE_SUCCESS,
        payload: { sale: response.data },
      });
      return Promise.resolve();
    } else {
      dispatch({
        type: INSERT_SALE_FAIL,
        payload: { error: response.message },
      });
      return Promise.reject();
    }
  });
};

export const updateSale = (salesId, sale) => (dispatch) => {
  return SaleService.updateSale(salesId, sale).then((response) => {
    if (response.data != null && Object.keys(response.data).length !== 0) {
      dispatch({
        type: UPDATE_SALE_SUCCESS,
        payload: { sale: response.data },
      });
      return Promise.resolve();
    } else {
      dispatch({
        type: UPDATE_SALE_FAIL,
        payload: { error: response.message },
      });
      return Promise.reject();
    }
  });
};
