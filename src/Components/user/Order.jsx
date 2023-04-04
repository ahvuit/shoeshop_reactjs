import { Button, Image, Modal, Space, Tag, message as msg } from "antd";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { InfoOutlined, CloseOutlined } from "@ant-design/icons";

import { cancelOrder } from "../../actions/order";
import { getAllProducts } from "../../actions/product";
import FormattedCurrency from "../FormattedCurrency";

function Order({ data }) {
  const [isloading] = useState(false);
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
        dataSource={data1}
        columns={columns}
        pagination={pagination}
        loading={isloading}
        locale={{
          emptyText: "Danh sách đơn hàng của bạn hiện đang trống",
        }}
        rowKey="key"
      />
      <ModalOrderDetails
        openModal={openModal}
        setOpenModal={setOpenModal}
        orderId={orderId}
        statusId={statusId}
      />
    </div>
  );
}
const ModalOrderDetails = (props) => {
  const { openModal, setOpenModal, orderId, statusId } = props;
  const { orders } = useSelector((state) => state.order);
  const { products } = useSelector((state) => state.product);
  let data = orders.filter((order) => order?.orderModel.orderId === orderId);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts())
      .then(() => {})
      .catch(() => {});
  }, [dispatch]);
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
    { title: "Size", dataIndex: "size", key: "size" },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => <FormattedCurrency amount={text} />,
    },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },

    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (text) => <FormattedCurrency amount={text} />,
    },
    {
      title: "Thao tác",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {statusId !== "6405f221abfbac7f699ebbbe" ? (
            ""
          ) : (
            <Button
              //icon={<StarOutlined /> }
              type="primary"
              style={{ background: "yellow", color: "red" }}
            >
              Rate
            </Button>
          )}
        </Space>
      ),
    },
  ];
  return (
    <Modal
      title="Chi tiết đơn hàng"
      style={{
        top: 20,
      }}
      open={openModal}
      onOk={() => setOpenModal(false)}
      onCancel={() => setOpenModal(false)}
      width={1000}
      footer={null}
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
export default React.memo(Order);
