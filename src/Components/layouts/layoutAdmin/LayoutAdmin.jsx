import { Layout, FloatButton,Col,Row } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import { GithubOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons';

import Slidenav from "./Sidenav";
import HeaderAdmin from "./Header";

const { Content, Footer } = Layout;

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
        <Footer style={{ background: '#f2f2f2' }}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <h2>Follow Us</h2>
          <div>
            <a href="https://github.com/your-github-profile">
              <GithubOutlined style={{ fontSize: '24px', marginRight: '16px' }} />
            </a>
            <a href="https://twitter.com/your-twitter-profile">
              <TwitterOutlined style={{ fontSize: '24px', marginRight: '16px' }} />
            </a>
            <a href="https://linkedin.com/in/your-linkedin-profile">
              <LinkedinOutlined style={{ fontSize: '24px', marginRight: '16px' }} />
            </a>
          </div>
        </Col>
        <Col span={6}>
          <h2>Contact</h2>
          <p>473 Man Thien, Tp Thu Duc, Tp HCM</p>
        
          <p>0523147007</p>
          <p>VHITShop@gmail.com</p>
        </Col>
        <Col span={6}>
          <h2>Legal</h2>
          <p>©{new Date().getFullYear()} VHIT ShoesStore</p>
          <p>All rights reserved.</p>
        </Col>
      </Row>
    </Footer>
      </Layout>
    </Layout>
  );
};
export default LayoutAdmin;
