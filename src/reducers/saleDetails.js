import { GET_SALE_DETAILS_SUCCESS, GET_SALE_DETAILS_FAIL,DELETE_SALE_DETAILS_SUCCESS,DELETE_SALE_DETAILS_FAIL } from "../actions/types";
const initialState = { saleDetails: null ,error:null };
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SALE_DETAILS_SUCCESS:
      return {
        ...state,

        saleDetails: payload.saleDetails,
      }; 
    case GET_SALE_DETAILS_FAIL:
      return {
        ...state,
        saleDetails: null,
      };
    //   case INSERT_SALE_SUCCESS:
    //     return {
    //       ...state,
    //       sale: [...state.sale, payload.sale],
    //       error: null,
    //       // categories: payload.categories,
    //     };
    //   case INSERT_SALE_FAIL:
    //     return {
    //       ...state,
    //       error: payload.error,
    //     };
      case DELETE_SALE_DETAILS_SUCCESS:
        const productId = payload.productId;
        console.log('sssss: ',productId);
        const newSD = state.saleDetails.filter((item)=>item.productId !== productId)
       
        return { 
          ...state,
          saleDetails: newSD,
          error: null,
        };
      case DELETE_SALE_DETAILS_FAIL:
        return {
          ...state,
          error: payload.error,
        };
    default:
      return state;
  }
}
