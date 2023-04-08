import { Layout, FloatButton} from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import AdminFooter from "../../Components/Common/Footer";

import Slidenav from "../../Components/Common/Admin/Sidenav";
import HeaderAdmin from "../../Components/Common/Admin/Header";

const { Content } = Layout;

const LayoutAdmin = () => {
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
      hasSider
    >
      <Slidenav />
      <Layout className="site-layout">
        <HeaderAdmin />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: "80vh",
              background: "#fff",
            }}
          >
            <Outlet />
          </div>
        </Content>
        <FloatButton.BackTop />
        <AdminFooter />
      </Layout>
    </Layout>
  );
};
export default LayoutAdmin;
