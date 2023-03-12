import {
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAIL,
    SELECTED_PRODUCT
  } from "../actions/types";
  const initialState ={  products: null,product:null};
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
      
      
      default:
        return state;
    }
  }