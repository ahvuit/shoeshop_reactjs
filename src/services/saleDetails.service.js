import { API_URL } from "../utils/config";
import authHeader from "./auth-header";

const getSaleDetailsBySalesId = (id) => {
  return fetch(API_URL + `getSaleDetailsBySalesId/${id}`, {
    method: "GET",
    mode: "cors",
    headers: authHeader(),
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
};

const getSaleDetailsIsComing = () => {
  return fetch(API_URL + `getAllSaleDetailsComingSoon`, {
    method: "GET",
    mode: "cors",
    headers: authHeader(),
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
};

const getSaleDetailsIsActive = () => {
  return fetch(API_URL + `getAllSaleDetailsActive`, {
    method: "GET",
    mode: "cors",
    headers: authHeader(),
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
};

const insertSaleDetails = (sale) => {

  return fetch(API_URL + "insertSalesDetails", {
    method: "POST",
    mode: "cors",
    headers: authHeader(),
    body: JSON.stringify(sale),
  })
    .then((res) => res.json())
    .then((json) => {
      
      // localStorage.setItem("orderResult", JSON.stringify(json.data));
      return json;
    }).catch((e)=>{});
};
// const deleteSaleDetails = (sale ) => {
 
  
//   return fetch(API_URL + `deleteSaleDetailsByList`, {
//     method: "DELETE",
//     mode: "cors",
//     headers: authHeader(),
//     body: JSON.stringify(sale),
//   }) 
  
//     .then((res) =>  res.json())
//     .then((json) => {
//       // localStorage.setItem("orderResult", JSON.stringify(json.data));
//       return json;
      
//     }).catch((e)=>{});
// };
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getSaleDetailsBySalesId,
  //deleteSaleDetails,
  getSaleDetailsIsComing,
  getSaleDetailsIsActive,
  insertSaleDetails
//   updateSale,
//   insertSale 
};