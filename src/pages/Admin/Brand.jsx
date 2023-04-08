import { useDispatch, useSelector } from "react-redux";
// import Brands from "../../Components/Admin/Brand/BrandTable";
import { useEffect, useState } from "react";
import { getAllBrands } from "../../actions/brand";
import { Button, Space } from "antd";
import SearchComponent from "../../Components/Admin/Another/SearchComponent";
import BrandModal from "../../Components/Admin/Brand/BrandModal";
import BrandTable from "../../Components/Admin/Brand/BrandTable";

const Brand = () => {
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
      <BrandTable
        data={filteredData || brand}
        openModal={openModal}
        setOpenModal={setOpenModal}
        setBrands={setBrands}
        setAction={setAction}
      />
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
export default Brand;
