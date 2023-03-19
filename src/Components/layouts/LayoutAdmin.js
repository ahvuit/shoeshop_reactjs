import {
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
  DesktopOutlined,
  TeamOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, FloatButton } from "antd";
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../actions/auth";

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];
const LayoutAdmin = () => {
  const [current, setCurrent] = useState("");
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
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
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            position: "sticky",
            top: 0,
            zIndex: 1,
          }}
        >
          <Menu
            style={{
              float: "left",
              width: "80vw",
            }}
            selectedKeys={[current]}
            onClick={onMenuClick}
            mode="horizontal"
          >
            <Menu.SubMenu
              key="u"
              style={{ marginLeft: "auto" }}
              title={<MenuOutlined style={{ color: "var(--primary-color)" }} />}
            >
              <Menu.Item key="logout">
                <LogoutOutlined /> Logout
              </Menu.Item>
              <Menu.Item key="profile">Profile</Menu.Item>
              <Menu.Item key={`order/${currentUser.userId}`}>
                My Order
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <p>long content</p>
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
            )}
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

// import {
//     Breadcrumb,
//     Layout,
//     Menu,
//     theme,
//     Drawer,
//     Typography,
//     Badge,
//     FloatButton,
//   } from "antd";
//   import React, { useState, useEffect, useCallback, useRef } from "react";
// //   import AppRoutes from "../components/Routes";
//   //import GeneralRouting from "../components/Routes/GeneralRouting";

//   import MenuHeader from '../Components/user/MenuHeader'
//   import { useDispatch, useSelector } from "react-redux";
//   import { useLocation } from "react-router-dom";
//   import {
//     ShoppingCartOutlined,

//   } from "@ant-design/icons";
//   import { useNavigate } from "react-router-dom";
//   import AppRoutes from '../Components/Routes'
//   import "../App.css";
// //   import { logout } from "../actions/auth";
// //   import { clearMessage } from "../actions/message";
// //   import authHeader from "../services/auth-header";
//   const { Header, Content, Footer } = Layout;

// const LayoutAdmin=()=>{
//     return (<><Header
//         style={{
//             background: "#fff",
//             position: "sticky",
//             top: 0,
//             zIndex: 1,
//             height: 68.6,
//             width: "100%",
//             position: "fixed",
//         }}
//     >
//         <div
//             style={{
//                 float: "left",
//                 width: 120,
//                 height: 31,
//                 fontSize: 20,
//                 // margin: "17px 24px 17px 0",
//                 // background: "rgba(0, 0, 0, 0.1)",
//             }}
//         >
//             ADMIN
//         </div>
//         <div style={{ display: "flex" }}>
//             {/* <Menu
//       style={{
//         float: "left",
//         width: "80vw",
//       }}
//       // theme="dark"
//       mode="horizontal"
//       defaultSelectedKeys={["2"]}
//       items={new Array(3).fill(null).map((_, index) => ({
//         key: String(index + 1),
//         label: `nav ${index + 1}`,
//       }))}
//     /> */}
//             {/* //---------------------------------------------------- */}
//             <MenuHeader />

//         </div>
//     </Header><Content
//         className="site-layout"
//         style={{
//             paddingTop: 68.8,
//         }}
//     >
//             {/* <Breadcrumb
//       style={{
//         margin: "16px 0",
//       }}
//     >
//       <Breadcrumb.Item>Home</Breadcrumb.Item>
//       <Breadcrumb.Item>List</Breadcrumb.Item>
//       <Breadcrumb.Item>App</Breadcrumb.Item>
//     </Breadcrumb> */}

//             <AppRoutes />
//             {/* <GeneralRouting/> */}
//             {/* <div style={{   background: colorBgContainer }}></div> */}
//         </Content>

//       <FloatButton.BackTop />
//       <Footer
//         style={{
//           textAlign: "center",
//           // position: "fixed",
//           // left: 0,
//           // bottom: 0,
//           // width: "100%",
//           // background:'red'
//         }}
//       >
//         &#169; 2023 - Copyright Than Duy Hanh
//       </Footer></>)
// }
//   export default LayoutAdmin;
