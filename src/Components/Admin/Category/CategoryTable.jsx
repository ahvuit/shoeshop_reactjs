import React from "react";
import { Table, Space, Button } from "antd";
import { InfoOutlined, EditOutlined } from "@ant-design/icons";

const columns = [
  {
    title: "Mã danh mục",
    dataIndex: "categoryId",
    key: "categoryId",
  },
  {
    title: "Tên danh mục",
    dataIndex: "categoryName",
    key: "categoryName",
    sorter: (a, b) => a.categoryName.length - b.categoryName.length,
  },
];

const CategoryTable = ({ setAction, data, setOpenModal, setCategory }) => {
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
              setCategory(record);
              setAction("see");
            }}
          />
          <Button
            onClick={() => {
              setOpenModal(true);
              setCategory(record);
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
            emptyText: "Danh sách danh mục trống",
          }}
          rowKey="categoryId"
        />
      </div>
    </>
  );
};
export default CategoryTable;
