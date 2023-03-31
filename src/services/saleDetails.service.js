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

// const insertSale = (sale) => {
//   //console.log('bodyI: ',{...category});
//   return fetch(API_URL + "insertSales", {
//     method: "POST",
//     mode: "cors",
//     headers: authHeader(),
//     body: JSON.stringify(sale),
//   })
//     .then((res) => res.json())
//     .then((json) => {
//       // localStorage.setItem("orderResult", JSON.stringify(json.data));
//       return json;
//     });
// };
const deleteSaleDetails = (id ) => {
 
  // console.log('body: ',JSON.stringify(body));
  return fetch(API_URL + `deleteSaleDetails/${id}`, {
    method: "DELETE",
    mode: "cors",
    headers: authHeader(),
   // body: JSON.stringify(sale),
  })
  
    .then((res) =>  res.json())
    .then((json) => {
      // localStorage.setItem("orderResult", JSON.stringify(json.data));
      return json;
      
    }).catch((e)=>{console.log('error: ',e)});
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getSaleDetailsBySalesId,
  deleteSaleDetails
//   updateSale,
//   insertSale 
};