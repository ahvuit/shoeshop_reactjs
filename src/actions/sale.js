import {
    GET_SALE_SUCCESS,
    GET_SALE_FAIL,
    SET_MESSAGE
  } from "./types";
import SaleService from "../services/sale.service";

export const getAllSales = () => (dispatch) => {
  return SaleService.getAllSales().then(
    (data) => {
      // console.log(data);
      if(data.data!=null && Object.keys(data.data).length!==0){
        
        dispatch({
        type: GET_SALE_SUCCESS,
        payload: { sales: data.data },
        
      });
      // dispatch({
      //   type: SET_MESSAGE,
      //   payload: data.message,
      // });
       return Promise.resolve();
      }else{
        const message= data.message;
        dispatch({
          type: GET_SALE_FAIL,
        });
  
        // dispatch({
        //   type: SET_MESSAGE,
        //   payload: message,
        // });
  
        return Promise.reject();
      }
      

     
    }
  );
};