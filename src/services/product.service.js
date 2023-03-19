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
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllProducts,
  getProductDetails,
};
