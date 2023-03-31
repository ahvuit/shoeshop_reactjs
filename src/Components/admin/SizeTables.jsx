import React, { useEffect, useState } from "react";
import { message as msg, Table, Space, Image, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { InfoOutlined, EditOutlined } from "@ant-design/icons";
import { getAllSizeTables  } from "../../actions/sizetable";
import SizeTableModal from "./SizeTableModal";
const columns = [
  {
    title: "Product Name",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (text) => <Image height={60} src={text} alt="Product" />,
  },
  {
    title: "S38",
    dataIndex: "s38",
    key: "s38",
  },
  {
    title: "S39",
    dataIndex: "s39",
    key: "s39",
  },
  {
    title: "S40",
    dataIndex: "s40",
    key: "s40",
  },
  {
    title: "S41",
    dataIndex: "s41",
    key: "s41",
  },
  {
    title: "S42",
    dataIndex: "s42",
    key: "s42",
  },
  {
    title: "S43",
    dataIndex: "s43",
    key: "s43",
  },
  {
    title: "S44",
    dataIndex: "s44",
    key: "s44",
  },
  {
    title: "S45",
    dataIndex: "s45",
    key: "s45",
  },
  {
    title: "S46",
    dataIndex: "s46",
    key: "s46",
  },
  {
    title: "S47",
    dataIndex: "s47",
    key: "s47",
  },
  {
    title: "S48",
    dataIndex: "s48",
    key: "s48",
  },
  
];

const SizeTables = () => {
  const { sizeTables } = useSelector((state) => state.sizeTable);
  
  //const { sizeTables } = useSelector((state) => state.sizeTable);
//   const newProducts = products?.map((p, i) => {
//     const {name,image,sizeTable,...r}= p

//     return {name,image,...sizeTable};
// })'
// console.log('product11: ',newProducts);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const [sizeTable, setSizeTable] = useState([]);
  const [action, setAction] = useState("");
  useEffect(() => {
    dispatch(getAllSizeTables())
      .then(() => {})
      .catch(() => {
        msg.error("Get all sizeTable failed");
      });
  }, [dispatch]);
//   useEffect(() => {
//     // const product2 = [...products, products.name]
//     const newProducts = products?.map((p, i) => {
//         const {name,image,sizeTable,...r}= p

//         return {name,image,...sizeTable};
//     });
//     //const {name,...rest}= products
//     console.log("products: ", newProducts);
//   }, products);
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
              setSizeTable(record);
              setAction("see");
            }}
          />
          <Button
            onClick={() => {
              setOpenModal(true);
              setSizeTable(record);
              setAction("edit");
            }}
            icon={<EditOutlined />}
            style={{ background: "#ffc107" }}
          />
        </Space>
      ),
    },
  ];

  const pagination = { pageSize: 5 };

  return (
    <>
      {/* <Button
        style={{ background: "var(--primary-color)", margin: 10 }}
        onClick={() => {
          setOpenModal(true);
          setCategory([]);
          setAction("add");
        }}
      >
        Add
      </Button> */}
      <div style={{ overflowX: "auto" }}>
        {" "}
        <Table
          columns={columnss}
          dataSource={sizeTables ? sizeTables : []}
          pagination={pagination}
          scroll={{
            y: "60vh",
          }}
          locale={{
            emptyText: "Your categories is empty",
          }}
          rowKey="productId"
        />
      </div>
      <SizeTableModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        sizeTable={sizeTable}
        setSizeTable={setSizeTable}
        action={action}
        />
    </>
  );
};
export default SizeTables;
