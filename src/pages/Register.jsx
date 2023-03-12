import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate, Link } from "react-router-dom";
import { Button, Divider, Form, Input, Typography, message as msg } from "antd";
import { FacebookFilled, GoogleOutlined } from "@ant-design/icons";
import { login,register } from "../actions/auth";

// const onFinish = (values) => {
//   console.log("Success:", values);
// };
// const onFinishFailed = (errorInfo) => {
//   console.log("Failed:", errorInfo);
// };
const Register = () => {
  let navigate = useNavigate();
  //const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log(values);
    //setTimeout()
    values.password.trim() !== values.rePassword.trim()
      ? msg.warning("confirmation password does not match")
      : //console.log(values.username)
        dispatch(register(values.username.trim(), values.password.trim()))
          .then(() => {
            console.log(values);
            msg.success("Register Successful");
            navigate("/login");
            //window.location.reload();
          })
          .catch(() => {
            msg.error(message);
          });
  };
  const onFinishFailed = (errorInfor) => {
    //console.log(errorInfor.values);
    //message.error("Login Failed");
    //alert(message);
  };

  //   if (isLoggedIn) {
  //     return <Navigate to="/profile" />;
  //   }

  return (
    <div className="appBg">
      <Form
        className="loginForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Typography.Title>Welcom to VHIT store!</Typography.Title>
        <Form.Item
          rules={[
            { required: true, type: "email", message: "Please enter email" },
          ]}
          label="Email"
          name={"username"}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please enter password" }]}
          label="Password"
          name={"password"}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Please enter confirm password" }]}
          label="Password"
          name={"rePassword"}
        >
          <Input.Password placeholder="Enter confirm password" />
        </Form.Item>
        <Button
          style={{
            marginBottom: 20,
          }}
          type="primary"
          htmlType="submit"
          block
        >
          SignUp
        </Button>
        <Link
          style={{
            color: "#000",
          }}
          to="/login"
        >
          Bạn đã có tài khoản? Đăng nhập ngay
        </Link>
        <Divider style={{ borderColor: "black" }}>or Login With</Divider>
        <div className="socialLogin">
          <GoogleOutlined className="socialIcon" onClick={login} />
          <FacebookFilled className="socialIcon" style={{ color: "blue" }} />
        </div>
      </Form>
    </div>
  );
};
export default Register;
