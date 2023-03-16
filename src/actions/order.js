import {
    INSERT_ORDER_SUCCESS,
    INSERT_ORDER_FAIL,
    SET_MESSAGE
    
  } from "./types";

  import OrderService from "../services/order.service";

  export const addOrder = (orderModel, listOrderDetails) => (dispatch) => {
    return OrderService.addOrder(orderModel, listOrderDetails).then(
      (response) => {
        console.log(response);
        if(response.data!=null && Object.keys(response.data).length!==0){
          
          dispatch({
            type: INSERT_ORDER_SUCCESS,
            payload: {order: response.data}
          });
    
          dispatch({
            type: SET_MESSAGE,
            payload: response.message,
          });
    
         return Promise.resolve();
        }else{
          const message= response.message;
          dispatch({
            type: INSERT_ORDER_FAIL,
          });
    
          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });
    
          return Promise.reject();
    
        }
        
      }
    );
  };