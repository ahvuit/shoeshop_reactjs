import { useDispatch, useSelector } from "react-redux";
import SizeTablesTable from "../../Components/Admin/SizeTable/SizeTablesTable";
import { useEffect, useState } from "react";
import { getAllSizeTables } from "../../actions/sizetable";
import SearchComponent from "../../Components/Admin/Another/SearchComponent";
import SizeTableModal from "../../Components/Admin/SizeTable/SizeTableModal";

const SizeTable = () => {
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
  return (
    <>
      <SearchComponent
        data={sizeTables ? sizeTables : []}
        options={options}
        setFilteredData={setFilteredData}
      />
      <SizeTablesTable
        data={filteredData || sizeTables}
        openModal={openModal}
        setOpenModal={setOpenModal}
        setSizeTable={setSizeTable}
        setAction={setAction}
      />
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
export default SizeTable;
