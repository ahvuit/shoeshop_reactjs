import React, { useEffect, useState } from "react";
import { Table, Space, Image, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { InfoOutlined, EditOutlined } from "@ant-design/icons";

import { getAllSizeTables } from "../../actions/sizetable";
import SizeTableModal from "./SizeTableModal";
import SearchComponent from "./SearchComponent";

const columns = [
  {
    title: "Tên sản phẩm",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Hình ảnh",
    dataIndex: "image",
    key: "image",
    render: (text) => <Image height={60} src={text} alt="Product" />,
  },
  {
    title: "Size 38",
    dataIndex: "s38",
    key: "s38",
  },
  {
    title: "Size 39",
    dataIndex: "s39",
    key: "s39",
  },
  {
    title: "Size 40",
    dataIndex: "s40",
    key: "s40",
  },
  {
    title: "Size 41",
    dataIndex: "s41",
    key: "s41",
  },
  {
    title: "Size 42",
    dataIndex: "s42",
    key: "s42",
  },
  {
    title: "Size 43",
    dataIndex: "s43",
    key: "s43",
  },
  {
    title: "Size 44",
    dataIndex: "s44",
    key: "s44",
  },
  {
    title: "Size 45",
    dataIndex: "s45",
    key: "s45",
  },
  {
    title: "Size 46",
    dataIndex: "s46",
    key: "s46",
  },
  {
    title: "Size 47",
    dataIndex: "s47",
    key: "s47",
  },
  {
    title: "Size 48",
    dataIndex: "s48",
    key: "s48",
  },
];

const SizeTables = () => {
  const { sizeTables } = useSelector((state) => state.sizeTable);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const [sizeTable, setSizeTable] = useState([]);
  const [action, setAction] = useState("");
  const [filteredData, setFilteredData] = useState(null);
  const options = { name: "Tên sản phẩm", productId: "Mã sản phẩm" };

  useEffect(() => {
    dispatch(getAllSizeTables())
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
      <SearchComponent
        data={sizeTables ? sizeTables : []}
        options={options}
        setFilteredData={setFilteredData}
      />
      <div style={{ overflowX: "auto" }}>
        {" "}
        <Table
          columns={columnss}
          dataSource={filteredData || sizeTables}
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
