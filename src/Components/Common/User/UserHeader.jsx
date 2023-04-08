import { Layout } from "antd";
import MenuHeader from "./MenuHeader";
import AppCart from "../../User/AppCart";

const { Header } = Layout;

const UserHeader = () => {
  return (
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
  );
};
export default UserHeader;
