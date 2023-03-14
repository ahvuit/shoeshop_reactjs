import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
    CLEAR_MESSAGE
    
  } from "./types";
  
  import AuthService from "../services/auth.service";
  
  
  export const register = (email, password) => (dispatch) => {
    return AuthService.register(email, password).then(
      (response) => {
        console.log(response);
        if(response.data!=null && Object.keys(response.data).length!==0){
          
          dispatch({
            type: REGISTER_SUCCESS,
          });
    
          dispatch({
            type: SET_MESSAGE,
            payload: response.message,
          });
    
         return Promise.resolve();
        }else{
          const message= response.message;
          dispatch({
            type: REGISTER_FAIL,
          });
    
          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });
    
          return Promise.reject();
    
        }
        
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: REGISTER_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  export const login =(email, password)=>{
    return (dispatch, getState)=>{
      return  AuthService.login(email,password).then(
        (data)=> {
          console.log('data: ',data);
          if(data.data!=null && Object.keys(data.data).length!==0){
          
                    dispatch({
                    type: LOGIN_SUCCESS,
                    payload: { user: data.data },
                  });
                  
                   return Promise.resolve();
                  }else{
                    const message= data.message;
                    dispatch({
                      type: LOGIN_FAIL,
                    });
              
                    dispatch({
                      type: SET_MESSAGE,
                      payload: message,
                    });
              
                    return Promise.reject();
                  }
        }
      )
    }
  }
  // export const login = (email, password) =>async (dispatch) => {
  //   return await  AuthService.login(email, password).then(
  //     (data) => {
  //       console.log(data);
  //       if(data.data!=null && Object.keys(data.data).length!==0){
          
  //         dispatch({
  //         type: LOGIN_SUCCESS,
  //         payload: { user: data.data },
  //       });
  //        return Promise.resolve();
  //       }else{
  //         const message= data.message;
  //         dispatch({
  //           type: LOGIN_FAIL,
  //         });
    
  //         dispatch({
  //           type: SET_MESSAGE,
  //           payload: message,
  //         });
    
  //         return Promise.reject();
  //       }
        
  
       
  //     },
  //     (error) => {
  //       const message =
  //         (error.response &&
  //           error.response.data &&
  //           error.response.data.message) ||
  //         error.message ||
  //         error.toString();
  
  //       dispatch({
  //         type: LOGIN_FAIL,
  //       });
  
  //       dispatch({
  //         type: SET_MESSAGE,
  //         payload: message,
  //       });
  
  //       return Promise.reject();
  //     }
  //   );
  // };
  
  export const logout = () => (dispatch) => {
    AuthService.logout();
  
    dispatch({
      type: LOGOUT,
    });
    dispatch({
          type: CLEAR_MESSAGE,
          //payload: message,
        });
    
    
    
  };