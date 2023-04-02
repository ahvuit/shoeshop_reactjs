import React, { useEffect, useState } from "react";
import { message as msg, Table, Space, Button, Select, Modal , Image, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { InfoOutlined,CloseOutlined , ExclamationCircleFilled ,DeleteOutlined} from "@ant-design/icons"; 
import { getAllSaleDetails,deleteSaleDetails } from "../../actions/saleDetails";
import { getAllSales } from "../../actions/sale"; 
import { getAllProducts } from "../../actions/product";

import moment from "moment";
import SaleDetailsModal from "./SaleDetailsModal";
const {confirm}=Modal;
const columns = [
  {
    title: "Sale ID",
    dataIndex: "salesId",
    key: "salesID",
  },
 ];

const SaleDetails = () => {
  const { saleDetails } = useSelector((state) => state.saleDetails);
  const { sale } = useSelector((state) => state.sale);
  const { products } = useSelector((state) => state.product);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const [sales, setSales] = useState(null);
  const [action, setAction] = useState("");
  useEffect(() => {
    dispatch(getAllSales())
      .then(() => {})
      .catch(() => {});
    dispatch(getAllProducts())
      .then(() => {})
      .catch(() => {});
  }, [dispatch]);
 const  handleDelete = (id)=>{
  console.log('id: ',id);
  confirm({
    title: "Are you sure?",
    icon: <ExclamationCircleFilled />,
    content: `Do you want delete this product?`,
    onOk() {
      dispatch(deleteSaleDetails(id))
      .then(() => {msg.success('Delete this product successful')})
      .catch(() => {});
    },
    onCancel() {
    },
  });
  
 }
  console.log("saleDetails: ", saleDetails);
  const columnss = [
    ...columns,
    {
      title: "Product Name",
      dataIndex: "productId",
      key: "productId",
      render: (text, record) => {
        const selectedProduct = products?.find(b => b.productId === text);
        console.log('record: ',selectedProduct);
        return selectedProduct ? selectedProduct.name: record.productId;
      } 
    },
    {
      title: "Image",
      dataIndex: "productId",
      key: "productId",
      render: (text, record) => {
        const selectedProduct = products?.find(b => b.productId === text);
        console.log('record: ',selectedProduct);
        return selectedProduct ?<Image src={selectedProduct.image} width={60}/>: record.productId;
      } 
    },
    {
      title: "Price",
      dataIndex: "productId",
      key: "productId",
      render: (text, record) => {
        const selectedProduct = products?.find(b => b.productId === text);
        console.log('record: ',selectedProduct);
        return selectedProduct ?<Typography.Text delete>${selectedProduct.price}</Typography.Text>: '';
      } 
    },
    {
      title: "Sale Price",
      dataIndex: "salesPrice",
      key: "salesPrice",
      render: (text, record) => {
      
        return <Typography.Text type="danger">${text}</Typography.Text>;
      } 
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
        
        
          <Button
            onClick={() => {
             handleDelete(record.productId)
            }}
            icon={<DeleteOutlined/>}
            style={{ background: "red" }}
          />
        </Space>
      ),
    },
  ];

  const pagination = { pageSize: 5 };
  const handleChange =(v)=>{
    console.log('v: ',v);
    //setSales(v); 
    dispatch(getAllSaleDetails(v))
      .then(() => {})
      .catch(() => {
      });
  }
  const options = [
    {
      label: "Chua Sale",
      options: sale
        ?  sale.filter((ss) => {
            const date1 = moment(ss.startDay).format("YYYY-MM-DD")
          const current = moment()
         const h= current.diff(date1, "hours", true)
         return h<0
            
          }).map((sale) => ({ label: sale.salesName, value: sale.salesId }))
        : [],
    },
    {
      label: "Dang Sale",
      options: sale
        ? sale.filter((ss) => {
            const date1 = moment(ss.endDay).format("YYYY-MM-DD")
            const date2 = moment(ss.startDay).format("YYYY-MM-DD")
          const current = moment()
         const h= current.diff(date1, "hours", true)
         const h2= current.diff(date2, "hours", true)
         return h<=0 && h2>=0
            
          }).map((sale) => ({ label: sale.salesName, value: sale.salesId }))
        : [],
    },
    {
      label: "Dang Sale",
      options: sale
        ?sale.filter((ss) => {
            const date1 = moment(ss.endDay).format("YYYY-MM-DD")
          const current = moment()
         const h= current.diff(date1, "hours", true)
         return h>  0
            
          }).map((sale) => ({ label: sale.salesName, value: sale.salesId }))
        : [],
    },
  ];
  return (
    <>
      <Space>
        <Button
          style={{ background: "var(--primary-color)", margin: 10 }}
          onClick={() => {
            setOpenModal(true);
           // setCategory([]);
            setAction("add");
          }}
        >
          Add
        </Button>
        <Select
          placeholder="Choose sale"
          style={{
            width: 200,
          }}
        onChange={handleChange}
          options={options}
        />
        
      </Space>
      <div style={{ overflowX: "auto" }}>
        {" "}
        <Table
          columns={columnss}
          dataSource={saleDetails ? saleDetails : []}
          pagination={pagination}
          scroll={{
            y: "60vh",
          }}
          locale={{
            emptyText: "Your categories is empty",
          }}
          rowKey="id"
        />
      </div>
      <SaleDetailsModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        //sd={category}
        //setCategory={setCategory}
       sd= {saleDetails}
        action={action}
      />
    </>
  );
};
export default SaleDetails;
