import {
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAIL

  } from "./types";
  import ProfileService from "../services/profile.service";
  
  export const getProfile = (userId) => (dispatch) => {
    return ProfileService.getProfile(userId).then((data) => {
      if (data.data != null && Object.keys(data.data).length !== 0) {
        dispatch({
          type: GET_PROFILE_SUCCESS,
          payload: { profile: data.data },
        });
        return Promise.resolve();
      } else {
        dispatch({
          type: GET_PROFILE_FAIL,
        });
        return Promise.reject();
      }
    });
  };  
//   export const insertBrand = (brand) => (dispatch) => {
//     return BrandService.insertBrand(brand).then((response) => {
//       if (response.data != null && Object.keys(response.data).length !== 0) {
//         dispatch({
//           type: INSERT_BRAND_SUCCESS,
//           payload: { brand: response.data },
//         });
//         return Promise.resolve();
//       } else {
//         dispatch({
//           type: INSERT_BRAND_FAIL,
//           payload: { error: response.message },
//         });
//         return Promise.reject();
//       }
//     });
//   };
  
//   export const updateUser = (userId, user) => (dispatch) => {
//     return UserService.updateUser(userId, user).then((response) => {
//       if (response.data != null && Object.keys(response.data).length !== 0) {
//         dispatch({
//           type: UPDATE_USER_SUCCESS,
//           payload: { user: response.data },
//         });
//         return Promise.resolve();
//       } else {
//         dispatch({
//           type: UPDATE_USER_FAIL,
//           payload: { error: response.message },
//         });
//         return Promise.reject();
//       }
//     });
//   };