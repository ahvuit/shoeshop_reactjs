import React from "react";
import { Table, Modal } from "antd";
import { useSelector } from "react-redux";
const OrderModal = (props) => {
  const { openModal, setOpenModal, orderId } = props;
  const { orders1 } = useSelector((state) => state.order);
  let data = orders1.filter((order) => order?.orderModel.orderId === orderId);
  const orderDetails = data.map((item, index) => {
    return [...item.listOrderDetails];
  })[0];
  const orderDetailsWithKeys = orderDetails?.map((item, index) => {
    return {
      ...item,
      key: `orderDetail-${index}`,
    };
  });
  const columns = [
    {
      title: "Product Id",
      dataIndex: "productId",
      key: "productId",
    },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Size", dataIndex: "size", key: "size" },
    { title: "Price", dataIndex: "price", key: "price" },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (text) => `$${text}`,
    },
  ];
  return (
    <Modal
      title="20px to Top"
      style={{
        top: 20,
      }}
      open={openModal}
      onOk={() => setOpenModal(false)}
      onCancel={() => setOpenModal(false)}
    >
      <Table
        style={{ marginTop: 20 }}
        dataSource={orderDetailsWithKeys}
        columns={columns}
        rowKey="key"
      />
    </Modal>
  );
};
export default OrderModal;
