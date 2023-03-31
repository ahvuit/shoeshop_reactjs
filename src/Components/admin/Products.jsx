import React, { useEffect, useState } from "react";
import { message as msg, Table, Space,Modal, Image, Button, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  InfoOutlined,
  CloseOutlined,
  CheckOutlined,
  EditOutlined,
  DeleteOutlined,ExclamationCircleFilled
} from "@ant-design/icons";
import { getAllProducts } from "../../actions/product";
import ProductModal from "./ProductModal";
import { getAllBrands } from "../../actions/brand";
import { getAllCategories } from "../../actions/category";
import { updateProduct } from "../../actions/product";
const {confirm} = Modal;
const columns = [
  
];

const Products = () => {
  const { products } = useSelector((state) => state.product);
  const { brand } = useSelector((state) => state.brand);
  const { categories } = useSelector((state) => state.category); 
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
    dispatch(getAllBrands())
      .then(() => {})
      .catch(() => {
            });
    dispatch(getAllCategories())
      .then(() => {})
      .catch(() => {
            });
  }, [dispatch]);

  const columnss = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
  
    {
      title: "Brand",
      dataIndex: "brandId",
      key: "brandId",
      render: (text, record) => {
        const selectedBrand = brand.find(b => b.brandId === text);
        return selectedBrand ? selectedBrand.brandName : record.brandId;
      } 
      
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (text, record) => {
        const selectedCate = categories?.find(b => b.categoryId === text);
        return selectedCate ? selectedCate.categoryName: record.brandId;
      } 
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
           style={{ background: record.active?'red':'green' }}
            icon={record.active? <CloseOutlined />:<CheckOutlined/>}
              onClick={() => {
                handleActive(record)
              }}
          />
        </Space>
      ),
    },
  ];
  const handleActive = (u) => {
    const {sales,sizeTable,brandName,categoryName,...rest}=u
    const b={ ...rest,active: !u.active }
    
    console.log('uuuuL: ',b);
    // const {active,...rest}=u
    // let uActive = null;
    // if (action === "active") {
    //   uActive = { ...u, active: !u.active };
    // } else if(action==='reset') {
    //   uActive = { ...u, password: "000000" };
    // }else if(action==='change'){
    //   //console.log('change: ',action);
    //   uActive={...u, utype: u.utype==='ADM'?'STF':'ADM' }
    //   console.log('u: ',uActive);
    // }

    const content =
   b?.active
          ? "Do you want Active this shoes?"
          : "Do you want Inactive this shoes?"
          confirm({
      title: "Are you sure?",
      icon: <ExclamationCircleFilled />,
      content: content,
      onOk() {
        dispatch(updateProduct(b.productId, b ))
          .then(() => {
            msg.success("Update product successful.");
          })
          .catch(() => {
            msg.error("Update product failed");
          });
      },
      onCancel() {
      },
    });
  };

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
