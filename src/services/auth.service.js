// import axios from "axios";
import { API_URL } from "../utils/config";
//const API_URL = "http://localhost:8080/api/";

const register = (email, password) => {
  return fetch(API_URL + "register", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: null,
      email: email,
      password: password,
      uType: null,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      //localStorage.setItem("user", JSON.stringify(json.data));
      return json;
    });
};

function login(email, password) {
  return fetch(API_URL + "login", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      localStorage.setItem("user", JSON.stringify(json.data));
      return json;
    });
}

const logout = () => {
  localStorage.removeItem("user");
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  register,
  login,
  logout,
};
