import React, { useEffect, useState } from "react";
import { message as msg, Table, Space, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { InfoOutlined, EditOutlined } from "@ant-design/icons";
import { getAllCategories } from "../../actions/category";
import CategoryModal from "./CategoryModal";
const columns = [
  {
    title: "Category ID",
    dataIndex: "categoryId",
    key: "categoryId",
  },
  {
    title: "Category Name",
    dataIndex: "categoryName",
    key: "categoryName",
    sorter: (a, b) => a.categoryName.length - b.categoryName.length,
  },
];

const Categories = () => {
  const { categories } = useSelector((state) => state.category);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const [category, setCategory] = useState([]);
  const [action, setAction] = useState("");
  useEffect(() => {
    dispatch(getAllCategories())
      .then(() => {})
      .catch(() => {
        msg.error("Get all category failed");
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
      <Button
        style={{ background: "var(--primary-color)", margin: 10 }}
        onClick={() => {
          setOpenModal(true);
          setCategory([]);
          setAction("add");
        }}
      >
        Add
      </Button>
      <div style={{ overflowX: "auto" }}>
        {" "}
        <Table
          columns={columnss}
          dataSource={categories ? categories : []}
          pagination={pagination}
          scroll={{
            y: "60vh",
          }}
          locale={{
            emptyText: "Your categories is empty",
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
