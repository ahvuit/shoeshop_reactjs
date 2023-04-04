import React, { useEffect, useState } from "react";
import { message as msg, Table, Space, Button, Modal, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  InfoOutlined,
  ExclamationCircleFilled,
  RetweetOutlined,
} from "@ant-design/icons";

import { getAllUsers, updateUser } from "../../actions/user";
import AccountModal from "./AccountModal";
import UserModal from "./UserModal";
import SearchComponent from "./SearchComponent";

const { confirm } = Modal;

const columns = [
  {
    title: "Mã nhân viên",
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
    title: "Loại tài khoản",
    dataIndex: "utype",
    key: "utype",
    render: (utype) => {
      const color = utype === "ADM" ? "blue" : "red";
      return <Tag color={color}>{utype === "ADM" ? "Admin" : "Staff"}</Tag>;
    },
  },
  {
    title: "Trạng thái?",
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
  const userss = users?.filter((user) => user.utype !== "USR");
  const [openModal, setOpenModal] = useState(false);
  const [openModal1, setOpenModal1] = useState(false);
  const { user: userCurrent } = useSelector((state) => state.auth);
  const [user, setUser] = useState([]);
  const [action1, setAction1] = useState("");
  const [filteredData, setFilteredData] = useState(null);
  const dispatch = useDispatch();
  const options = { userId: "Mã nhân viên", email: "Email" };

  useEffect(() => {
    dispatch(getAllUsers())
      .then(() => {})
      .catch(() => {
        msg.error("Get all customer failed");
      });
  }, [dispatch]);
  const handleActive = (u, action) => {
    let uActive = null;
    if (action === "active") {
      uActive = { ...u, active: !u.active };
    } else if (action === "reset") {
      uActive = { ...u, password: "000000" };
    } else if (action === "change") {
      uActive = { ...u, utype: u.utype === "ADM" ? "STF" : "ADM" };
    }
    const content =
      action === "active"
        ? uActive?.active
          ? "Bạn có muốn Bỏ chặn tài khoản này không?"
          : "Bạn có muốn Chặn tài khoản này không?"
        : action === "reset"
        ? "Bạn có muốn Đặt lại mật khẩu tài khoản này?"
        : "Bạn có muốn thay đổi phân quyền cho tài khoản này?";
    confirm({
      title: "Xác nhận?",
      icon: <ExclamationCircleFilled />,
      content: content,
      onOk() {
        dispatch(updateUser(uActive.userId, { ...uActive }))
          .then(() => {
            msg.success("Cập nhật nhân viên thành công");
          })
          .catch(() => {
            msg.error("Cập nhật nhân viên không thành công");
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
          {record.email !== userCurrent.email ? (
            <Button
              style={{ background: "green" }}
              type="primary"
              icon={<RetweetOutlined />}
              onClick={() => {
                const action = "change";
                handleActive(record, action);
              }}
            />
          ) : (
            ""
          )}
          <Button
            onClick={() => {
              const action = "reset";
              handleActive(record, action);
            }}
            type="primary"
            style={{ background: "#ffc107" }}
          >
            Đặt lại mật khẩu
          </Button>
          {record.email !== userCurrent.email ? (
            <Button
              onClick={() => {
                const action = "active";
                handleActive(record, action);
              }}
              type="primary"
              style={{ background: record.active ? "#f00" : "#0f0" }}
            >
              {record?.active ? "Khóa  " : "Mở khóa"}
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
      <Space>
        <Button
          style={{ background: "var(--primary-color)", margin: 10 }}
          type="primary"
          onClick={() => {
            setOpenModal1(true);
          }}
        >
          Thêm mới nhân viên
        </Button>
        <SearchComponent
          data={userss ? userss : []}
          options={options}
          setFilteredData={setFilteredData}
        />
      </Space>
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
            emptyText: "Danh sách nhân viên trống",
          }}
          rowKey="userId"
        />
      </div>
      <UserModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        user={user}
        action1={action1}
      />
      <AccountModal openModal1={openModal1} setOpenModal1={setOpenModal1} />
    </>
  );
};
export default Customers;
