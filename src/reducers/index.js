import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import brand from "./brand";
import sale from "./sale";
import product from "./product";
import cart from "./cart";
import order from "./order";
import category from "./category";
import user from "./user";
import profile from "./profile";
import sizeTable from "./sizeTable";
import status from "./status";
import saleDetails from "./saleDetails";

 
export default combineReducers({
  auth,
  message,
  brand,
  sale,
  product,
  cart,
  order,
  category,
  user, 
  profile,
  sizeTable,
  status,
  saleDetails,
});
