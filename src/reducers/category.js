import {
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
  INSERT_CATEGORY_SUCCESS,
  INSERT_CATEGORY_FAIL,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL
} from "../actions/types";
const initialState = { categories: null, error: null };
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CATEGORY_SUCCESS:
      return {
        ...state,

        categories: payload.categories,
      };
    case GET_CATEGORY_FAIL:
      return {
        ...state,
      };
    case INSERT_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: [...state.categories, payload.category],
        error: null,
        // categories: payload.categories,
      };
    case INSERT_CATEGORY_FAIL:
      return {
        ...state,
        error: payload.error,
      };
    case UPDATE_CATEGORY_SUCCESS:
      const { categoryId, ...rest } = payload.category;
      const newCategory = state.categories.map((cate, index) => {
        if (cate.categoryId === categoryId) {
          return {
            ...cate,
            ...rest
          };
        }
        return cate;
      });
      return {
        ...state,
        categories: newCategory,
        error: null,
      };
      case UPDATE_CATEGORY_FAIL:
        return {
          ...state,
          error: payload.error,
        };
  

    default:
      return state;
  }
}
