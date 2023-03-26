import { API_URL } from "../utils/config";
import authHeader from "./auth-header";

const getAllCategories = () => {
  return fetch(API_URL + "getAllCategories", {
    method: "GET",
    mode: "cors",
    headers: authHeader(),
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
};
const insertCategory = (category) => {
  console.log('bodyI: ',{...category});
  return fetch(API_URL + "insertCategory", {
    method: "POST",
    mode: "cors",
    headers: authHeader(),
    body: JSON.stringify(category),
  })
    .then((res) => res.json())
    .then((json) => {
      // localStorage.setItem("orderResult", JSON.stringify(json.data));
      return json;
    });
};
const updateCategory = (categoryId, category) => {
 
  // console.log('body: ',JSON.stringify(body));
  return fetch(API_URL + `updateCategory/${categoryId}`, {
    method: "PUT",
    mode: "cors",
    headers: authHeader(),
    body: JSON.stringify(category),
  })
  
    .then((res) =>  res.json())
    .then((json) => {
      // localStorage.setItem("orderResult", JSON.stringify(json.data));
      return json;
      
    }).catch((e)=>{console.log('error: ',e)});
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllCategories,
  insertCategory,
  updateCategory,
};
