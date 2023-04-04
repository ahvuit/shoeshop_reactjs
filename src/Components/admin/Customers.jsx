import React, { useEffect, useState } from "react";
import { message as msg, Table, Space, Button, Modal, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { InfoOutlined, ExclamationCircleFilled } from "@ant-design/icons";

import { getAllUsers, updateUser } from "../../actions/user";
import UserModal from "./UserModal";
import SearchComponent from "./SearchComponent";

const { confirm } = Modal;
const columns = [
  {
    title: "Mã khách hàng",
    dataIndex: "userId",
    key: "userId",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    sorter: (a, b) => a.email.length - b.email.length,
  },
  {
    title: "Hoạt động?",
    dataIndex: "active",
    key: "active",
    render: (active) => {
      const color = active ? "green" : "red";
      return <Tag color={color}>{active ? "Mở" : "Khóa"}</Tag>;
    },
  },
];

const Customers = () => {
  const { users } = useSelector((state) => state.user);
  const { user: userCurrent } = useSelector((state) => state.auth);
  const userss = users?.filter((user) => user.utype === "USR");
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  const [action1, setAction1] = useState("");
  const [filteredData, setFilteredData] = useState(null);
  const options = { userId: "Mã khách hàng", email: "Email" };
  useEffect(() => {
    dispatch(getAllUsers())
      .then(() => {})
      .catch(() => {});
  }, [dispatch]);

  const handleActive = (u, action) => {
    let uActive = null;
    if (action === "active") {
      uActive = { ...u, active: !u.active };
    } else {
      uActive = { ...u, password: "000000" };
    }

    const content =
      action === "active"
        ? uActive?.active
          ? 'Bạn có muốn "kích hoạt" tài khoản này?'
          : 'Bạn có muốn "khóa" tài khoản này?'
        : 'Bạn có muốn "Đặt lại mật khẩu" tài khoản này không?';
    confirm({
      title: "Xác nhận?",
      icon: <ExclamationCircleFilled />,
      content: content,
      onOk() {
        dispatch(updateUser(uActive.userId, { ...uActive }))
          .then(() => {
            msg.success("Cập nhật khách hàng thành công.");
          })
          .catch(() => {
            msg.error("Cập nhật khách hàng không thành công.");
          });
      },
      onCancel() {},
    });
  };
  const columnss = [
    ...columns,
    {
      title: "Thao tác",
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
              setAction1("see");
            }}
          />
          <Button
            onClick={() => {
              const action = "reset";
              handleActive(record, action);
            }}
            type="primary"
            style={{ background: "#ffc107" }}
          >
            Reset Pass
          </Button>
          {record.email !== userCurrent.email ? (
            <Button
              //disabled={record.email !== userCurrent.email }
              onClick={() => {
                const action = "active";
                handleActive(record, action);
              }}
              type="primary"
              style={{ background: record.active ? "#f00" : "#0f0" }}
            >
              {record?.active ? "Block  " : "UnBlock"}
            </Button>
          ) : (
            ""
          )}
        </Space>
      ),
    },
  ];

  const pagination = { pageSize: 5 };

  return (
    <>
      <SearchComponent
        data={userss ? userss : []}
        options={options}
        setFilteredData={setFilteredData}
      />

      <div style={{ overflowX: "auto" }}>
        {" "}
        <Table
          columns={columnss}
          dataSource={filteredData || userss}
          pagination={pagination}
          scroll={{
            y: "60vh",
          }}
          locale={{
            emptyText: "Danh sách khách hàng trống",
          }}
          rowKey="userId"
        />
      </div>
      <UserModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        user={user}
        //setBrands={setBrands}
        action1={action1}
      />
    </>
  );
};
export default Customers;
