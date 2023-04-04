import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Button, Divider, Form, Input, Typography, message as msg } from "antd";
import { FacebookFilled, GoogleOutlined } from "@ant-design/icons";

import { login, register } from "../actions/auth";

const Register = () => {
  let navigate = useNavigate();
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const onFinish = (values) => {
    values.password.trim() !== values.rePassword.trim()
      ? msg.warning("confirmation password does not match")
      : dispatch(register(values.username.trim(), values.password.trim()))
          .then(() => {
            msg.success("Đăng ký thành công");
            navigate("/login");
          })
          .catch(() => {
            msg.error(message);
          });
  };
  const onFinishFailed = () => {};

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
            { required: true, type: "email", message: "Vui lòng nhập email" },
          ]}
          label="Email"
          name={"username"}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          label="Password"
          name={"password"}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu xác nhận" }]}
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
          Đăng ký
        </Button>
        <Link
          style={{
            color: "#000",
          }}
          to="/login"
        >
          Bạn đã có tài khoản? Đăng nhập ngay
        </Link>
          
      </Form>
    </div>
  );
};
export default Register;
