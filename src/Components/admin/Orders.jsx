import React, { useEffect, useState } from "react";
import { message as msg, Table, Space, Button, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { InfoOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getAllOrders } from "../../actions/order";
import moment from "moment";
import OrderModal from "./OrderModal";
const columns = [
  {
    title: "Order ID",
    dataIndex: "orderId",
    key: "orderId",
    width: "5vw",
  },
  {
    title: "First Name",
    sorter: true,
    key: "firstName",
    render: (text, record) => `${record.lastName} ${record.firstName}`,
  },
  { title: "Address", dataIndex: "address", key: "address" },
  { title: "Phone", dataIndex: "phone", key: "phone" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Note", dataIndex: "note", key: "note", width: "15%" },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
    render: (text) => `$ ${text}`,
  },
  {
    title: "Booking Date",
    dataIndex: "bookingDate",
    key: "bookingDate",
    render: (text) => moment(text).format("DD/MM/YYYY"),
  },
  {
    title: "Delivery Date",
    dataIndex: "deliveryDate",
    key: "deliveryDate",
    render: (text) => moment(text).format("DD/MM/YYYY"),
  },
  {
    title: "Payment",
    dataIndex: "momo",
    key: "momo",
    render: (momo) => {
      const color = momo !== null ? "green" : "yellow";
      return <Tag color={color}>{momo !== null ? "BANK" : "COD"}</Tag>;
    },
  },
  {
    title: "Status",
    dataIndex: "statusName",
    key: "statusName",
    sorter: (a, b) => a.statusName.length - b.statusName.length,
  },
];

const Orders = () => {
  const { orders1 } = useSelector((state) => state.order);
  const [openModal, setOpenModal] = useState(false);
  const [orderId, setOrderId] = useState("");

  const data = orders1.map((item, index) => {
    return { ...item.orderModel, key: index };
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrders())
      .then(() => {})
      .catch(() => {
        msg.error("Get all order failed");
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
              setOrderId(record.orderId);
            }}
          />
          <Button
            onClick={() => {
              // setOpen(true);
              // setProduct(record);
              // setAction('edit')
              //   setOrderId(record.orderId);
            }}
            icon={<EditOutlined />}
            style={{ background: "#ffc107" }}
          />

          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            //   onClick={() => {
            //     setOpenModal(true);
            //     setOrderId(record.orderId);
            //   }}
          />
        </Space>
      ),
    },
  ];

  const pagination = { pageSize: 5 };

  return (
    <>
      <div style={{ overflowX: "auto" }}>
        {" "}
        <Table
          columns={columnss}
          dataSource={data ? data : []}
          pagination={pagination}
          scroll={{
            y: "60vh",
          }}
          locale={{
            emptyText: "Your orders is empty",
          }}
          rowKey="orderId"
        />
      </div>
      <OrderModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        orderId={orderId}
      />
    </>
  );
};
export default Orders;
