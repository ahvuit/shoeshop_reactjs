import React, { useEffect, useState } from "react";
import { Table, Space, Button, Image } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { InfoOutlined, EditOutlined } from "@ant-design/icons";

import { getAllBrands } from "../../actions/brand";
import BrandModal from "./BrandModal";
import SearchComponent from "./SearchComponent";

const columns = [
  {
    title: "Mã hãng",
    dataIndex: "brandId",
    key: "brandId",
  },
  {
    title: "Tên hãng",
    dataIndex: "brandName",
    key: "brandName",
    sorter: (a, b) => a.brandName.length - b.brandName.length,
  },
  {
    title: "Thông tin hãng",
    dataIndex: "information",
    key: "information",
  },
  {
    title: "Logo hãng",
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
  const [filteredData, setFilteredData] = useState(null);
  const options = { brandName: "Tên hãng", brandId: "Mã hãng" };

  useEffect(() => {
    dispatch(getAllBrands())
      .then(() => {})
      .catch(() => {});
  }, [dispatch]);

  const columnss = [
    ...columns,
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
      <Space>
        <Button
          style={{ background: "var(--primary-color)", margin: 10 }}
          onClick={() => {
            setOpenModal(true);
            setBrands([]);
            setAction("add");
          }}
        >
          Thêm mới hãng
        </Button>
        <SearchComponent
          data={brand ? brand : []}
          options={options}
          setFilteredData={setFilteredData}
        />
      </Space>
      <div style={{ overflowX: "auto" }}>
        {" "}
        <Table
          columns={columnss}
          dataSource={filteredData || brand}
          pagination={pagination}
          scroll={{
            y: "60vh",
          }}
          locale={{
            emptyText: "Danh sách hãng trống",
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
