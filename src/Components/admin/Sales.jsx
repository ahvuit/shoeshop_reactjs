import React, { useEffect, useState } from "react";
import { Table, Space, Button, Image } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { InfoOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";

import { getAllSales } from "../../actions/sale";
import SaleModal from "./SaleModal";
import SearchComponent from "./SearchComponent";

const columns = [
  {
    title: "Mã CT khuyến mãi",
    dataIndex: "salesId",
    key: "brandId",
  },
  {
    title: "Tên CT khuyến mãi",
    dataIndex: "salesName",
    key: "brandName",
    sorter: (a, b) => a.brandName.length - b.brandName.length,
  },
  {
    title: "Nội dung KM",
    dataIndex: "content",
    key: "content",
  },
  {
    title: "Phần trăm KM",
    dataIndex: "percent",
    key: "percent",
    render: (text) => <span>{text}%</span>,
  },
  {
    title: "Banner",
    dataIndex: "banner",
    key: "banner",
    render: (text) => <Image height={70} src={text} alt="Sales" />,
  },
  {
    title: "Ngày bắt đầu",
    dataIndex: "startDay",
    key: "startDay",
    render: (text) => moment(text).format("DD-MM-YYYY"),
  },
  {
    title: "Ngày kết thúc",
    dataIndex: "endDay",
    key: "endDay",
    render: (text) => moment(text).format("DD-MM-YYYY"),
  },
];

const Sales = () => {
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
              setSales(record);
              setAction("see");
            }}
          />
          <Button
            onClick={() => {
              setOpenModal(true);
              setSales(record);
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
      <div style={{ overflowX: "auto" }}>
        {" "}
        <Table
          columns={columnss}
          dataSource={filteredData || sale1}
          pagination={pagination}
          scroll={{
            y: "60vh",
          }}
          locale={{
            emptyText: "Danh sách chương trình khuyến mãi trống",
          }}
          rowKey="salesId"
        />
      </div>
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
export default Sales;
