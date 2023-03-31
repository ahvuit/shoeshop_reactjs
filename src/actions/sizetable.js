import {
    GET_SIZETABLE_SUCCESS,
    GET_SIZETABLE_FAIL,
    UPDATE_SIZETABLE_SUCCESS,
    UPDATE_SIZETABLE_FAIL
  } from "./types";
  import SizeTableService from "../services/sizetable.service";
  import ProductService from "../services/product.service";
  
  export const getAllSizeTables = () => (dispatch) => {
    return ProductService.getAllProducts().then((data) => {
      if (data.data != null && Object.keys(data.data).length !== 0) {
        const newProducts = data.data?.map((p, i) => {
          const {name,image,sizeTable,...r}= p
      
          return {name,image,...sizeTable};
      });
      //console.log('action: ',newProducts);
        dispatch({
          type: GET_SIZETABLE_SUCCESS, 
          payload: { sizeTables: newProducts},
        });
        return Promise.resolve();
      } else {
        dispatch({
          type: GET_SIZETABLE_FAIL,
        });
        return Promise.reject();
      }
    });
  };

  export const updateSizeTable = (sizeTableId, sizeTable) => (dispatch) => {
    return SizeTableService.updateSizetable(sizeTableId, sizeTable).then(
      (response) => {
        if (response.data != null && Object.keys(response.data).length !== 0) {
          dispatch({
            type: UPDATE_SIZETABLE_SUCCESS,
            payload: { sizeTable: response.data },
          });
          return Promise.resolve();
        } else {
          dispatch({
            type: UPDATE_SIZETABLE_FAIL,
            payload: { error: response.message },
          });
          return Promise.reject();
        }
      }
    );
  };