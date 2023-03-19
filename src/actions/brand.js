import { GET_BRAND_SUCCESS, GET_BRAND_FAIL } from "./types";
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
