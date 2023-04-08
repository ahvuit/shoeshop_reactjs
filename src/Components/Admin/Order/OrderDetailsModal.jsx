import React, { useEffect } from "react";
import { Table, Modal, Image } from "antd";
import { useDispatch, useSelector } from "react-redux";

import FormattedCurrency from "../../Common/FormattedCurrency";
import { getAllProducts } from "../../../actions/product";

const OrderModal = (props) => {
  const { openModal, setOpenModal, orderId } = props;
  console.log('id: ',orderId);
  const { orders1 } = useSelector((state) => state.order);
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
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
  useEffect(() => {
    dispatch(getAllProducts())
      .then(() => {})
      .catch(() => {});
  }, [dispatch]);
  const columns = [
    {
      title: "Mã sản phẩm",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "Tên Sản phẩm",
      dataIndex: "productId",
      key: "productId",
      render: (text, record) => {
        const selectedProduct = products?.find((p) => p.productId === text);
        return selectedProduct ? selectedProduct.name : "";
      },
    },
    {
      title: "Hình ảnh",
      dataIndex: "productId",
      key: "productId",
      render: (text, record) => {
        const selectedProduct = products?.find((p) => p.productId === text);
        return selectedProduct ? (
          <Image src={selectedProduct.image} width={60} />
        ) : (
          ""
        );
      },
    },
    { title: "Số lượng", dataIndex: "quantity", key: "quantity" },
    { title: "Size", dataIndex: "size", key: "size" },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (text) => <FormattedCurrency amount={text} />,
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (text) => <FormattedCurrency amount={text} />,
    },
  ];
  return (
    <Modal
      title={`Chi tiết đơn hàng "${orderId}"`}
      style={{
        top: 20,
      }}
      open={openModal}
      footer={null}
      onOk={() => setOpenModal(false)}
      onCancel={() => setOpenModal(false)}
      width={1000}
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
