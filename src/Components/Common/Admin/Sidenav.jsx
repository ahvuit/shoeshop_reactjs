import {
  FileOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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

const Slidenav = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState("orders");
  const { user: currentUser } = useSelector((state) => state.auth);
  let items;
  if (currentUser?.utype === "ADM") {
    items = [
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
          getItem("Quản lý khuyến mãi", "sales", <PieChartOutlined />),
          getItem("Quản lý khách hàng", "customers", <PieChartOutlined />),
          getItem("Quản lý nhân viên", "employees", <TeamOutlined />),
        ],
        "group"
      ),
    ];
  } else {
    items = [
      getItem(
        "ADDONS",
        "adn",
        <PieChartOutlined />,
        [
          getItem("Quản lý đơn hàng", "orders", <ShoppingCartOutlined />),

          getItem("Quản lý bảng size", "sizetable", <TableOutlined />),
        ],
        "group"
      ),
    ];
  }

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
