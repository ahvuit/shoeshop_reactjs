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
const insertBrand = (brand) => {
  return fetch(API_URL + "insertBrand", {
    method: "POST",
    mode: "cors",
    headers: authHeader(),
    body: JSON.stringify(brand),
  })
    .then((res) => res.json())
    .then((json) => {
      // localStorage.setItem("orderResult", JSON.stringify(json.data));
      return json;
    });
};
const updateBrand = (brandId, brand) => {
  return fetch(API_URL + `updateBrand/${brandId}`, {
    method: "PUT",
    mode: "cors",
    headers: authHeader(),
    body: JSON.stringify(brand),
  })
    .then((res) => res.json())
    .then((json) => {
      // localStorage.setItem("orderResult", JSON.stringify(json.data));
      return json;
    })
    .catch((e) => {
    });
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllBrand,
  insertBrand,
  updateBrand,
};
