import { GET_STATUS_SUCCESS, GET_STATUS_FAIL } from "./types";
import StatusService from "../services/status.service";

export const getAllStatus = () => (dispatch) => {
  return StatusService.getAllStatus().then((data) => {
    if (data.data != null && Object.keys(data.data).length !== 0) {
      dispatch({
        type: GET_STATUS_SUCCESS,
        payload: { status: data.data },
      });
      return Promise.resolve();
    } else {
      dispatch({
        type: GET_STATUS_FAIL,
      });
      return Promise.reject();
    }
  });
};
