import React, { useEffect, useState } from "react";
import { message as msg, Table, Space, Image, Button, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  InfoOutlined,
  CloseOutlined,
  CheckOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { getAllProducts } from "../../actions/product";
import ProductModal from "./ProductModal";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },

  {
    title: "Brand",
    dataIndex: "brandName",
    key: "brandName",
  },
  {
    title: "Category",
    dataIndex: "categoryName",
    key: "categoryName",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (text) => `$${text}`,
  },
  {
    title: "Rate",
    dataIndex: "rate",
    key: "rate",
  },
  {
    title: "Product New",
    dataIndex: "productNew",
    key: "productNew",
    render: (momo) => {
      const color = momo ? "green" : "yellow";
      return <Tag color={color}>{momo ? "NEW" : "OLD"}</Tag>;
    },
  },
  {
    title: "Purchase",
    dataIndex: "purchase",
    key: "purchase",
  },
  {
    title: "Stock",
    dataIndex: "stock",
    key: "stock",
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (text) => <Image height={60} src={text} alt="Product" />,
  },
  {
    title: "Active",
    dataIndex: "active",
    key: "active",
    render: (active) => {
      return active ? (
        <CheckOutlined style={{ color: "green" }} />
      ) : (
        <CloseOutlined style={{ color: "red" }} />
      );
    },
  },
];

const Products = () => {
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState([]);
  const [action, setAction] = useState("");
  useEffect(() => {
    dispatch(getAllProducts())
      .then(() => {})
      .catch(() => {
        msg.error("Get all product failed");
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
              setOpen(true);
              setProduct(record);
              setAction("see");
            }}
          />
          <Button
            onClick={() => {
              setOpen(true);
              setProduct(record);
              setAction("edit");
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
      <Button
        style={{ background: "var(--primary-color)", margin: 10 }}
        onClick={() => {
          setOpen(true);
          setProduct([]);
          setAction("add");
        }}
      >
        Add
      </Button>
      <div style={{ overflowX: "auto" }}>
        {" "}
        <Table
          columns={columnss}
          dataSource={products ? products : []}
          pagination={pagination}
          scroll={{
            y: "60vh",
          }}
          locale={{
            emptyText: "Your product is empty",
          }}
          rowKey="productId"
        />
      </div>
      <ProductModal
        open={open}
        setOpen={setOpen}
        product={product}
        setProduct={setProduct}
        action={action}
      />
    </>
  );
};

export default Products;
