import {
  GET_BRAND_SUCCESS,
  GET_BRAND_FAIL,
  INSERT_BRAND_SUCCESS,
  INSERT_BRAND_FAIL,
  UPDATE_BRAND_SUCCESS,
  UPDATE_BRAND_FAIL,
} from "../actions/types";
const initialState = { brand: null, error: null };
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_BRAND_SUCCESS:
      return {
        ...state,
        error: null,
        brand: payload.brands,
      };
    case GET_BRAND_FAIL:
      return {
        ...state,
        brand: null,
      };
    case INSERT_BRAND_SUCCESS:
      return {
        ...state,
        brand: [...state.brand, payload.brand],
        error: null,
        // categories: payload.categories,
      };
    case INSERT_BRAND_FAIL:
      return {
        ...state,
        error: payload.error,
      };
    case UPDATE_BRAND_SUCCESS:
      const { brandId, ...rest } = payload.brand;
      const newBrand = state.brand.map((br, index) => {
        if (br.brandId === brandId) {
          return {
            ...br,
            ...rest,
          };
        }
        return br;
      });
      return {
        ...state,
        brand: newBrand,
        error: null,
      };
    case UPDATE_BRAND_FAIL:
      return {
        ...state,
        error: payload.error,
      };

    default:
      return state;
  }
}
