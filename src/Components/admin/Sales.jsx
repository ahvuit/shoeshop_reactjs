import React, { useEffect, useState } from "react";
import { message as msg, Table, Space, Button, Image } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { InfoOutlined, EditOutlined } from "@ant-design/icons";
import { getAllSales } from "../../actions/sale";
import moment from "moment";
import SaleModal from "./SaleModal";
const columns = [
  {
    title: "Sale ID",
    dataIndex: "salesId",
    key: "brandId",
  },
  {
    title: "Sale Name",
    dataIndex: "salesName",
    key: "brandName",
    sorter: (a, b) => a.brandName.length - b.brandName.length,
  },
  {
    title: "Content",
    dataIndex: "content",
    key: "content",
  },
  {
    title: "Percent",
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
    title: "Start Day",
    dataIndex: "startDay",
    key: "startDay",
    render: (text) => moment(text).format("DD-MM-YYYY"),

    //render: (text) => <Image height={70} src={text} alt="Sales" />,
  },
  {
    title: "End Day",
    dataIndex: "endDay",
    key: "endDay",
    render: (text) => moment(text).format("DD-MM-YYYY"),
    // render: (text) => <Image height={70} src={text} alt="Sales" />,
  },
];

const Sales = () => {
  const { sale } = useSelector((state) => state.sale);
  const [openModal, setOpenModal] = useState(false);
  const [sale1, setSale1] = useState([]);
  const dispatch = useDispatch();
  const [sales, setSales] = useState([]);
  const [action, setAction] = useState("");
  console.log("sale: ", sale);
  useEffect(() => {
    dispatch(getAllSales())
      .then(() => {})
      .catch(() => {
        msg.error("Get all brand failed");
      });
  }, [dispatch]);
  useEffect(() => {
    setSale1(sale);
  }, [sale]);
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
            setOpenModal(true);
            setSales([]);
            setAction("add");
          }}
        >
          Add
        </Button>
        <Button
          style={{ background: "var(--primary-color)", margin: 10 }}
          onClick={() => {
            const s = sale.filter((ss) => {
              const date1 = moment(ss.startDay).format("YYYY-MM-DD")
            const current = moment()
           const h= current.diff(date1, "hours", true)
           return h<0
              
            });
            setSale1(s)
            
          }}
        >
          Chua Sale
        </Button>
        <Button
          style={{ background: "var(--primary-color)", margin: 10 }}
          onClick={() => {
            
            const s = sale.filter((ss) => {
              const date1 = moment(ss.endDay).format("YYYY-MM-DD")
              const date2 = moment(ss.startDay).format("YYYY-MM-DD")
            const current = moment()
           const h= current.diff(date1, "hours", true)
           const h2= current.diff(date2, "hours", true)
           return h<=0 && h2>=0
              
            });
            setSale1(s)
          }}
        >
          Dang Sale
        </Button>
        <Button
          style={{ background: "var(--primary-color)", margin: 10 }}
          onClick={() => {const s = sale.filter((ss) => {
              const date1 = moment(ss.endDay).format("YYYY-MM-DD")
            const current = moment()
           const h= current.diff(date1, "hours", true)
           return h>  0
              
            });
            setSale1(s)}}
        >
          Da Sale
        </Button>
      </Space>
      <div style={{ overflowX: "auto" }}>
        {" "}
        <Table
          columns={columnss}
          dataSource={sale1 ? sale1 : []}
          pagination={pagination}
          scroll={{
            y: "60vh",
          }}
          locale={{
            emptyText: "Your brands is empty",
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
