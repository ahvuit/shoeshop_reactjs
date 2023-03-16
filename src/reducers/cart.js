import {
  GET_NUMBER_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART
} from "../actions/types";
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const numberCartFromStorage = localStorage.getItem("numberCart")
  ? JSON.parse(localStorage.getItem("numberCart"))
  : 0;

const initialState = { numberCart: numberCartFromStorage, Carts: cartItemsFromStorage, _products: [] };
// const initialState = { numberCart: 0, Carts: [], _products: [] };
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_CART:
      const { item, size } = payload;
      const newItem = { ...item, size };
      const existingItem = state.Carts.find(
        (product) => product.productId === newItem.productId && product.size === size
      );
      if (existingItem) {
        existingItem.quantity += 1;
        return { ...state };
      } else {
        newItem.quantity = 1;
        return { ...state,numberCart:state.numberCart+1, Carts: [...state.Carts, newItem] };
      }
    case REMOVE_FROM_CART:
      const { productId, size: removeSize } = payload;
      const newCart = state.Carts.filter(
        (product) => !(product.productId === productId && product.size === removeSize)
      );
      return { ...state,numberCart:state.numberCart-1, Carts: newCart };
    case INCREASE_QUANTITY:
      const { productId: incId, size: incSize } = payload;
      const incProduct = state.Carts.find(
        (product) => product.productId === incId && product.size === incSize
      );
      incProduct.quantity += 1;
      return { ...state };
    case DECREASE_QUANTITY:
      const { productId: decId, size: decSize } = payload;
      const decProduct = state.Carts.find(
        (product) => product.productId === decId && product.size === decSize
      );
      if (decProduct.quantity === 1) {
        const newCart = state.Carts.filter(
          (product) => !(product.productId === decId && product.size === decSize)
        );
        return { ...state,numberCart:state.numberCart-1, Carts: newCart };
      } else {
        decProduct.quantity -= 1;
        return { ...state };
      }
    case CLEAR_CART:
      
     
      return { ...state,numberCart:0, Carts: [] };
      
    case GET_NUMBER_CART:
      return {
        ...state,
      };
    default:
      return state;
  }
}
