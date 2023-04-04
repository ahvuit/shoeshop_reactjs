import React, { useEffect, useState } from "react";
import {
  Table,
  Modal,
  Image,
  Select,
  Form,
  Button,
  message as msg,
} from "antd";
import { useSelector, useDispatch } from "react-redux";

import { getAllProducts } from "../../actions/product";
import {
  getAllSaleDetails,
  getAllSaleDetailsIsComing,
  getAllSaleDetailsIsActive,
} from "../../actions/saleDetails";
import { getAllSales } from "../../actions/sale";
import { insertSaleDetails } from "../../actions/saleDetails";
import FormattedCurrency from "../FormattedCurrency";
import moment from "moment";

const SaleDetailsModal = (props) => {
  const { openModal, setOpenModal, sd } = props;
  const { products } = useSelector((state) => state.product);
  const { sale } = useSelector((state) => state.sale);
  const [sale1, setSale] = useState(null);
  const [data, setData] = useState([]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    //  console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  // const [saleDetails,setSaleDetails]= useState(null);
  const { saleDetailsIsComing, saleDetailsIsActive } = useSelector(
    (state) => state.saleDetails
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts())
      .then(() => {})
      .catch(() => {});
    dispatch(getAllSaleDetails())
      .then(() => {})
      .catch(() => {});
    dispatch(getAllSales())
      .then(() => {})
      .catch(() => {});
    dispatch(getAllSaleDetailsIsComing())
      .then(() => {})
      .catch(() => {});
    dispatch(getAllSaleDetailsIsActive())
      .then(() => {})
      .catch(() => {});
  }, [dispatch]);
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
  ];
  let s;
  let filtered;
  if (saleDetailsIsComing !== null && saleDetailsIsActive !== null) {
    s = [...saleDetailsIsComing, ...saleDetailsIsActive];
    filtered = products?.filter(
      (product) => !s?.some((sale) => product.productId === sale.productId)
    );
    //setData(filtered);
  }
  // setSaleDetails(filtered)
  // console.log('filter: ',filtered);
  ///let data = orders1.filter((order) => order?.orderModel.orderId === orderId);
  //   const orderDetails = data.map((item, index) => {
  //     return [...item.listOrderDetails];
  //   })[0];
  //   const orderDetailsWithKeys = orderDetails?.map((item, index) => {
  //     return {
  //       ...item,
  //       key: `orderDetail-${index}`,
  //     };
  //   });
  const columns = [
    {
      title: "Product Id",
      dataIndex: "productId",
      key: "productId",
    },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Brand", dataIndex: "brandName", key: "brandName" },
    { title: "Category", dataIndex: "categoryName", key: "categoryName" },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => <Image src={text} width={60} />,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => <FormattedCurrency amount={text} />,
    },
  ];
  const handelSubmit = () => {
    console.log("sale: ", sale1);
    console.log("lpro: ", selectedRowKeys);
    const listProduct1 = { ...selectedRowKeys };
    const listProduct = Object.keys(listProduct1).map((key) => ({
      productId: listProduct1[key],
    }));
    const e = { salesId: sale1, listProduct, updateBy: "123" };

    console.log("listProduct: ", JSON.stringify(e));
    dispatch(insertSaleDetails(e))
      .then(() => {
        msg.success("successful");
        setOpenModal(false);
        filtered=[];
        dispatch(getAllSaleDetailsIsComing())
      .then(() => {})
      .catch(() => {});
    dispatch(getAllSaleDetailsIsActive())
      .then(() => {})
      .catch(() => {});

        setSelectedRowKeys([])
      })
      .catch((e) => {
        console.log("e: ", e);
        msg.error("Failed");
      });
  };
  const handleChange = (v) => {
    console.log("v: ", v);
    setSale(v);
    // dispatch(getAllSaleDetails(v))
    //   .then(() => {})
    //   .catch(() => {});
  };
  return (
    <Modal
      title="20px to Top"
      style={{
        top: 20,
      }}
      open={openModal}
      onOk={() => setOpenModal(false)}
      onCancel={() => setOpenModal(false)}
      width={1000}
      footer={null}
    >
      <Select
        placeholder="Chọn chương trình khuyến mãi"
        style={{
          width: 200,
        }}
        onChange={handleChange}
        options={options}
      />
      <div style={{ marginTop: 20 }}>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}{" "}
        </span>
      </div>
      <Table
        rowSelection={rowSelection}
        dataSource={filtered}
        columns={columns}
        rowKey="productId"
        pagination={{ pageSize: 5 }}
      />
      <Button type="primary" onClick={() => handelSubmit()}>
        Lưu
      </Button>
    </Modal>
  );
};
export default SaleDetailsModal;
