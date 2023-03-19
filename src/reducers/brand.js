import { GET_BRAND_SUCCESS, GET_BRAND_FAIL } from "../actions/types";
const initialState = { brand: null };
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_BRAND_SUCCESS:
      return {
        ...state,

        brand: payload.brands,
      };
    case GET_BRAND_FAIL:
      return {
        ...state,
        brand: null,
      };

    default:
      return state;
  }
}
