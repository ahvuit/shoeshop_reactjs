import { Layout, FloatButton } from "antd";
import { Outlet } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { clearMessage } from "../../actions/message";

import UserHeader from "../../Components/Common/User/UserHeader";
import AdminFooter from "../../Components/Common/Footer";

const { Content } = Layout;

const LayoutUser = (props) => {
  const dispatch = useDispatch();
  let location = useLocation();

  useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      dispatch(clearMessage());
    }
  }, [dispatch, location]);
  return (
    <>
      <UserHeader />

      <Content
        className="site-layout"
        style={{
          padding: 20,
        }}
      >
        <Outlet />
      </Content>
      <FloatButton.BackTop />
      <AdminFooter />
    </>
  );
};

export default LayoutUser;
