import {
  GET_BRAND_SUCCESS,
  GET_BRAND_FAIL,
  INSERT_BRAND_SUCCESS,
  INSERT_BRAND_FAIL,
  UPDATE_BRAND_SUCCESS,
  UPDATE_BRAND_FAIL,
} from "./types";

import BrandService from "../services/brand.service";

export const getAllBrands = () => (dispatch) => {
  return BrandService.getAllBrand().then((data) => {
    if (data.data != null && Object.keys(data.data).length !== 0) {
      dispatch({
        type: GET_BRAND_SUCCESS,
        payload: { brands: data.data },
      });
      return Promise.resolve();
    } else {
      dispatch({
        type: GET_BRAND_FAIL,
      });
      return Promise.reject();
    }
  });
};

export const insertBrand = (brand) => (dispatch) => {
  return BrandService.insertBrand(brand).then((response) => {
    if (response.data != null && Object.keys(response.data).length !== 0) {
      dispatch({
        type: INSERT_BRAND_SUCCESS,
        payload: { brand: response.data },
      });
      return Promise.resolve();
    } else {
      dispatch({
        type: INSERT_BRAND_FAIL,
        payload: { error: response.message },
      });
      return Promise.reject();
    }
  });
};

export const updateBrand = (brandId, brand) => (dispatch) => {
  return BrandService.updateBrand(brandId, brand).then((response) => {
    if (response.data != null && Object.keys(response.data).length !== 0) {
      dispatch({
        type: UPDATE_BRAND_SUCCESS,
        payload: { brand: response.data },
      });
      return Promise.resolve();
    } else {
      dispatch({
        type: UPDATE_BRAND_FAIL,
        payload: { error: response.message },
      });
      return Promise.reject();
    }
  });
};
