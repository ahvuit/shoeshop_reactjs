import {
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
  INSERT_CATEGORY_SUCCESS,
  INSERT_CATEGORY_FAIL,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
} from "./types";
import CategoryService from "../services/category.service";

export const getAllCategories = () => (dispatch) => {
  return CategoryService.getAllCategories().then((data) => {
    if (data.data != null && Object.keys(data.data).length !== 0) {
      dispatch({
        type: GET_CATEGORY_SUCCESS,
        payload: { categories: data.data },
      });
      return Promise.resolve();
    } else {
      dispatch({
        type: GET_CATEGORY_FAIL,
      });
      return Promise.reject();
    }
  });
};

export const insertCategory = (category) => (dispatch) => {
  return CategoryService.insertCategory(category).then((response) => {
    if (response.data != null && Object.keys(response.data).length !== 0) {
      dispatch({
        type: INSERT_CATEGORY_SUCCESS,
        payload: { category: response.data },
      });
      return Promise.resolve();
    } else {
      dispatch({
        type: INSERT_CATEGORY_FAIL,
        payload: { error: response.message },
      });
      return Promise.reject();
    }
  });
};

export const updateCategory = (categoryId, category) => (dispatch) => {
  return CategoryService.updateCategory(categoryId, category).then(
    (response) => {
      if (response.data != null && Object.keys(response.data).length !== 0) {
        dispatch({
          type: UPDATE_CATEGORY_SUCCESS,
          payload: { category: response.data },
        });
        return Promise.resolve();
      } else {
        dispatch({
          type: UPDATE_CATEGORY_FAIL,
          payload: { error: response.message },
        });
        return Promise.reject();
      }
    }
  );
};
