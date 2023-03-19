import {
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  SELECTED_PRODUCT,
  REMOVE_SELECTED_PRODUCT,
} from "./types";
import ProductService from "../services/product.service";

export const getAllProducts = () => (dispatch) => {
  return ProductService.getAllProducts().then((data) => {
    if (data.data != null && Object.keys(data.data).length !== 0) {
      dispatch({
        type: GET_PRODUCT_SUCCESS,
        payload: { products: data.data },
      });
      return Promise.resolve();
    } else {
      dispatch({
        type: GET_PRODUCT_FAIL,
      });
      return Promise.reject();
    }
  });
};
export const selectedProduct = (productId) => (dispatch) => {
  return ProductService.getProductDetails(productId).then((data) => {
    if (data.data != null && Object.keys(data.data).length !== 0) {
      dispatch({
        type: SELECTED_PRODUCT,
        payload: { product: data.data },
      });
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  });
};

export const remove_SelectedProduct = () => {
  return {
    type: REMOVE_SELECTED_PRODUCT,
  };
};
