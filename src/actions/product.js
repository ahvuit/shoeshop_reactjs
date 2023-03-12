import {
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAIL,
    SELECTED_PRODUCT,
  } from "./types";
import ProductService from "../services/product.service";

export const getAllProducts = () => (dispatch) => {
  return ProductService.getAllProducts().then(
    (data) => {
      // console.log(data);
      if(data.data!=null && Object.keys(data.data).length!==0){
        
        dispatch({
        type: GET_PRODUCT_SUCCESS,
        payload: { products: data.data },
        
      });
      // dispatch({
      //   type: SET_MESSAGE,
      //   payload: data.message,
      // });
       return Promise.resolve();
      }else{
        // const message= data.message;
        dispatch({
          type: GET_PRODUCT_FAIL,
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
export const selectedProduct = (productId) => (dispatch) => {
  return ProductService.getProductDetails(productId).then(
    (data) => {
      // console.log(data);
      if(data.data!=null && Object.keys(data.data).length!==0){
        
        dispatch({
        type: SELECTED_PRODUCT,
        payload: { product: data.data },
        
      });
       return Promise.resolve();
      }else{
        // const message= data.message;
        // dispatch({
        //   type: GET_PRODUCT_FAIL,
        // });
  
        // dispatch({
        //   type: SET_MESSAGE,
        //   payload: message,
        // });
  
        return Promise.reject();
      }
      // return{
      //   type: SELECTED_PRODUCT,
      //   payload: product,
      // }
    

     
    }
  );
};

 