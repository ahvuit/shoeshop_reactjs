import { Button, Image, Modal, Space, Tag, message as msg } from "antd";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { InfoOutlined, CloseOutlined,StarOutlined } from "@ant-design/icons";

import { cancelOrder } from "../../actions/order";
import { getAllProducts } from "../../actions/product";

function Order({ data }) {
  const [isloading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [statusId, setStatusId] = useState("");
  const data1 = data.map((item, index) => {
    return { ...item.orderModel, key: index };
  });
  console.log("data1: ", data1);
  const dispatch = useDispatch();
  const columns = [
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
      render: (text) => moment(text).format("DD-MM-YYYY"),
    },
    {
      title: "Delivery Date",
      dataIndex: "deliveryDate",
      key: "deliveryDate",
      render: (text) => moment(text).format("DD-MM-YYYY"),
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
    console.log("record: ", record.orderId);
    Modal.confirm({
      title: "Do you want cancel this order?",
      content: (
        <div>
          <p>This action cannot be undone.</p>
          <p>
            Are you sure you want to cancel Order number:{" "}
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
            msg.success("Order has been Cancel");
          })
          .catch(() => {
            msg.error("Order hasn't been cancel, try again!");
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
          emptyText: "Your order is empty",
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
  const { openModal, setOpenModal, orderId ,statusId} = props;
  const { orders } = useSelector((state) => state.order);
  const { products } = useSelector((state) => state.product);
  let data = orders.filter((order) => order?.orderModel.orderId === orderId);
  const dispatch = useDispatch();
  useEffect(()=>{
dispatch(getAllProducts()).then(()=>{}).catch(()=>{})
  },[dispatch])
  const orderDetails = data.map((item, index) => {
    return [...item.listOrderDetails];
  })[0];
  console.log('order: ',orderDetails);
  const orderDetailsWithKeys = orderDetails?.map((item, index) => {
    return {
      ...item,
      key: `orderDetail-${index}`,
    };
  });
  const columns = [
    {
      title: "Name",
      dataIndex: "productId",
      key: "productId",      
      render: (text, record) => {
        const selectedProduct = products?.find(p => p.productId === text);
        return selectedProduct ? selectedProduct.name : '';  
    },
    },
    {
      title: "Image",
      dataIndex: "productId",
      key: "productId",      
      render: (text, record) => {
        const selectedProduct = products?.find(p => p.productId === text);
        return selectedProduct ? <Image src={selectedProduct.image} width={60}/> : '';  
    },
  },
  { title: "Size", dataIndex: "size", key: "size" },
      { title: "Price", dataIndex: "price", key: "price", render: (text) => `$${text}`,},
  { title: "Quantity", dataIndex: "quantity", key: "quantity" },
  
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (text) => `$${text}`,
    },
    {
      title: "Action",
      key: "action",
      render: (text,record) => (
        <Space size="middle">
         
          {statusId !== "6405f221abfbac7f699ebbbe" ? (
            ""
          ) : (
            <Button
              //icon={<StarOutlined /> }
              type="primary"
              style={{ background:"yellow",color:'red' }}
              onClick={() => console.log('ssss: ',record)}
            >Rate</Button>
          )}
        </Space>
      ),
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
export default React.memo(Order);
