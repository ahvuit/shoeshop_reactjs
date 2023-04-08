import {
  GET_SALE_SUCCESS,
  GET_SALE_FAIL,
  UPDATE_SALE_SUCCESS,
  UPDATE_SALE_FAIL,
  INSERT_SALE_SUCCESS,
  INSERT_SALE_FAIL,
} from "../actions/types";
const initialState = { sale: null, error: null };
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
    case INSERT_SALE_SUCCESS:
      return {
        ...state,
        sale: [...state.sale, payload.sale],
        error: null,
        // categories: payload.categories,
      };
    case INSERT_SALE_FAIL:
      return {
        ...state,
        error: payload.error,
      };
    case UPDATE_SALE_SUCCESS:
      const { salesId, ...rest } = payload.sale;
      const newSale = state.sale.map((s, index) => {
        if (s.salesId === salesId) {
          return {
            ...s,
            ...rest,
          };
        }
        return s;
      });
      return {
        ...state,
        sale: newSale,
        error: null,
      };
    case UPDATE_SALE_FAIL:
      return {
        ...state,
        error: payload.error,
      };

    default:
      return state;
  }
}
