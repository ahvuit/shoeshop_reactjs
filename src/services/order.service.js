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
    // Authorization:
    //   "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0cmFuYW5odnVpYXRvQGdtYWlsLmNvbSIsImlhdCI6MTY3ODE1MDcxMSwiZXhwIjoxNjc4MTUyNTExfQ.LgdN5fui1C5efGb-rNg4_pgXG33GJ21WXIRejqZqN1k",
    // // Authorization:
    //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDE1NDE5Y2Y2NzIyNmNiNTllMDI3YiIsImlhdCI6MTY3NzgwODc1NCwiZXhwIjoxNjc3ODk1MTU0fQ.6ZOSO1heIct8sQ7rscADp_FP6yXi9rnzDPZ46D2TzwI",
  })
    .then((res) => res.json())
    .then((json) => {
      localStorage.setItem("orderResult", JSON.stringify(json.data));
      return json;
    });
};
export default {
  addOrder,
};
