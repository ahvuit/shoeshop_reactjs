import { Layout, FloatButton ,Row,Col} from "antd";
import { Outlet } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { GithubOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons';
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
          padding: 20,
        }}
      >
        <Outlet />
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
    </>
  );
};

export default LayoutUser;
