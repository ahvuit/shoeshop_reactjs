import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import brand from "./brand";
import sale from "./sale";
import product from "./product";
import cart from "./cart";

export default combineReducers({
  auth,
  message,
  brand,
  sale,
  product,
  cart,
});
