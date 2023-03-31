import {
    GET_STATUS_SUCCESS,
    GET_STATUS_FAIL
  } from "../actions/types";
  const initialState = { status: null, error: null };
  // eslint-disable-next-line import/no-anonymous-default-export
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_STATUS_SUCCESS:
        return {
          ...state,
  
          status: payload.status,
        };
      case GET_STATUS_FAIL:
        return {
          ...state,
        };
      
  
      default:
        return state;
    }
  }
  