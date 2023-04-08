import { useDispatch, useSelector } from "react-redux";
import CategoryTable from "../../Components/Admin/Category/CategoryTable";
import { useEffect, useState } from "react";
import { getAllCategories } from "../../actions/category";
import { Button, Space } from "antd";
import SearchComponent from "../../Components/Admin/Another/SearchComponent";
import CategoryModal from "../../Components/Admin/Category/CategoryModal";

const Category = () => {
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
      <CategoryTable
        data={filteredData || categories}
        openModal={openModal}
        setOpenModal={setOpenModal}
        setCategory={setCategory}
        setAction={setAction}
      />
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
export default Category;
