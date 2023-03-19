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

import { addOrder } from "../../actions/order";
import { clearCart } from "../../actions/cart";
import { useNavigate } from "react-router-dom";

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
      title: "Do you want checkout this Cart?",
      content: (
        <div>
          <p>This action cannot be undone.</p>
          <p>Are you sure you want to checkout this Cart?</p>
        </div>
      ),
      okText: "Checkout",
      okType: "primary",
      cancelText: "Back",

      onOk() {
        dispatch(addOrder(orderModel, listOrderDetails))
          .then((json) => {
            dispatch(clearCart());
            setCheckoutCartDrawerOpen(false);
            setCartDrawerOpen(false);
            setOpen(true);

            msg.success("Add order successful!");
          })
          .catch((error) => {
            msg.error("Add order failed");
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
            name="firstName"
            label="First name"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            rules={[{ required: true, message: "Please type your first name" }]}
          >
            <Input placeholder="Enter your first name..."></Input>
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last name"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            rules={[{ required: true, message: "Please type your last name" }]}
          >
            <Input placeholder="Enter your last name..."></Input>
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            rules={[
              { required: true, message: "Please type your phone number!" },
              {
                pattern: /^[0-9]{10,11}$/,
                message: "Please type a valid phone number!",
              },
            ]}
          >
            <Input placeholder="Enter your phone..."></Input>
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            rules={[
              { required: true, type: "email", message: "Please type email" },
            ]}
          >
            <Input placeholder="Enter your email..."></Input>
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            rules={[{ required: true, message: "Please type your address" }]}
          >
            <Input placeholder="Enter your address..."></Input>
          </Form.Item>
          <Form.Item
            name="note"
            label="Note"
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
              placeholder="Enter your note"
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
              Submit
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
        title="Successfully Purchased!"
        subTitle={`Thanks! Order number: ${
          orders.slice(-1)[0]?.orderModel.orderId
        } will be delivered to you soon, please wait.`}
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
            Continue to shop
          </Button>,
        ]}
      />
    </Modal>
  );
};
export default React.memo(AppCheckout);
