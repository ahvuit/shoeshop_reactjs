import { API_URL } from "../utils/config";
import authHeader from "./auth-header";

const getAllProducts = () => {
  return fetch(API_URL + "getAllProducts", {
    method: "GET",
    mode: "cors",
    headers: authHeader(),
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
};
const getProductDetails = (productId) => {
  return fetch(API_URL + `getProductDetails/${productId}`, {
    method: "GET",
    mode: "cors",
    headers: authHeader(),
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
};
const insertProduct = (product) => {
  return fetch(API_URL + "insertProduct", {
    method: "POST",
    mode: "cors",
    headers: authHeader(),
    body: JSON.stringify(product),
  })
    .then((res) => res.json())
    .then((json) => {
      // localStorage.setItem("orderResult", JSON.stringify(json.data));
      return json;
    });
};
const updateProduct= (productId, product) => {
  return fetch(API_URL + `updateProduct/${productId}`, {
    method: "PUT",
    mode: "cors",
    headers: authHeader(),
    body: JSON.stringify(product),
  })
  
    .then((res) =>  res.json())
    .then((json) => {
      // localStorage.setItem("orderResult", JSON.stringify(json.data));
      return json;
      
    }).catch((e)=>{});
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllProducts,
  getProductDetails,
  updateProduct,
  insertProduct
};
