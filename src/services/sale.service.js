import { API_URL } from "../utils/config";
import authHeader from "./auth-header";

const getAllSales = () => {
  return fetch(API_URL + "getAllSales", {
    method: "GET",
    mode: "cors",
    headers: authHeader(),
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
};

const insertSale = (sale) => {
  return fetch(API_URL + "insertSales", {
    method: "POST",
    mode: "cors",
    headers: authHeader(),
    body: JSON.stringify(sale),
  })
    .then((res) => res.json())
    .then((json) => {
      // localStorage.setItem("orderResult", JSON.stringify(json.data));
      return json;
    });
};
const updateSale = (salesId, sale) => {
 
  return fetch(API_URL + `updateSales/${salesId}`, {
    method: "PUT",
    mode: "cors",
    headers: authHeader(),
    body: JSON.stringify(sale),
  })
  
    .then((res) =>  res.json())
    .then((json) => {
      // localStorage.setItem("orderResult", JSON.stringify(json.data));
      return json;
      
    }).catch((e)=>{});
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllSales,
  updateSale,
  insertSale 
};
