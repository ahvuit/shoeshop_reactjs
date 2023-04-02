import React, { useEffect } from "react";
import { Table, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../actions/product";
import { getAllSaleDetails } from "../../actions/saleDetails";
const SaleDetailsModal = (props) => {
  const { openModal, setOpenModal, sd } = props;
  const { products } = useSelector((state) => state.product);
  const { saleDetails } = useSelector((state) => state.saleDetails);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts())
      .then(() => {})
      .catch(() => {});
    dispatch(getAllSaleDetails())
      .then(() => {})
      .catch(() => {});
  }, [dispatch]);
  useEffect(() => {
   console.log("saleDetails: ", sd);
   console.log("product: ", products);
   const filtered = products.filter(
    (product) => !sd?.some((sale) => product.productId === sale.productId)
  );
  console.log('after filter: ',filtered);

  }, [sd]);
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
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Size", dataIndex: "size", key: "size" },
    { title: "Price", dataIndex: "price", key: "price" },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (text) => `$${text}`,
    },
  ];
  return (
    <Modal
      title="20px to Top"
      style={{
        top: 20,
      }}
      open={openModal}
      onOk={() => setOpenModal(false)}
      onCancel={() => setOpenModal(false)}
    >
      <Table
        style={{ marginTop: 20 }}
        /// dataSource={orderDetailsWithKeys}
        columns={columns}
        rowKey="key"
      />
    </Modal>
  );
};
export default SaleDetailsModal;
