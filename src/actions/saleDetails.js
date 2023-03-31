import {
    GET_SALE_DETAILS_SUCCESS,
    GET_SALE_DETAILS_FAIL,
    DELETE_SALE_DETAILS_SUCCESS,DELETE_SALE_DETAILS_FAIL
  } from "./types";
  import SaleDetailsService from "../services/saleDetails.service";
  
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
//   export const insertSale = (sale) => (dispatch) => {
//     return SaleService.insertSale(sale).then((response) => {
//       if (response.data != null && Object.keys(response.data).length !== 0) {
//         dispatch({
//           type: INSERT_SALE_SUCCESS,
//           payload: { sale: response.data },
//         });
//         return Promise.resolve();
//       } else {
//         dispatch({
//           type: INSERT_SALE_FAIL,
//           payload: { error: response.message },
//         });
//         return Promise.reject();
//       }
//     });
//   };
  
  export const deleteSaleDetails = (id) => (dispatch) => {
    return SaleDetailsService.deleteSaleDetails(id).then((response) => {
      if (response.success===true) {
        dispatch({
          type: DELETE_SALE_DETAILS_SUCCESS,
          payload: { productId: id },
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
  