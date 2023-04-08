import {
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  SELECTED_PRODUCT,
  REMOVE_SELECTED_PRODUCT,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  INSERT_PRODUCT_SUCCESS,
  INSERT_PRODUCT_FAIL,
} from "../actions/types";
const initialState = { products: [], product: null, error: null };
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,

        products: payload.products,
      };
    case GET_PRODUCT_FAIL:
      return {
        ...state,
        products: null,
      };
    case SELECTED_PRODUCT:
      return {
        ...state,
        product: payload.product,
      };
    case REMOVE_SELECTED_PRODUCT:
      return {
        ...state,
        product: null,
      };
    case UPDATE_PRODUCT_SUCCESS:
      const { productId, ...rest } = payload.product;
      const newProduct = state.products.map((pr, index) => {
        if (pr.productId === productId) {
          return {
            ...pr,
            ...rest,
          };
        }
        return pr;
      });
      return {
        ...state,
        products: newProduct,
        error: null,
      };
    case UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        error: payload.error,
      };
    case INSERT_PRODUCT_SUCCESS:
      return {
        ...state,
        products: [...state.products, payload.product],
        error: null,
        // categories: payload.categories,
      };
    case INSERT_PRODUCT_FAIL:
      return {
        ...state,
        error: payload.error,
      };

    default:
      return state;
  }
}
