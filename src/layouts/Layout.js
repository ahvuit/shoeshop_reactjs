import {
  
  Layout ,
} from "antd";
import React, {  useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import "../App.css";
import { clearMessage } from "../actions/message";
import LayoutUser from './LayoutUser';
import LayoutAdmin from './LayoutAdmin';
const Layouts = () => {
 

  

  const { user: currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  let location = useLocation();
  useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      dispatch(clearMessage()); // clear message when changing location
    }
  }, [dispatch, location]);

  
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();
  
  return (<>
    <Layout>
      {/* {currentUser?(currentUser.utype==='USR'?(<LayoutUser/>):(<LayoutAdmin/>)):(<LayoutUser/>)} */}
      <LayoutUser/>
      
    </Layout></>
  );
};

export default Layouts;
