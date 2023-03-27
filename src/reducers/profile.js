import {
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL
  } from "../actions/types";
  const initialState = { profile: [], error: null };
  // eslint-disable-next-line import/no-anonymous-default-export
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_PROFILE_SUCCESS:
        return {
          ...state,
          error: null,
          profile: payload.profile,
        };
      case GET_PROFILE_FAIL:
        return {
          ...state,
          profile: null,
        };
    //   case INSERT_BRAND_SUCCESS:
    //     return {
    //       ...state,
    //       brand: [...state.brand, payload.brand],
    //       error: null,
    //       // categories: payload.categories,
    //     };
    //   case INSERT_BRAND_FAIL:
    //     return {
    //       ...state,
    //       error: payload.error,
    //     };
    //   case UPDATE_BRAND_SUCCESS:
    //     const { brandId, ...rest } = payload.brand;
    //     const newBrand = state.brand.map((br, index) => {
    //       if (br.brandId === brandId) {
    //         return {
    //           ...br,
    //           ...rest,
    //         };
    //       }
    //       return br;
    //     });
    //     return {
    //       ...state,
    //       brand: newBrand,
    //       error: null,
    //     };
    //   case UPDATE_BRAND_FAIL:
    //     return {
    //       ...state,
    //       error: payload.error,
        // };
  
      default:
        return state;
    }
  };  