import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Drawer,
  Table,
  Badge,
  Button,
  Form,
  message as msg,
} from "antd";

import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../actions/cart";
import { useNavigate } from "react-router-dom";

import { ShoppingCartOutlined } from "@ant-design/icons";
import AppCheckout from "./AppCheckout";
const AppCart = () => {

  const { Carts } = useSelector((state) => state.cart);
  const { numberCart } = useSelector((state) => state.cart);
  const [checkoutDrawerOpen, setCheckoutCartDrawerOpen] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image",
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
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => <span>${price}</span>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, record) => (
        <div>
          <Button
            onClick={() => {
              console.log("record: ", record);
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
      title: "Total Price",
      dataIndex: "total",
      key: "total",
      render: (total) => <span>${parseFloat(total).toFixed(2)}</span>,
    },
    {
      title: "Action",
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

      navigate("/login"); // replace '/login' with your login page URL
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

  // console.log('user: ',user.profile);
  return (
    <div>
      <Badge
        onClick={() => {
          setCartDrawerOpen(true);
        }}
        count={numberCart}
        className="shoppingCartOutlined"
      >
        <ShoppingCartOutlined />
      </Badge>
      <Drawer
        title="Shopping Cart"
        placement="right"
        open={cartDrawerOpen}
        onClose={() => {
          setCartDrawerOpen(false);
        }}
        contentWrapperStyle={{ width: "100%", maxWidth: "800px" }}
      >
        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
          rowKey={(record) => record.productId + record.size}
        />
        <div style={{ marginTop: 20, marginBottom: 20 }}>
          <h3>Total Price: ${parseFloat(totalCartPrice).toFixed(2)}</h3>
        </div>
        <Button disabled={Object.keys(Carts).length===0 }  onClick={handleCheckout} type="primary">
          Checkout Your Cart
        </Button>
        {/* <Button onClick={() => {
            setCheckoutCartDrawerOpen(true);
          }} type="primary">
          Checkout Your Cart
        </Button> */}
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
