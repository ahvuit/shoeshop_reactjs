import React, { useEffect, useState } from "react";
import { message as msg, Table, Space, Button ,Image, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { InfoOutlined, EditOutlined } from "@ant-design/icons";
import { getAllUsers } from "../../actions/user";
// import BrandModal from "./BrandModal";
const columns = [
  {
    title: "Customer ID",
    dataIndex: "userId",
    key: "userId",
  },
  {
    title: "email",
    dataIndex: "email",
    key: "email",
    sorter: (a, b) => a.email.length - b.email.length,
  },
  {
    title: "Role",
    dataIndex: "utype",
    key: "utype",
    render: (utype) => {
      const color = utype  ? "blue" : "red";
      return <Tag color={color}>{utype==="ADM"? "Admin" : "Staff"}</Tag>;
    },
  },
  {
    title: "Active?",
    dataIndex: "active",
    key: "active",
    render: (active) => {
      const color = active  ? "green" : "red";
      return <Tag color={color}>{active? "Active" : "Inactive"}</Tag>;
    },
  },
  
];

const Customers = () => {
  const { users } = useSelector((state) => state.user);
  const userss= users?.filter((user)=>user.utype!=='USR');
  console.log('lUser: ',userss);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  const [action, setAction] = useState("");
  useEffect(() => {
    dispatch(getAllUsers())
      .then(() => {})
      .catch(() => {
        msg.error("Get all customer failed");
      });
  }, [dispatch]);

  const columnss = [
    ...columns,
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            style={{ background: "var(--primary-color)" }}
            type="primary"
            icon={<InfoOutlined />}
            onClick={() => {
              setOpenModal(true);
              setUser(record);
              setAction("see");
            }}
          />
          <Button
            onClick={() => {
              setOpenModal(true);
              setUser(record);
              setAction("edit");
            }}
            icon={<EditOutlined />}
            style={{ background: "#ffc107" }} 
          />
        </Space>
      ),
    },
  ];

  const pagination = { pageSize: 5 };

  return (
    <>
      <Button
        style={{ background: "var(--primary-color)", margin: 10 }}
        onClick={() => {
          setOpenModal(true);
          setUser([]);
          setAction("add");
          
        }}
      >
        Add
      </Button>
      <div style={{ overflowX: "auto" }}>
        {" "}
        <Table
          columns={columnss}
          dataSource={userss ? userss  : []}
          pagination={pagination}
          scroll={{
            y: "60vh",
          }}
          locale={{
            emptyText: "Your brands is empty",
          }}
          rowKey="userId"
        />
      </div>
      {/* <BrandModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        brands={brands}
        setBrands={setBrands}
        action={action}
      /> */}
    </>
  );
};
export default Customers;