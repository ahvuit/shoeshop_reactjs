import React, { useEffect, useState } from "react";
import { Table, Space, Button, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { InfoOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";

import { getAllOrders } from "../../actions/order";
import OrderDetailsModal from "./OrderDetailsModal";
import OrderModal from "./OrderModal";
import SearchComponent from "./SearchComponent";
import FormattedCurrency from "../FormattedCurrency";

const columns = [
  {
    title: "Mã đơn hàng",
    dataIndex: "orderId",
    key: "orderId",
    width: "5vw",
  },
  {
    title: "Tên KH",
    sorter: true,
    key: "firstName",
    render: (text, record) => `${record.lastName} ${record.firstName}`,
  },
  { title: "Địa chỉ", dataIndex: "address", key: "address" },
  { title: "SĐT", dataIndex: "phone", key: "phone" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Ghi chú", dataIndex: "note", key: "note", width: "7vw" },
  {
    title: "Tổng tiền",
    dataIndex: "total",
    key: "total",
    render: (text) => <FormattedCurrency amount={text} />,
  },
  {
    title: "Ngày đặt hàng",
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
    title: "Tình trạng đơn hàng",
    dataIndex: "statusName",
    key: "statusName",
    sorter: (a, b) => a.statusName.length - b.statusName.length,
  },
];

const Orders = () => {
  const { orders1 } = useSelector((state) => state.order);
  const [openModal, setOpenModal] = useState(false);
  const [openModal1, setOpenModal1] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState("");
  const [filteredData, setFilteredData] = useState(null);

  const options = {
    orderId: "Mã đơn hàng",
    firstName: "Tên khách hàng",
    address: "Địa chỉ",
    phone: "Số điện thoại",
    email: "Email",
  };

  const data = orders1.map((item, index) => {
    return { ...item.orderModel, key: index };
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrders())
      .then(() => {})
      .catch(() => {});
  }, [dispatch]);

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
              setOrderId(record.orderId);
            }}
          />
          {record.statusId === "6405f221abfbac7f699ebbbe" ||
          record.statusId === "6405f227abfbac7f699ebbbf" ? (
            ""
          ) : (
            <Button
              onClick={() => {
                setOpenModal1(true);
                setOrder(record);
              }}
              icon={<EditOutlined />}
              style={{ background: "#ffc107" }}
            />
          )}        
        </Space>
      ),
    },
  ];

  const pagination = { pageSize: 5 };

  return (
    <>
      <SearchComponent
        data={data ? data : []}
        options={options}
        setFilteredData={setFilteredData}
      />

      <div style={{ overflowX: "auto" }}>
        {" "}
        <Table
          columns={columnss}
          dataSource={filteredData || data}
          pagination={pagination}
          scroll={{
            y: "60vh",
          }}
          locale={{
            emptyText: "Danh sách đơn hàng trống",
          }}
          rowKey="orderId"
        />
      </div>
      <OrderDetailsModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        orderId={orderId}
      />
      <OrderModal
        openModal={openModal1}
        setOpenModal={setOpenModal1}
        order={order}
      />
    </>
  );
};
export default Orders;
