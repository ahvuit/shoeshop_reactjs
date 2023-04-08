import React, { useEffect } from "react";
import { Table, Space, Button, Image } from "antd";
import { useDispatch } from "react-redux";
import { InfoOutlined, EditOutlined } from "@ant-design/icons";

import { getAllBrands } from "../../../actions/brand";

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

const BrandTable = ({ setAction, data, setOpenModal, setBrands }) => {
  const dispatch = useDispatch();

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
      <div style={{ overflowX: "auto" }}>
        {" "}
        <Table
          columns={columnss}
          dataSource={data}
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
    </>
  );
};
export default BrandTable;
