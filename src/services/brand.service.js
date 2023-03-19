import { API_URL } from "../utils/config";
import authHeader from "./auth-header";

const getAllBrand = () => {
  return fetch(API_URL + "getAllBrands", {
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
  getAllBrand,
};
