import { GET_SALE_SUCCESS, GET_SALE_FAIL } from "../actions/types";
const initialState = { sale: null };
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SALE_SUCCESS:
      return {
        ...state,

        sale: payload.sales,
      };
    case GET_SALE_FAIL:
      return {
        ...state,
        sale: null,
      };

    default:
      return state;
  }
}
