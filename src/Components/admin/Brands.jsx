import React, { useEffect, useState } from "react";
import { message as msg, Table, Space, Button ,Image } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { InfoOutlined, EditOutlined } from "@ant-design/icons";
import { getAllBrands } from "../../actions/brand";
import BrandModal from "./BrandModal";
const columns = [
  {
    title: "Brand ID",
    dataIndex: "brandId",
    key: "brandId",
  },
  {
    title: "Brand Name",
    dataIndex: "brandName",
    key: "brandName",
    sorter: (a, b) => a.brandName.length - b.brandName.length,
  },
  {
    title: "Information",
    dataIndex: "information",
    key: "information",
  },
  {
    title: "Logo",
    dataIndex: "logo",
    key: "logo",
    render: (text) => <Image height={70} src={text} alt="Brand" />,
  },
];

const Brands = () => {
  const { brand } = useSelector((state) => state.brand);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const [brands, setBrands] = useState([]);
  const [action, setAction] = useState("");
  useEffect(() => {
    dispatch(getAllBrands())
      .then(() => {})
      .catch(() => {
        msg.error("Get all brand failed");
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
              setOpenModal(true);
              setBrands(record);
              setAction("see");
            }}
          />
          <Button
            onClick={() => {
              setOpenModal(true);
              setBrands(record);
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
      <Button
        style={{ background: "var(--primary-color)", margin: 10 }}
        onClick={() => {
          setOpenModal(true);
          setBrands([]);
          setAction("add");
          
        }}
      >
        Add
      </Button>
      <div style={{ overflowX: "auto" }}>
        {" "}
        <Table
          columns={columnss}
          dataSource={brand ? brand : []}
          pagination={pagination}
          scroll={{
            y: "60vh",
          }}
          locale={{
            emptyText: "Your brands is empty",
          }}
          rowKey="brandId"
        />
      </div>
      <BrandModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        brands={brands}
        setBrands={setBrands}
        action={action}
      />
    </>
  );
};
export default Brands;
