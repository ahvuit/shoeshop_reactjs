import React, { useEffect, useState } from "react";
import {
  message as msg,
  Table,
  Space,
  Modal,
  Image,
  Button,
  Tag,
  Rate,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  InfoOutlined,
  CloseOutlined,
  CheckOutlined,
  EditOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";

import { getAllProducts } from "../../actions/product";
import ProductModal from "./ProductModal";
import { getAllBrands } from "../../actions/brand";
import { getAllCategories } from "../../actions/category";
import { updateProduct } from "../../actions/product";
import SearchComponent from "./SearchComponent";
import FormattedCurrency from "../FormattedCurrency";

const { confirm } = Modal;

const Products = () => {
  const { products } = useSelector((state) => state.product);
  const { brand } = useSelector((state) => state.brand);
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState([]);
  const [action, setAction] = useState("");
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    dispatch(getAllProducts())
      .then(() => {})
      .catch(() => {
        msg.error("Get all product failed");
      });
    dispatch(getAllBrands())
      .then(() => {})
      .catch(() => {});
    dispatch(getAllCategories())
      .then(() => {})
      .catch(() => {});
  }, [dispatch]);

  const columnss = [
    {
      title: "Tên SP",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hãng",
      dataIndex: "brandId",
      key: "brandId",
      render: (text, record) => {
        const selectedBrand = brand.find((b) => b.brandId === text);
        return selectedBrand ? selectedBrand.brandName : record.brandId;
      },
    },
    {
      title: "Danh mục",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (text, record) => {
        const selectedCate = categories?.find((b) => b.categoryId === text);
        return selectedCate ? selectedCate.categoryName : record.brandId;
      },
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (text) => <FormattedCurrency amount={text} />,
    },
    {
      title: "Đánh giá",
      dataIndex: "rate",
      key: "rate",
      render: (text) => (
        <Rate disabled value={text} style={{ fontSize: 13 }} count={5} />
      ),
    },
    {
      title: "Sản phẩm mới?",
      dataIndex: "productNew",
      key: "productNew",
      render: (momo) => {
        const color = momo ? "green" : "yellow";
        return <Tag color={color}>{momo ? "NEW" : "OLD"}</Tag>;
      },
    },
    {
      title: "Đã bán",
      dataIndex: "purchase",
      key: "purchase",
    },
    {
      title: "Tồn kho",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (text) => <Image height={60} src={text} alt="Product" />,
    },
    {
      title: "Tình trạng sản phẩm",
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
            style={{ background: record.active ? "red" : "green" }}
            icon={record.active ? <CloseOutlined /> : <CheckOutlined />}
            onClick={() => {
              handleActive(record);
            }}
          />
        </Space>
      ),
    },
  ];
  const handleActive = (u) => {
    const { sales, sizeTable, brandName, categoryName, ...rest } = u;
    const b = { ...rest, active: !u.active };
    const content = b?.active
      ? "Do you want Active this shoes?"
      : "Do you want Inactive this shoes?";
    confirm({
      title: "Are you sure?",
      icon: <ExclamationCircleFilled />,
      content: content,
      onOk() {
        dispatch(updateProduct(b.productId, b))
          .then(() => {
            msg.success("Update product successful.");
          })
          .catch(() => {
            msg.error("Update product failed");
          });
      },
      onCancel() {},
    });
  };

  const pagination = { pageSize: 5 };
  useEffect(() => {}, [filteredData]);
  const options = {
    name: "Tên sản phẩm",
    productId: "Mã sản phẩm",
    brandName: "Tên hãng",
    categoryName: "Tên danh mục",
  };
  return (
    <>
      <Space>
        <Button
          style={{ background: "var(--primary-color)", margin: 10 }}
          onClick={() => {
            setOpen(true);
            setProduct([]);
            setAction("add");
          }}
        >
          Thêm sản phẩm mới
        </Button>
        <SearchComponent
          data={products ? products : []}
          options={options}
          setFilteredData={setFilteredData}
        />
      </Space>
      <div style={{ overflowX: "auto" }}>
        {" "}
        <Table
          columns={columnss}
          dataSource={filteredData || products}
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
