import { SET_MESSAGE, CLEAR_MESSAGE } from "../actions/types";

const initialState = { message: "" };

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return { message: payload };

    case CLEAR_MESSAGE:
      return { message: "".trim() };

    default:
      return state;
  }
}
