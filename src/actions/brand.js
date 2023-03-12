import {
    GET_BRAND_SUCCESS,
    GET_BRAND_FAIL,
    SET_MESSAGE
  } from "./types";
import BrandService from "../services/brand.service";

export const getAllBrands = () => (dispatch) => {
  return BrandService.getAllBrand().then(
    (data) => {
      // console.log(data);
      if(data.data!=null && Object.keys(data.data).length!==0){
        
        dispatch({
        type: GET_BRAND_SUCCESS,
        payload: { brands: data.data },
        
      });
      // dispatch({
      //   type: SET_MESSAGE,
      //   payload: data.message,
      // });
       return Promise.resolve();
      }else{
        const message= data.message;
        dispatch({
          type: GET_BRAND_FAIL,
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