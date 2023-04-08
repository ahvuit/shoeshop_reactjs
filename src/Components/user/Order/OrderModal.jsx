import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../actions/product";
import { Button, Image, Modal, Space, Table } from "antd";
import FormattedCurrency from "../../Common/FormattedCurrency";

const OrderDetailsModal = (props) => {
  const { openModal, setOpenModal, orderId, statusId } = props;
  const { orders } = useSelector((state) => state.order);
  const { products } = useSelector((state) => state.product);
  let data = orders.filter((order) => order?.orderModel.orderId === orderId);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts())
      .then(() => {})
      .catch(() => {});
  }, [dispatch]);
  const orderDetails = data.map((item, index) => {
    return [...item.listOrderDetails];
  })[0];
  const orderDetailsWithKeys = orderDetails?.map((item, index) => {
    return {
      ...item,
      key: `orderDetail-${index}`,
    };
  });

  const columns = [
    {
      title: "Tên Sản phẩm",
      dataIndex: "productId",
      key: "productId",
      render: (text, record) => {
        const selectedProduct = products?.find((p) => p.productId === text);
        return selectedProduct ? selectedProduct.name : "";
      },
    },
    {
      title: "Hình ảnh",
      dataIndex: "productId",
      key: "productId",
      render: (text, record) => {
        const selectedProduct = products?.find((p) => p.productId === text);
        return selectedProduct ? (
          <Image src={selectedProduct.image} width={60} />
        ) : (
          ""
        );
      },
    },
    { title: "Size", dataIndex: "size", key: "size" },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => <FormattedCurrency amount={text} />,
    },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },

    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (text) => <FormattedCurrency amount={text} />,
    },
    {
      title: "Thao tác",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {statusId !== "6405f221abfbac7f699ebbbe" ? (
            ""
          ) : (
            <Button
              //icon={<StarOutlined /> }
              type="primary"
              style={{ background: "yellow", color: "red" }}
            >
              Rate
            </Button>
          )}
        </Space>
      ),
    },
  ];
  return (
    <Modal
      title="Chi tiết đơn hàng"
      style={{
        top: 20,
      }}
      open={openModal}
      onOk={() => setOpenModal(false)}
      onCancel={() => setOpenModal(false)}
      width={1000}
      footer={null}
    >

      <Table
        style={{ marginTop: 20 }}
        dataSource={orderDetailsWithKeys}
        locale={{
          emptyText: "Your cart is empty",
        }}
        columns={columns}
        rowKey="key"
      />
    </Modal>
  );
};
export default OrderDetailsModal;
