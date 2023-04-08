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

const insertUser = (user) => {
  return fetch(API_URL + "register", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((json) => {
      //localStorage.setItem("user", JSON.stringify(json.data));
      return json;
    });
};
const updateUser = (userId, user) => {
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
    .catch((e) => {});
};
const changePass = (userId, body) => {
  return fetch(API_URL + `changePassword/${userId}`, {
    method: "PUT",
    mode: "cors",
    headers: authHeader(),
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((json) => {
      // localStorage.setItem("orderResult", JSON.stringify(json.data));
      return json;
    })
    .catch((e) => {});
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllUser,
  updateUser,
  insertUser,
  changePass,
};
