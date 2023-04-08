import authHeader from "./auth-header";
import { API_URL } from "../utils/config";
const getProfile = (userId) => {
  return fetch(API_URL + `getProfileDetails/${userId}`, {
    method: "GET",
    mode: "cors",
    headers: authHeader(),
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
};
const updateProfile = (id, profile) => {
  return fetch(API_URL + `updateProfile/${id}`, {
    method: "PUT",
    mode: "cors",
    headers: authHeader(),
    body: JSON.stringify(profile),
  })
    .then((res) => res.json())
    .then((json) => {
      console.log("json: ", json);
      // localStorage.setItem("orderResult", JSON.stringify(json.data));
      return json;
    })
    .catch((e) => {
      console.log("e: ", e);
    });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getProfile,
  updateProfile,
};
