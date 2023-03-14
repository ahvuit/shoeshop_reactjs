import {
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  ADD_TO_CART,
  GET_NUMBER_CART,
  REMOVE_FROM_CART
} from "./types";


export const getNumberCart = () => {
  return {
    type: GET_NUMBER_CART,
  };
};
// action creators
export const addToCart = (item, size) =>{
  return (dispatch, getState)=>{
    dispatch({ type: ADD_TO_CART, payload: { item, size } });
    const numberCart =getState().cart.numberCart;
    const cartItems = getState().cart.Carts;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("numberCart", JSON.stringify(numberCart));
    
  }
}

export const removeFromCart = (productId, size) =>{
  return (dispatch, getState)=>{
    dispatch({type: REMOVE_FROM_CART,
      payload: { productId, size },});
      const numberCart =getState().cart.numberCart;
    const cartItems = getState().cart.Carts;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("numberCart", JSON.stringify(numberCart));
  }
} 
// export const removeFromCart = (productId, size) => ({
//   type: REMOVE_FROM_CART,
//   payload: { productId, size },
// });

export const increaseQuantity = (productId, size) =>{
  return(dispatch,getState)=>{
    dispatch({type: INCREASE_QUANTITY,
      payload: { productId, size },});
      const numberCart =getState().cart.numberCart;
          const cartItems = getState().cart.Carts;
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
          localStorage.setItem("numberCart", JSON.stringify(numberCart));
  }
} 

export const decreaseQuantity = (productId, size) =>{
  return(dispatch,getState)=>{
    dispatch({type: DECREASE_QUANTITY,
      payload: { productId, size },})
      const numberCart =getState().cart.numberCart;
          const cartItems = getState().cart.Carts;
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
          localStorage.setItem("numberCart", JSON.stringify(numberCart));
  }
} 

