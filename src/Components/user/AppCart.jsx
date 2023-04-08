import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Drawer, Badge, Button, Form, message as msg } from "antd";
import { useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Table from "../Common/Table";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../actions/cart";
import AppCheckout from "./AppCheckout";
import FormattedCurrency from "../Common/FormattedCurrency";
import MyButton from "../Common/MyButton";

const AppCart = () => {
  const { Carts } = useSelector((state) => state.cart);
  const { numberCart } = useSelector((state) => state.cart);
  const [checkoutDrawerOpen, setCheckoutCartDrawerOpen] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  const columns = [
    {
      title: "Tên SP",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} alt="Shoe" style={{ height: 80 }} />,
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => <FormattedCurrency amount={price} />,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, record) => (
        <div>
          <Button
            onClick={() => {
              dispatch(decreaseQuantity(record.productId, record.size));
            }}
          >
            -
          </Button>
          <span style={{ margin: "0 10px" }}>{quantity}</span>
          <Button
            onClick={() =>
              dispatch(increaseQuantity(record.productId, record.size))
            }
          >
            +
          </Button>
        </div>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      render: (total) => <FormattedCurrency amount={total} />,
    },
    {
      title: "  ",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Button
          style={{ background: "red" }}
          type="danger"
          onClick={() =>
            dispatch(removeFromCart(record.productId, record.size))
          }
        >
          X
        </Button>
      ),
    },
  ];
  const data = Carts.map((item) => ({
    ...item,
    total: item.quantity * item.price,
  }));

  const totalCartPrice = data.reduce((total, item) => total + item.total, 0);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (isLoggedIn) {
      setCheckoutCartDrawerOpen(true);
    } else {
      msg.warning("You need to be logged in to checkout");
      setCartDrawerOpen(false);
      navigate("/login");
    }
  };

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
  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  return (
    <div>
      <Badge
        onClick={() => {
          setCartDrawerOpen(true);
        }}
        count={numberCart}
        className="shoppingCartOutlined"
      >
        <ShoppingCartOutlined style={{ color: "var(--primary-color)" }} />
      </Badge>
      <Drawer
        title="Giỏ hàng"
        placement="right"
        open={cartDrawerOpen}
        onClose={() => {
          setCartDrawerOpen(false);
        }}
        contentWrapperStyle={{ width: "100%", maxWidth: "900px" }}
      >
        <Table
          data={data}
          columns={columns}
          pagination={false}
          emptyText="Your cart is empty"
          rowKey={(record) => record.productId}
        />
        {/* < T
          dataSource={data}
          columns={columns}
          pagination={false}
          locale={{
            emptyText: "Your cart is empty",
          }}
          rowKey={(record) => record.productId + record.size}
        /> */}
        <div style={{ marginTop: 20, marginBottom: 20 }}>
          <h3>
            Tổng tiền:{" "}
            <span style={{ color: "red" }}>
              {" "}
              <FormattedCurrency amount={totalCartPrice} />
            </span>
          </h3>
        </div>
        <MyButton
          bgColor="var(--primary-color)"
          type="primary"
          disabled={Object.keys(Carts).length === 0}
          onClick={handleCheckout}
        >
          Thanh toán giỏ hàng
        </MyButton>
      </Drawer>
      <AppCheckout
        checkoutDrawerOpen={checkoutDrawerOpen}
        setCheckoutCartDrawerOpen={setCheckoutCartDrawerOpen}
        totalCartPrice={totalCartPrice}
        Carts={Carts}
        setCartDrawerOpen={setCartDrawerOpen}
      />
    </div>
  );
};

export default AppCart;
