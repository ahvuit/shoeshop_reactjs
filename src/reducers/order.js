import {
  INSERT_ORDER_SUCCESS,
  INSERT_ORDER_FAIL,
  GET_ALL_ORDER_BY_USER_SUCCESS,
  GET_ALL_ORDER_BY_USER_FAIL,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_FAIL,
  GET_ALL_ORDER_FAIL,
  GET_ALL_ORDER_SUCCESS,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
} from "../actions/types";
const initialState = { orders: [], orders1: [], error: null };

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

    case GET_ALL_ORDER_SUCCESS:
      return {
        ...state,
        orders1: payload.orders,
        error: null,
      };

    case GET_ALL_ORDER_FAIL:
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
    case UPDATE_ORDER_SUCCESS:
      const { orderId: a, statusId: b, ...rest1 } = payload.order;
      const newOrders1 = state.orders1.map((o, index) => {
        if (o.orderModel.orderId === a) {
          console.log("loi reduce11111: ", o);
          const c =
            b === "6405f204abfbac7f699ebbbb"
              ? "Đang chờ duyệt"
              : b === "6405f20dabfbac7f699ebbbc"
              ? "Đã duyệt"
              : b === "6405f218abfbac7f699ebbbd"
              ? "Đang giao"
              : b === "6405f221abfbac7f699ebbbe"
              ? "Giao Thành Công"
              : "Đã hủy";
          return {
            ...o,
            orderModel: {
              ...o.orderModel,
              statusId: b,
              statusName: c,
            },
          };
        }
        console.log("loi reduces: ", o);
        return o;
      });
      return {
        ...state,
        orders1: newOrders1,
        error: null,
      };
    case UPDATE_ORDER_FAIL:
      return {
        ...state,
        error: payload.error,
      };

    default:
      return state;
  }
}
