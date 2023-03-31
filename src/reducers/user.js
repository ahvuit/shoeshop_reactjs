import {
    GET_ALL_USER_SUCCESS,
    GET_ALL_USER_FAIL,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    INSERT_USER_SUCCESS,
    INSERT_USER_FAIL
    
  } from "../actions/types";
  const initialState = { users: null, error: null };
  // eslint-disable-next-line import/no-anonymous-default-export
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_ALL_USER_SUCCESS:
        return {
          ...state,
          error: null,
          users: payload.users,
        };
      case GET_ALL_USER_FAIL:
        return {
          ...state,
          users: null,
        };
      case INSERT_USER_SUCCESS:
        return {
          ...state,
          users: [...state.users, payload.user],
          error: null,
          // categories: payload.categories,
        };
      case INSERT_USER_FAIL:
        return {
          ...state,
          error: payload.error,
        };
      case UPDATE_USER_SUCCESS:
        const { userId, ...rest } = payload.user;
        const newUser = state.users.map((us, index) => {
          if (us.userId === userId) {
            return {
              ...us,
              ...rest, 
            };
          }
          return us;
        });
        return {
          ...state,
          users: newUser,
          error: null,
        };
      case UPDATE_USER_FAIL:
        return {
          ...state,
          error: payload.error,
        };
  
      default:
        return state;
    }
  }  