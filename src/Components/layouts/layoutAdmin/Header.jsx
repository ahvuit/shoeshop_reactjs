import { LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import {  Layout, Menu } from "antd";
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../actions/auth";

const { Header } = Layout;
const HeaderAdmin = () => {
  const [current, setCurrent] = useState("");
  const dispatch = useDispatch();

  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();
  const logOut = useCallback(() => {
    dispatch(logout());
    navigate("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  const navigate = useNavigate();

  const onMenuClick = (item) => {
    if (item.key === "logout") {
      logOut();
    } else {
      navigate(`/${item.key}`);
    }
    setCurrent(item.key);
  };
  return (
    <Header
      style={{
        padding: 0,
        background: "var(--primary-color)",
        position: "sticky",
        top: 0,
        zIndex: 1,
      }}
    >
      <Menu
        style={{
          float: "right",
          background: "var(--primary-color)",

          // width: "100vw",
        }}
        selectedKeys={[current]}
        onClick={onMenuClick}
        mode="horizontal"
      >
        <Menu.SubMenu
          key="u"
          style={{ marginLeft: "auto" }}
          title={<MenuOutlined style={{ color: "#fff" }} />}
        >
          <Menu.Item key="logout">
            <LogoutOutlined /> Logout
          </Menu.Item>
          <Menu.Item key="admin/profile">Profile</Menu.Item>
          <Menu.Item key="">Go Home</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Header>
  );
};
export default HeaderAdmin;
