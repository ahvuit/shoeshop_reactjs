import {
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  SELECTED_PRODUCT,
  REMOVE_SELECTED_PRODUCT,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  INSERT_PRODUCT_SUCCESS,INSERT_PRODUCT_FAIL 
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

export const updateProduct = (productId, product) => (dispatch) => {
  return ProductService.updateProduct(productId, product).then(
    (response) => {
      if (response.data != null && Object.keys(response.data).length !== 0) {
        dispatch({
          type: UPDATE_PRODUCT_SUCCESS,
          payload: { product: response.data },
        });
        return Promise.resolve();
      } else {
        dispatch({
          type: UPDATE_PRODUCT_FAIL,
          payload: { error: response.message },
        });
        return Promise.reject();
      }
    }
  );
};

export const insertProduct = (product) => (dispatch) => {
  return ProductService.insertProduct(product).then((response) => {
    if (response.data != null && Object.keys(response.data).length !== 0) {
      dispatch({
        type: INSERT_PRODUCT_SUCCESS,
        payload: { product: response.data },
      });
      return Promise.resolve();
    } else {
      dispatch({
        type: INSERT_PRODUCT_FAIL,
        payload: { error: response.message },
      });
      return Promise.reject();
    }
  });
};