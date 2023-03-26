
import { Breadcrumb, Layout, Menu, theme, FloatButton } from "antd";
import React, { useState, useCallback } from "react";
import Slidenav from "./Sidenav";
import HeaderAdmin from "./Header";
import { Outlet } from "react-router-dom";

const { Header, Content, Footer } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const LayoutAdmin = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
 

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
      hasSider
    >
     <Slidenav/>
      <Layout className="site-layout">
        <HeaderAdmin/>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: '80vh',
              background: '#fff',
            }}
          >
            <Outlet/>

            {/* <p>long content</p>
            {Array.from(
              {
                length: 100,
              },
              (_, index) => (
                <React.Fragment key={index}>
                  {index % 20 === 0 && index ? "more" : "..."}
                  <br />
                </React.Fragment>
              )
            )} */}
          </div>
        </Content>
        <FloatButton.BackTop />
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default LayoutAdmin;