import {
  GET_SALE_DETAILS_SUCCESS,
  GET_SALE_DETAILS_FAIL,
  DELETE_SALE_DETAILS_SUCCESS,
  DELETE_SALE_DETAILS_FAIL,
  GET_SALE_DETAILS_IS_COMING_SUCCESS,
  GET_SALE_DETAILS_IS_COMING_FAIL,
  GET_SALE_DETAILS_IS_ACTIVE_SUCCESS,
  GET_SALE_DETAILS_IS_ACTIVE_FAIL,
  INSERT_SALE_DETAILS_SUCCESS,
  INSERT_SALE_DETAILS_FAIL
} from "../actions/types";
const initialState = { saleDetails: [],saleDetailsIsComing:null,saleDetailsIsActive:null, error: null };
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

    case GET_SALE_DETAILS_IS_COMING_SUCCESS:
      return {
        ...state,

        saleDetailsIsComing: payload.saleDetails,
      };
    case GET_SALE_DETAILS_IS_COMING_FAIL:
      return {
        ...state,
        saleDetailsIsComing: null,
      };
    case GET_SALE_DETAILS_IS_ACTIVE_SUCCESS:
      return {
        ...state,

        saleDetailsIsActive: payload.saleDetails,
      };
    case GET_SALE_DETAILS_IS_ACTIVE_FAIL:
      return {
        ...state,
        saleDetailsIsActive: null,
      };
      case INSERT_SALE_DETAILS_SUCCESS:
        console.log('data reduces: ',...payload.saleDetails);
        //console.log('data reduces: ',{saleDetails:[...state.saleDetails, payload.saledetails]});
        return {
          ...state,
          saleDetails: [...state.saleDetails, ...payload.saleDetails],
          error: null,
          // categories: payload.categories,
        };
      case INSERT_SALE_DETAILS_FAIL:
        console.log('e');
        return {
          ...state,
          error: payload.error,
        };
    // case DELETE_SALE_DETAILS_SUCCESS:
    //   const productId = payload.productId;
    //   const newSD = state.saleDetails.filter(
    //     (item) => item.productId !== productId
    //   );

    //   return {
    //     ...state,
    //     saleDetails: newSD,
    //     error: null,
    //   };
    // case DELETE_SALE_DETAILS_FAIL:
    //   return {
    //     ...state,
    //     error: payload.error,
    //   };
    default:
      return state;
  }
}
