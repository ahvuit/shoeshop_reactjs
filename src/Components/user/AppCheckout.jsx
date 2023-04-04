import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Drawer,
  Button,
  Form,
  message as msg,
  Input,
  Modal,
  Result,
} from "antd";
import { useNavigate } from "react-router-dom";

import { addOrder } from "../../actions/order";
import { clearCart } from "../../actions/cart";

const AppCheckout = (props) => {
  const {
    checkoutDrawerOpen,
    setCheckoutCartDrawerOpen,
    totalCartPrice,
    Carts,
    setCartDrawerOpen,
  } = props;

  const { TextArea } = Input;
  const [open, setOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const [form] = Form.useForm();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const initialValues = {
    userId: user?.userId || "",
    lastName: user?.profile.lastName || "",
    firstName: user?.profile.firstName || "",
    phone: user?.profile.phone || "",
    email: user?.email || "",
    address: user?.profile.address || "",
    note: "",
  };
  const dispatch = useDispatch();

  const handleFinish = (values) => {
    const orderModel = { orderId: null, ...values };

    const listOrderDetails = Carts.map((item) => {
      item = { orderId: null, ...item, size: item.size, total: null };
      const { image, name, ...rest } = item;
      return rest;
    });
    Modal.confirm({
      title: "Bạn muốn đặt hàng?",
      content: (
        <div>
          <p>Hành động này không thể được hoàn tác.</p>
          <p>Bạn có chắc chắn muốn thanh toán Giỏ hàng này không?</p>
        </div>
      ),
      okText: "Đặt hàng",
      okType: "primary",
      cancelText: "Để sau",

      onOk() {
        dispatch(addOrder(orderModel, listOrderDetails))
          .then((json) => {
            dispatch(clearCart());
            setCheckoutCartDrawerOpen(false);
            setCartDrawerOpen(false);
            setOpen(true);
            msg.success("Đặt hành thành công!");
          })
          .catch((error) => {
            msg.error("Đã xảy ra lỗi, vui lòng thử lại");
          });
      },
      okButtonProps: {
        style: {
          backgroundColor: "var(--primary-color)",
          borderColor: "var(--primary-color)",
        },
      },
    });
  };
  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);
  return (
    <>
      <Drawer
        open={checkoutDrawerOpen}
        onClose={() => {
          setCheckoutCartDrawerOpen(false);
        }}
        title={totalCartPrice}
      >
        <Form form={form} onFinish={handleFinish}>
          <Form.Item
            name="lastName"
            label="Họ "
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            rules={[{ required: true, message: "Vui lòng nhập Họ của bạn" }]}
          >
            <Input placeholder="Nhập họ của bạn..."></Input>
          </Form.Item>
          <Form.Item
            name="firstName"
            label="Tên"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            rules={[{ required: true, message: "Vui lòng nhập tên của bạn" }]}
          >
            <Input placeholder="Nhập tên của bạn..."></Input>
          </Form.Item>
          <Form.Item
            name="phone"
            label="Điện thoại"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại của bạn!",
              },
              {
                pattern: /^[0-9]{10,11}$/,
                message: "Vui lòng nhập đúng định dạng số điện thoại!",
              },
            ]}
          >
            <Input placeholder="Nhập số điện thoại của bạn..."></Input>
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            rules={[
              { required: true, type: "email", message: "Vui lòng nhập email" },
            ]}
          >
            <Input placeholder="Nhập email của bạn..."></Input>
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            rules={[
              { required: true, message: "Vui lòng nhập địa chỉ của bạn" },
            ]}
          >
            <Input placeholder="Nhập địa chỉ của bạn..."></Input>
          </Form.Item>
          <Form.Item
            name="note"
            label="Ghi chú"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
          >
            <TextArea
              showCount
              maxLength={100}
              style={{
                height: 120,
                marginBottom: 24,
              }}
              placeholder="Nhập ghi chú của bạn"
            />
          </Form.Item>
          <Form.Item
            name="userId"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
          >
            <Input
              disabled
              style={{ display: "none" }}
              placeholder="Enter your first name..."
            ></Input>
          </Form.Item>
          <Form.Item>
            <Button
              style={{ background: "var(--primary-color)" }}
              type="primary"
              htmlType="submit"
            >
              Đặt hàng
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
      <AppModal open={open} setOpen={setOpen} />
    </>
  );
};
const AppModal = (props) => {
  const { orders } = useSelector((state) => state.order);
  const { open, setOpen } = props;
  const navigate = useNavigate();
  return (
    <Modal
      title="Order successful"
      style={{
        top: 20,
      }}
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      footer={null}
    >
      <Result
        status="success"
        title="Đặt hàng thành công!"
        subTitle={`Xin cảm ơn! Đơn hàng có mã: ${
          orders.slice(-1)[0]?.orderModel.orderId
        } sẽ được giao đến bạn sớm nhất có thể.`}
        extra={[
          <Button
            style={{ background: "var(--primary-color)" }}
            type="primary"
            key="console"
            onClick={() => {
              setOpen(false);
              navigate("/");
            }}
          >
            Tiếp tục mua sắm
          </Button>,
        ]}
      />
    </Modal>
  );
};
export default React.memo(AppCheckout);
