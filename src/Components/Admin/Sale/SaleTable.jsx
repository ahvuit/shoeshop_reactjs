import { Table, Space, Button, Image } from "antd";
import { InfoOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";

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

const SaleTable = ({ setAction, data, setOpenModal, setSales }) => {
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
            emptyText: "Danh sách chương trình khuyến mãi trống",
          }}
          rowKey="salesId"
        />
      </div>
    </>
  );
};
export default SaleTable;
