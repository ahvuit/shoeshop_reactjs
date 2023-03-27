import authHeader from "./auth-header";
import { API_URL } from "../utils/config";
const getAllUser = () => {
  return fetch(API_URL + "getAllUsers", {
    method: "GET",
    mode: "cors",
    headers: authHeader(),
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
};
const updateUser = (userId, user) => {
  // console.log('body: ',JSON.stringify(body));
  return fetch(API_URL + `updateUser/${userId}`, {
    method: "PUT",
    mode: "cors",
    headers: authHeader(),
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((json) => {
      // localStorage.setItem("orderResult", JSON.stringify(json.data));
      return json;
    })
    .catch((e) => {
      console.log("error: ", e);
    });
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllUser,
  updateUser,
};
