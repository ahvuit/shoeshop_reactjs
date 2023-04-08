import { useDispatch, useSelector } from "react-redux";
import SaleTable from "../../Components/Admin/Sale/SaleTable";
import { useEffect, useState } from "react";
import { getAllSales } from "../../actions/sale";
import { Button, Space } from "antd";
import moment from "moment";
import SearchComponent from "../../Components/Admin/Another/SearchComponent";
import SaleModal from "../../Components/Admin/Sale/SaleModal";
const Sale = () => {
  const { sale } = useSelector((state) => state.sale);
  const [openModal, setOpenModal] = useState(false);
  const [sale1, setSale1] = useState([]);
  const dispatch = useDispatch();
  const [sales, setSales] = useState([]);
  const [filteredData, setFilteredData] = useState(null);
  const [action, setAction] = useState("");

  const options = {
    salesName: "Tên chương trình",
    salesId: "Mã chương trình",
    content: "Nội dung",
  };

  useEffect(() => {
    dispatch(getAllSales())
      .then(() => {})
      .catch(() => {});
  }, [dispatch]);

  useEffect(() => {
    setSale1(sale);
  }, [sale]);
  return (
    <>
      <Space>
        <Button
          style={{ background: "var(--primary-color)", margin: 10 }}
          onClick={() => {
            const s = sale.filter((ss) => {
              const date1 = moment(ss.startDay).format("YYYY-MM-DD");
              const current = moment();
              const h = current.diff(date1, "hours", true);
              return h < 0;
            });
            setSale1(s);
          }}
        >
          Sắp diễn ra
        </Button>
        <Button
          style={{ background: "var(--primary-color)", margin: 10 }}
          onClick={() => {
            const s = sale.filter((ss) => {
              const date1 = moment(ss.endDay).format("YYYY-MM-DD");
              const date2 = moment(ss.startDay).format("YYYY-MM-DD");
              const current = moment();
              const h = current.diff(date1, "hours", true);
              const h2 = current.diff(date2, "hours", true);
              return h <= 0 && h2 >= 0;
            });
            setSale1(s);
          }}
        >
          Đang diễn ra
        </Button>
        <Button
          style={{ background: "var(--primary-color)", margin: 10 }}
          onClick={() => {
            const s = sale.filter((ss) => {
              const date1 = moment(ss.endDay).format("YYYY-MM-DD");
              const current = moment();
              const h = current.diff(date1, "hours", true);
              return h > 0;
            });
            setSale1(s);
          }}
        >
          Đã kết thúc
        </Button>
      </Space>
      <div>
        <Space>
          <Button
            style={{ background: "var(--primary-color)", margin: 10 }}
            onClick={() => {
              setOpenModal(true);
              setSales([]);
              setAction("add");
            }}
          >
            Thêm chương tình khuyến mãi mới
          </Button>
          <SearchComponent
            data={sale1 ? sale1 : []}
            options={options}
            setFilteredData={setFilteredData}
          />
        </Space>
      </div>
      <SaleTable
        data={filteredData || sale1}
        openModal={openModal}
        setOpenModal={setOpenModal}
        setSales={setSales}
        setAction={setAction}
      />
      <SaleModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        sale={sales}
        setSale={setSales}
        action={action}
      />
    </>
  );
};
export default Sale;
