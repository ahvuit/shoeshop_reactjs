import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Drawer,
  Table,
  Badge,
  Button,
  Form,
  message as msg,
  Input,
} from "antd";

import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../actions/cart";
import { useNavigate } from "react-router-dom";

import { ShoppingCartOutlined } from "@ant-design/icons";

const AppCart = () => {
  const { TextArea } = Input;

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
  const {user}= useSelector(state=>state.auth)
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
        <Button onClick={handleCheckout} type="primary">
          Checkout Your Cart
        </Button>
        {/* <Button onClick={() => {
            setCheckoutCartDrawerOpen(true);
          }} type="primary">
          Checkout Your Cart
        </Button> */}
      </Drawer>
      <Drawer
        // contentWrapperStyle={{ width: "100%", maxWidth: "400px" }}

        open={checkoutDrawerOpen}
        onClose={() => {
          setCheckoutCartDrawerOpen(false);
        }}
        title= {totalCartPrice}
      >
        <Form form={form} onFinish={(values)=>console.log('note: ', values)}>
          
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
            rules={[
              { required: true,  message: "Please type your address" },
            ]}
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
      // onChange={onChange}
      placeholder="Enter your note"
    />
          </Form.Item>
          <Form.Item
          
            name="userId"
            labelCol={{ span: 6 }}
  wrapperCol={{ span: 18 }}
            
          >
            <Input disabled style={{ display:"none" }} placeholder="Enter your first name..."></Input>
          </Form.Item>
          <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default AppCart;

//   import { logout } from "../actions/auth";
// function AppCart() {
//   const { numberCart, Carts } = useSelector((state) => state.cart);
//   const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
//   const [checkoutDrawerOpen, setCheckoutCartDrawerOpen] = useState(false);

//   const columns = [
//     {
//       title: "Product",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Size",
//       dataIndex: "size",
//       key: "size",
//     },
//     {
//       title: "Price",
//       dataIndex: "price",
//       key: "price",
//       render: (price) => `$${price.toFixed(0)}`,
//     },
//     {
//       title: "SL",
//       dataIndex: "quantity",
//       key: "quantity",
//       render: (quantity) => {
//         return <InputNumber value={quantity}></InputNumber>;
//       },
//     },
//     {
//       title: "Total",
//       dataIndex: "total",
//       key: "total",
//       render: (total) => `$${total.toFixed(0)}`,
//     },
//   ];
//   const data = Carts.map((item) => ({
//     key: item.productId,
//     name: item.name,
//     size: 38,
//     // size: item.size,
//     price: item.price,
//     quantity: item.quantity,
//     total: item.quantity * item.price,
//   }));

//   return (
//     <div>
//       <Badge
//         onClick={() => {
//           setCartDrawerOpen(true);
//         }}
//         count={numberCart}
//         className="shoppingCartOutlined"
//       >
//         <ShoppingCartOutlined />
//       </Badge>

//       <Drawer
//         // width={{ xs: 400, sm: 600, lg: 800 }}
//         open={cartDrawerOpen}
//         onClose={() => {
//           setCartDrawerOpen(false);
//         }}
//         contentWrapperStyle={{ width: "100%", maxWidth: "800px" }}
//         title={`Your Cart (${numberCart})`}
//       >
//         <Table
//           columns={columns}
//           dataSource={data}
//           locale={{ emptyText: "Your cart is empty" }}
//           // summary={(data) => {
//           //   console.log("quantity: ", data.quantity);
//           //   const total =
//           //     data.length > 1
//           //       ? data.reduce((pre, current) => {
//           //           return pre.total + current.total;
//           //         })
//           //       : data.length === 1
//           //       ?( data.total ,
//           //         console.log('total: ',data.total))
//           //       : 0;
//           //   return <span>Total: {total}</span>;
//           // }}
//         />
//         <Button
//           onClick={() => {
//             setCheckoutCartDrawerOpen(true);
//           }}
//           type="primary"
//         >
//           Checkout Your Cart
//         </Button>
//       </Drawer>
//       <Drawer
//         open={checkoutDrawerOpen}
//         onClose={() => {
//           setCheckoutCartDrawerOpen(false);
//         }}
//       >
//         <Form>
//             <Form.Item>

//             </Form.Item>
//         </Form>
//       </Drawer>
//     </div>
//   );
// }
// export default AppCart;
