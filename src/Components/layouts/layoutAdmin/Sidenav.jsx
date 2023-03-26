import {
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
  DesktopOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  KeyOutlined,
  TableOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


const { Sider } = Layout;
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("Thống kê", "statistical", <FileOutlined />),

  getItem(
    "Sản phẩm",
    "pdt",
    <PieChartOutlined />,
    [
      getItem("Quản lý sản phẩm", "products", <PieChartOutlined />),
      getItem("Sản phẩm KM", "sale-products", <DesktopOutlined />),
    ],
    "group"
  ),
  getItem(
    "ADDONS",
    "adn",
    <PieChartOutlined />,
    [
      getItem("Quản lý đơn hàng", "orders", <ShoppingCartOutlined />),
      getItem("Quản lý danh mục", "categories", <DesktopOutlined />),
      getItem("Quản lý bảng size", "sizetable", <TableOutlined />),
      getItem("Quản lý hãng giày", "brands", <DesktopOutlined />),
      getItem("Quản lý khuyễn mãi", "sales", <PieChartOutlined />),
      getItem("Quản lý phân quyền", "roles", <KeyOutlined />),
      getItem("Quản lý tài khoản", "accounts", <UserOutlined />),
      getItem("Quản lý khách hàng", "customers", <PieChartOutlined />),
      getItem("Quản lý nhân viên", "staff", <TeamOutlined/>),
    ],
    "group"
  ),

//   getItem("User", "sub1", <UserOutlined />, [
//     getItem("Tom", "3"),
//     getItem("Bill", "4"),
//     getItem("Alex", "5"),
//   ]),
//   getItem("Team", "sub2", <TeamOutlined />, [
//     getItem("Team 1", "6"),
//     getItem("Team 2", "8"),
//   ]),
//   getItem("Files", "9", <FileOutlined />),
];

const Slidenav = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState('statistical');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onMenuClick = (item) => {
    
      navigate(`/admin/${item.key}`);
    setCurrent(item.key);
  };
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{ background: "var(--primary-color)" }}
    >
      <div
        style={{
          height: 32,
          margin: 16,
          background: "rgba(255, 255, 255, 0.2)",
        }}
      />
      <Menu
        theme="light"
        defaultSelectedKeys={[current]}
        mode="inline"
        onClick={onMenuClick}        
        items={items}
        style={{ background: "var(--primary-color)" }}
      />
    </Sider>
  );
};
export default Slidenav;
