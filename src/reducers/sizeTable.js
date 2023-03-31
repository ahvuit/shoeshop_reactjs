import {
    GET_SIZETABLE_SUCCESS,
    GET_SIZETABLE_FAIL,
    UPDATE_SIZETABLE_SUCCESS,
    UPDATE_SIZETABLE_FAIL
  } from "../actions/types";
  const initialState = { sizeTables: null, error: null };
  // eslint-disable-next-line import/no-anonymous-default-export
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_SIZETABLE_SUCCESS:
        return {
          ...state,
  
          sizeTables: payload.sizeTables,
        };
      case GET_SIZETABLE_FAIL:
        return {
          ...state,
        };
      case UPDATE_SIZETABLE_SUCCESS:
        const { sizeTableId, ...rest } = payload.sizeTable;
        const newSize = state.sizeTables.map((stb, index) => {
          if (stb.sizeTableId === sizeTableId) {
            return { 
              ...stb,
              ...rest,
            };
          }
          return stb;
        });
        return {
          ...state,
          sizeTables: newSize,
          error: null,
        };
      case UPDATE_SIZETABLE_FAIL:
        return {
          ...state,
          error: payload.error,
        };
  
      default:
        return state;
    }
}  