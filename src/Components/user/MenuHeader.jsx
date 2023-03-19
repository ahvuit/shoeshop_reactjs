import { Menu, message as msg } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { HomeFilled, LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { clearMessage } from "../../actions/message";
import { getAllBrands } from "../../actions/brand";
import { getAllSales } from "../../actions/sale";
import { logout } from "../../actions/auth";

const MenuHeader = () => {
  const { brand } = useSelector((state) => state.brand);
  const { sale } = useSelector((state) => state.sale);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const [current, setCurrent] = useState("");
  const { user: currentUser } = useSelector((state) => state.auth);
  let location = useLocation();
  useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      dispatch(clearMessage());
    }
  }, [dispatch, location]);
  useEffect(() => {
    dispatch(getAllBrands())
      .then(() => {})
      .catch(() => {
        msg.error(message);
      });
    dispatch(getAllSales())
      .then(() => {})
      .catch(() => {
        msg.error(message);
      });
  }, [dispatch, message]);

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
    <>
      <Menu
        style={{
          float: "left",
          width: "80vw",
        }}
        selectedKeys={[current]}
        onClick={onMenuClick}
        mode="horizontal"
      >
        <Menu.Item key="">
          <HomeFilled />
        </Menu.Item>
        <Menu.SubMenu key="brand" title="Brand">
          {brand !== null
            ? brand.map((_b, index) => (
                // eslint-disable-next-line jsx-a11y/alt-text
                <Menu.Item key={`brand/brand-${_b.brandId}`}>
                  <img src={_b.logo} width="40" height="25" />
                  {"  "}
                  {_b.brandName}
                </Menu.Item>
              ))
            : ""}
        </Menu.SubMenu>
        <Menu.SubMenu key="sale" title="Sale">
          {sale !== null
            ? sale.map((_s, index) => (
                <Menu.Item key={`sale/sale-${_s.salesId}`}>
                  {_s.salesName}
                </Menu.Item>
              ))
            : ""}
          <Menu.Item key="sale/sale-thich">Thích thì sale </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="new/new">New Product</Menu.Item>
        <Menu.Item key="contact">Contact</Menu.Item>
        {currentUser ? (
          <Menu.SubMenu
            key="u"
            style={{ marginLeft: "auto" }}
            title={<MenuOutlined style={{ color: "var(--primary-color)" }} />}
          >
            <Menu.Item key="logout">
              <LogoutOutlined /> Logout
            </Menu.Item>
            <Menu.Item key="profile">Profile</Menu.Item>
            <Menu.Item key={`order/${currentUser.userId}`}>My Order</Menu.Item>
          </Menu.SubMenu>
        ) : (
          <Menu.SubMenu
            key="u"
            style={{ marginLeft: "auto" }}
            title={<MenuOutlined style={{ color: "var(--primary-color)" }} />}
          >
            <Menu.Item key="login">Login</Menu.Item>

            <Menu.Item key="register">Register</Menu.Item>
          </Menu.SubMenu>
        )}
      </Menu>
    </>
  );
};
export default MenuHeader;
