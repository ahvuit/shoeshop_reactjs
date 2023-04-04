import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { FacebookFilled, GoogleOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, Typography, message as msg } from "antd";

import { login } from "../actions/auth";

const Login = () => {
  let navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(login(values.email.trim(), values.password.trim()))
      .then(() => {
        msg.success("Đăng nhập thành công");
        navigate("/profile");
      })
      .catch(() => {});
  };
  useEffect(() => {
    if (!isLoggedIn) {
      if (message !== "") {
        msg.error(message);
      }
    }
  });
  const onFinishFailed = () => {};

  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className="appBg">
      <Form
        className="loginForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Typography.Title style={{ textAlign:"center"  }}>Welcom Back!</Typography.Title>
        <Form.Item
        
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 18 }}
          rules={[
            { required: true, type: "email", message: "Vui lòng nhập email" },
          ]}
          label="Email"
          name={"email"}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item 
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 18 }}
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          label="Mật khẩu"
          name={"password"}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <Button
          style={{
            marginBottom: 20,
          }}
          type="primary"
          htmlType="submit"
          block
        >
          Đăng nhập
        </Button>
        <Link
          style={{
            color: "#000",
          }}
          to="/register"
        >
          Bạn chưa có tài khoản? Đăng ký ngay
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
export default Login;
