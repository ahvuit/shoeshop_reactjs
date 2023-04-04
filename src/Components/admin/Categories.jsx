import React, { useEffect, useState } from "react";
import { Table, Space, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { InfoOutlined, EditOutlined } from "@ant-design/icons";

import { getAllCategories } from "../../actions/category";
import CategoryModal from "./CategoryModal";
import SearchComponent from "./SearchComponent";

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

const Categories = () => {
  const { categories } = useSelector((state) => state.category);
  const [openModal, setOpenModal] = useState(false);
  const [category, setCategory] = useState([]);
  const [action, setAction] = useState("");
  const [filteredData, setFilteredData] = useState(null);
  const dispatch = useDispatch();
  const options = { categoryId: "Mã danh mục", categoryName: "Tên danh mục" };

  useEffect(() => {
    dispatch(getAllCategories())
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
      <Space>
        <Button
          style={{ background: "var(--primary-color)", margin: 10 }}
          onClick={() => {
            setOpenModal(true);
            setCategory([]);
            setAction("add");
          }}
        >
          Thêm danh mục
        </Button>
        <SearchComponent
          data={categories ? categories : []}
          options={options}
          setFilteredData={setFilteredData}
        />
      </Space>
      <div style={{ overflowX: "auto" }}>
        {" "}
        <Table
          columns={columnss}
          dataSource={filteredData || categories}
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
      <CategoryModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        category={category}
        setCategory={setCategory}
        action={action}
      />
    </>
  );
};
export default Categories;
