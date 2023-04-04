import { Menu, message as msg } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { HomeFilled, LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { clearMessage } from "../../actions/message";
import { getAllBrands } from "../../actions/brand";
import { getAllCategories } from "../../actions/category";
import { getAllSales } from "../../actions/sale";
import { logout } from "../../actions/auth";

const MenuHeader = () => {
  const { brand } = useSelector((state) => state.brand);
  const { categories } = useSelector((state) => state.category);

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
    dispatch(getAllCategories())
      .then(() => {})
      .catch(() => {});
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
        <Menu.SubMenu key="brand" title="Hãng">
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
        <Menu.SubMenu key="cate" title="Danh mục">
          {categories !== null
            ? categories.map((_c, index) => (
                // eslint-disable-next-line jsx-a11y/alt-text
                <Menu.Item key={`cate/cate-${_c.categoryId}`}>
                  {/* <img src={_b.logo} width="40" height="25" /> */}
                  {"  "}
                  {_c.categoryName}
                </Menu.Item>
              ))
            : ""}
        </Menu.SubMenu>
        <Menu.SubMenu key="sale" title="Khuyến mãi">
          {sale !== null
            ? sale.map((_s, index) => (
                <Menu.Item key={`sale/sale-${_s.salesId}`}>
                  {_s.salesName}
                </Menu.Item>
              ))
            : ""}
        </Menu.SubMenu>
        <Menu.Item key="new/new">Sản phẩm mới</Menu.Item>
        <Menu.Item key="contact">Liên hệ</Menu.Item>
        {currentUser ? (
          <Menu.SubMenu
            key="u"
            style={{ marginLeft: "auto" }}
            title={<MenuOutlined style={{ color: "var(--primary-color)" }} />}
          >
            <Menu.Item key="logout">
              <LogoutOutlined /> Đăng xuất
            </Menu.Item>
            <Menu.Item key="profile">
              Thông tin tài khoản<nav></nav>
            </Menu.Item>
            {currentUser.utype === "USR" ? (
              <Menu.Item key={`order/${currentUser.userId}`}>
                Đơn hàng của tôi
              </Menu.Item>
            ) : (
              <Menu.Item key={`admin`}>Trang quản trị</Menu.Item>
            )}
          </Menu.SubMenu>
        ) : (
          <Menu.SubMenu
            key="u"
            style={{ marginLeft: "auto" }}
            title={<MenuOutlined style={{ color: "var(--primary-color)" }} />}
          >
            <Menu.Item key="login">Đăng nhập</Menu.Item>

            <Menu.Item key="register">Đăng ký</Menu.Item>
          </Menu.SubMenu>
        )}
      </Menu>
    </>
  );
};
export default MenuHeader;
