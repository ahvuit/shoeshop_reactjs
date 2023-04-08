import { useDispatch, useSelector } from "react-redux";
import ProductTable from "../../Components/Admin/Product/ProductTable";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../actions/product";
import { getAllBrands } from "../../actions/brand";
import { getAllCategories } from "../../actions/category";
import { Button, Space } from "antd";
import SearchComponent from "../../Components/Admin/Another/SearchComponent";
import ProductModal from "../../Components/Admin/Product/ProductModal";

const Product = () => {
  const { products } = useSelector((state) => state.product);
  const { brand } = useSelector((state) => state.brand);
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState([]);
  const [action, setAction] = useState("");
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    dispatch(getAllProducts())
      .then(() => {})
      .catch(() => {
        // msg.error("Get all product failed");
      });
    dispatch(getAllBrands())
      .then(() => {})
      .catch(() => {});
    dispatch(getAllCategories())
      .then(() => {})
      .catch(() => {});
  }, [dispatch]);
  const options = {
    name: "Tên sản phẩm",
    productId: "Mã sản phẩm",
    brandName: "Tên hãng",
    categoryName: "Tên danh mục",
  };
  return (
    <>
      <Space>
        <Button
          style={{ background: "var(--primary-color)", margin: 10 }}
          onClick={() => {
            setOpen(true);
            setProduct([]);
            setAction("add");
          }}
        >
          Thêm sản phẩm mới
        </Button>
        <SearchComponent
          data={products ? products : []}
          options={options}
          setFilteredData={setFilteredData}
        />
      </Space>
      <ProductTable
        data={filteredData || products}
        brand={brand}
        categories={categories}
        open={open}
        setOpen={setOpen}
        setProduct={setProduct}
        setAction={setAction}
      />
      <ProductModal
        open={open}
        setOpen={setOpen}
        product={product}
        setProduct={setProduct}
        action={action}
      />
    </>
  );
};
export default Product;
