import { API_URL } from "../utils/config";
import authHeader from "./auth-header";
const addOrder = (orderModel, listOrderDetails) => {
  return fetch(API_URL + "insertOrder", {
    method: "POST",
    mode: "cors",
    headers: authHeader(),
    body: JSON.stringify({
      orderModel,
      listOrderDetails,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      localStorage.setItem("orderResult", JSON.stringify(json.data));
      return json;
    });
};
const getAllOrderByUserId = (userId) => {
  return fetch(API_URL + `getOrderByUserId/${userId}`, {
    method: "GET",
    mode: "cors",
    headers: authHeader(),
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
};
const cancelOrder = (orderId) => {
  return fetch(API_URL + `cancelOrder/${orderId}`, {
    method: "PUT",
    mode: "cors",
    headers: authHeader(),
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return json;
    });
};
const getAllOrders = () => {
  return fetch(API_URL + `getAllOrders`, {
    method: "GET",
    mode: "cors",
    headers: authHeader(),
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    });
};
const updateOrder = (orderId, order) => {
 
  // console.log('body: ',JSON.stringify(body));
  return fetch(API_URL + `updateOrder/${orderId}`, {
    method: "PUT",
    mode: "cors",
    headers: authHeader(),
    body: JSON.stringify(order),
  })
  
    .then((res) =>  res.json())
    .then((json) => {
      // localStorage.setItem("orderResult", JSON.stringify(json.data));
      return json;
      
    }).catch((e)=>{console.log('error: ',e)});
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  addOrder,
  getAllOrderByUserId,
  cancelOrder,
  getAllOrders,
  updateOrder, 
};
