import { Layout, FloatButton } from "antd";
import { Outlet } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import MenuHeader from "../user/MenuHeader";
import { clearMessage } from "../../actions/message";
import AppCart from "../user/AppCart";

const { Header, Content, Footer } = Layout;

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
      <Header
        style={{
          background: "#fff",
          position: "sticky",
          top: 0,
          zIndex: 1,
          height: 68.6,
          width: "100%",
        }}
      >
        <div
          style={{
            float: "left",
            width: 120,
            height: 31,
            fontSize: 20,
            color: "var(--primary-color)",
          }}
        >
          VHIT Store
        </div>
        <div style={{ display: "flex" }}>
          <MenuHeader />
          <AppCart
            style={{
              float: "right",
              width: "10vw",
            }}
          />
        </div>
      </Header>
      <Content
        className="site-layout"
        style={{
          padding:20
        }}
      >
        <Outlet />
      </Content>

      <FloatButton.BackTop />
      <Footer
        style={{
          textAlign: "center",
          color: "#fff",
          background: "var(--primary-color)",
        }}
      >
        &#169; 2023 - Copyright Than Duy Hanh
      </Footer>
    </>
  );
};

export default LayoutUser;
