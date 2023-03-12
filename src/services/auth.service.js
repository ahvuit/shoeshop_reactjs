// import axios from "axios";
import {API_URL} from '../utils/config'
//const API_URL = "http://localhost:8080/api/";

const register = ( email, password) => {
  return fetch(API_URL + "register", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: null,
      email:email,
      password: password,
      uType: null
    }),
    // Authorization:
    //   "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0cmFuYW5odnVpYXRvQGdtYWlsLmNvbSIsImlhdCI6MTY3ODE1MDcxMSwiZXhwIjoxNjc4MTUyNTExfQ.LgdN5fui1C5efGb-rNg4_pgXG33GJ21WXIRejqZqN1k",
    // // Authorization:
    //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDE1NDE5Y2Y2NzIyNmNiNTllMDI3YiIsImlhdCI6MTY3NzgwODc1NCwiZXhwIjoxNjc3ODk1MTU0fQ.6ZOSO1heIct8sQ7rscADp_FP6yXi9rnzDPZ46D2TzwI",
  })
    .then((res) => res.json())
    .then((json) => {
      //localStorage.setItem("user", JSON.stringify(json.data));
      return json;
    });
  
};

function login(email, password) {
  return   fetch(API_URL + "login", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email:email,
      password: password,
    }),
    // Authorization:
    //   "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0cmFuYW5odnVpYXRvQGdtYWlsLmNvbSIsImlhdCI6MTY3ODE1MDcxMSwiZXhwIjoxNjc4MTUyNTExfQ.LgdN5fui1C5efGb-rNg4_pgXG33GJ21WXIRejqZqN1k",
    // // Authorization:
    //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDE1NDE5Y2Y2NzIyNmNiNTllMDI3YiIsImlhdCI6MTY3NzgwODc1NCwiZXhwIjoxNjc3ODk1MTU0fQ.6ZOSO1heIct8sQ7rscADp_FP6yXi9rnzDPZ46D2TzwI",
  })
    .then((res) => res.json())
    .then((json) => {
      localStorage.setItem("user", JSON.stringify(json.data));
      return json;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
