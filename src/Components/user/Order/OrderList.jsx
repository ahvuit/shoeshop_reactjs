import { Button, Modal, Space, Tag, message as msg } from "antd";
import React, { useState } from "react";
// import { Table } from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";
import { InfoOutlined, CloseOutlined } from "@ant-design/icons";

import { cancelOrder } from "../../../actions/order";
import FormattedCurrency from "../../Common/FormattedCurrency";
import Table from "../../Common/Table";
import OrderDetailsModal from "./OrderModal";

function OrderList({ data }) {
  const [openModal, setOpenModal] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [statusId, setStatusId] = useState("");
  const data1 = data.map((item, index) => {
    return { ...item.orderModel, key: index };
  });
  const dispatch = useDispatch();
  const columns = [
    {
      title: "Tên",
      sorter: true,
      key: "firstName",
      render: (text, record) => `${record.lastName} ${record.firstName}`,
    },
    { title: "Địa chỉ", dataIndex: "address", key: "address" },
    { title: "Điện thoại", dataIndex: "phone", key: "phone" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Ghi chú", dataIndex: "note", key: "note", width: "15%" },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (text) => <FormattedCurrency amount={text} />,
    },
    {
      title: "Ngày đặt",
      dataIndex: "bookingDate",
      key: "bookingDate",
      render: (text) => moment(text).format("DD-MM-YYYY"),
    },
    {
      title: "Ngày giao",
      dataIndex: "deliveryDate",
      key: "deliveryDate",
      render: (text) => moment(text).format("DD-MM-YYYY"),
    },
    {
      title: "Hình thức thanh toán",
      dataIndex: "momo",
      key: "momo",
      render: (momo) => {
        const color = momo !== null ? "green" : "yellow";
        return <Tag color={color}>{momo !== null ? "BANK" : "COD"}</Tag>;
      },
    },
    {
      title: "Trang thái đơn hàng",
      dataIndex: "statusName",
      key: "statusName",
      sorter: (a, b) => a.statusName.length - b.statusName.length,
    },
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
              setOrderId(record.orderId);
              setStatusId(record.statusId);
            }}
          />
          {record.statusId === "6405f227abfbac7f699ebbbf" ||
          record.statusId === "6405f221abfbac7f699ebbbe" ? (
            ""
          ) : (
            <Button
              icon={<CloseOutlined />}
              type="primary"
              danger
              onClick={() => handelCancel(record)}
            ></Button>
          )}
        </Space>
      ),
    },
  ];

  const handelCancel = (record) => {
    Modal.confirm({
      title: "Bạn muốn hủy đơn hàng?",
      content: (
        <div>
          <p> Hành động này không thể được hoàn tác.</p>
          <p>
            Bạn có chắc chắn muốn hủy Mã số đơn hàng:{" "}
            <strong style={{ color: "green" }}>{record.orderId} </strong>?
          </p>
        </div>
      ),
      okText: "Yes",
      okType: "primary",
      cancelText: "Back",
      onOk() {
        dispatch(cancelOrder(record.orderId))
          .then(() => {
            msg.success("Đơn hàng đã được hủy");
          })
          .catch(() => {
            msg.error("Đã xảy ra lỗi, vui lòng thử lại sau");
          });
      },
    });
  };
  const pagination = { pageSize: 8 };
  return (
    <div>
      <Table
        style={{ marginTop: 20 }}
        data={data1}
        columns={columns}
        pagination={pagination}
        //loading={isloading}

        emptyText="Danh sách đơn hàng của bạn hiện đang trống"
        rowKey="key"
      />
      <OrderDetailsModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        orderId={orderId}
        statusId={statusId}
      />
    </div>
  );
}

export default React.memo(OrderList);
