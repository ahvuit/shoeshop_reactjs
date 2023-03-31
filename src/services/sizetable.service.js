import { API_URL } from "../utils/config";
import authHeader from "./auth-header";

const getAllSizeTables = () => {
  return fetch(API_URL + "getAllSizeTables", {
    method: "GET",
    mode: "cors",
    headers: authHeader(),
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
};
// const insertSizetable = (sizetable) => {
//   //console.log('bodyI: ',{...category});
//   return fetch(API_URL + "insertCategory", {
//     method: "POST",
//     mode: "cors",
//     headers: authHeader(),
//     body: JSON.stringify(category),
//   })
//     .then((res) => res.json())
//     .then((json) => {
//       // localStorage.setItem("orderResult", JSON.stringify(json.data));
//       return json;
//     });
// };
const updateSizetable = (sizeTableId, sizeTable) => {
 
  // console.log('body: ',JSON.stringify(body));
  return fetch(API_URL + `updateSizeTable/${sizeTableId}`, {
    method: "PUT",
    mode: "cors",
    headers: authHeader(),
    body: JSON.stringify(sizeTable),
  })
  
    .then((res) =>  res.json())
    .then((json) => {
      // localStorage.setItem("orderResult", JSON.stringify(json.data));
      return json;
      
    }).catch((e)=>{console.log('error: ',e)});
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllSizeTables,
  updateSizetable,
};