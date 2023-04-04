import React, { useEffect, useState } from "react";
import {
  message as msg,
  Table,
  Space,
  Button,
  Select,
  Modal,
  Image,
  Typography,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ExclamationCircleFilled, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";

import {
  getAllSaleDetails,
  deleteSaleDetails,
} from "../../actions/saleDetails";
import { getAllSales } from "../../actions/sale";
import { getAllProducts } from "../../actions/product";
import SaleDetailsModal from "./SaleDetailsModal";
import FormattedCurrency from "../FormattedCurrency";

const { confirm } = Modal;

const columns = [
  {
    title: "Mã khuyến mãi",
    dataIndex: "salesId",
    key: "salesID",
  },
];

const SaleDetails = () => {
  const { saleDetails } = useSelector((state) => state.saleDetails);
  const { sale } = useSelector((state) => state.sale);
  const { products } = useSelector((state) => state.product);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const [action, setAction] = useState("");
  useEffect(() => {
    dispatch(getAllSales())
      .then(() => {})
      .catch(() => {});
    dispatch(getAllProducts())
      .then(() => {})
      .catch(() => {});
  }, [dispatch]);
  // const handleDelete = (id) => {
  //   console.log("id: ", id);
  //   confirm({
  //     title: "Xác nhận?",
  //     icon: <ExclamationCircleFilled />,
  //     content: `Bạn muốn xóa sản phẩm này khỏi chương trình khuyến mãi?`,
  //     onOk() {
  //       dispatch(deleteSaleDetails(id))
  //         .then(() => {
  //           msg.success("Xóa sản phẩm khỏi chương trình khuyến mãi thành công");
  //         })
  //         .catch(() => {});
  //     },
  //     onCancel() {},
  //   });
  // };
  //console.log("saleDetails: ", saleDetails);
  const columnss = [
    ...columns,
    {
      title: "Tên sản phẩm",
      dataIndex: "productId",
      key: "productId",
      render: (text, record) => {
        const selectedProduct = products?.find((b) => b.productId === text);
        console.log("record: ", selectedProduct);
        return selectedProduct ? selectedProduct.name : record.productId;
      },
    },
    {
      title: "Hình ảnh",
      dataIndex: "productId",
      key: "productId",
      render: (text, record) => {
        const selectedProduct = products?.find((b) => b.productId === text);
        console.log("record: ", selectedProduct);
        return selectedProduct ? (
          <Image src={selectedProduct.image} width={60} />
        ) : (
          record.productId
        );
      },
    },
    {
      title: "Giá gốc",
      dataIndex: "productId",
      key: "productId",
      render: (text, record) => {
        const selectedProduct = products?.find((b) => b.productId === text);
        return selectedProduct ? (
          <Typography.Text delete>
            <FormattedCurrency amount={selectedProduct.price} />
          </Typography.Text>
        ) : (
          ""
        );
      },
    },
    {
      title: "Giá khuyến mãi",
      dataIndex: "salesPrice",
      key: "salesPrice",
      render: (text, record) => {
        return (
          <Typography.Text type="danger">
            <FormattedCurrency amount={text} />
          </Typography.Text>
        );
      },
    },
    // {
    //   title: "",
    //   key: "action",
    //   render: (text, record) => (
    //     <Space  size="middle">
    //       <Button hidden={true}
    //         onClick={() => {
    //           handleDelete(record.productId);
    //         }}
    //         icon={<DeleteOutlined />}
    //         style={{ background: "red" }}
    //       />
    //     </Space>
    //   ),
    // },
  ];

  const pagination = { pageSize: 5 };
  const handleChange = (v) => {
    dispatch(getAllSaleDetails(v))
      .then(() => {})
      .catch(() => {});
  };
  const options = [
    {
      label: "Sắp diễn ra",
      options: sale
        ? sale
            .filter((ss) => {
              const date1 = moment(ss.startDay).format("YYYY-MM-DD");
              const current = moment();
              const h = current.diff(date1, "hours", true);
              return h < 0;
            })
            .map((sale) => ({ label: sale.salesName, value: sale.salesId }))
        : [],
    },
    {
      label: "Đang diễn ra",
      options: sale
        ? sale
            .filter((ss) => {
              const date1 = moment(ss.endDay).format("YYYY-MM-DD");
              const date2 = moment(ss.startDay).format("YYYY-MM-DD");
              const current = moment();
              const h = current.diff(date1, "hours", true);
              const h2 = current.diff(date2, "hours", true);
              return h <= 0 && h2 >= 0;
            })
            .map((sale) => ({ label: sale.salesName, value: sale.salesId }))
        : [],
    },
    {
      label: "Đã kết thúc",
      options: sale
        ? sale
            .filter((ss) => {
              const date1 = moment(ss.endDay).format("YYYY-MM-DD");
              const current = moment();
              const h = current.diff(date1, "hours", true);
              return h > 0;
            })
            .map((sale) => ({ label: sale.salesName, value: sale.salesId }))
        : [],
    },
  ];
  return (
    <>
      <Space>
        <Button
          style={{ background: "var(--primary-color)", margin: 10 }}
          onClick={() => {
            setOpenModal(true);
            setAction("add");
          }}
        >
          Thêm sản phẩm khuyến mãi
        </Button>
        <Select
          placeholder="Chọn chương trình khuyến mãi"
          style={{
            width: 200,
          }}
          onChange={handleChange}
          options={options}
        />
      </Space>
      <div style={{ overflowX: "auto" }}>
        {" "}
        <Table
          columns={columnss}
          dataSource={saleDetails ? saleDetails : []}
          pagination={pagination}
          scroll={{
            y: "60vh",
          }}
          locale={{
            emptyText: "Danh sách sản phẩm khuyến mãi trống",
          }}
          rowKey="id"
        />
      </div>
      <SaleDetailsModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        sd={saleDetails}
        action={action}
      />
    </>
  );
};
export default SaleDetails;
