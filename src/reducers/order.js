import {
  INSERT_ORDER_SUCCESS,
  INSERT_ORDER_FAIL,
  GET_ALL_ORDER_BY_USER_SUCCESS,
  GET_ALL_ORDER_BY_USER_FAIL,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_FAIL,
} from "../actions/types";
const initialState = { orders: [], error: null };

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
    case GET_ALL_ORDER_BY_USER_SUCCESS:
      return {
        ...state,
        orders: payload.order,
        error: null,
      };

    case GET_ALL_ORDER_BY_USER_FAIL:
      return {
        ...state,
        error: payload.error,
      };
    case CANCEL_ORDER_SUCCESS:
      const { orderId, statusId, ...rest } = payload.order;
      const newOrders = state.orders.map((order, index) => {
        if (order.orderModel.orderId === orderId) {
          return {
            ...order,
            orderModel: {
              ...order.orderModel,
              statusId: statusId,
              statusName: "Đã hủy",
            },
          };
        }
        return order;
      });
      return {
        ...state,
        orders: newOrders,
        error: null,
      };

    case CANCEL_ORDER_FAIL:
      return {
        ...state,
        error: payload.error,
      };

    default:
      return state;
  }
}
