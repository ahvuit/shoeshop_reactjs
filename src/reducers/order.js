import { INSERT_ORDER_SUCCESS, INSERT_ORDER_FAIL } from "../actions/types";
const initialState = {orders: [],
    error: null,};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case INSERT_ORDER_SUCCESS:
      return {
        ...state,
        orders: [...state.orders, payload.order],
        error: null,
      };

    case INSERT_ORDER_FAIL:
      return {
        ...state,
        error: payload.error,
      };

    default:
      return state;
  }
}
