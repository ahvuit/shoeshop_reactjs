import { GET_SALE_SUCCESS, GET_SALE_FAIL } from "./types";
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
