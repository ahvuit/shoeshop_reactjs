import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { Button, Divider, Form, Input, Typography, message as msg } from "antd";
import { FacebookFilled, GoogleOutlined } from "@ant-design/icons";
import { login } from "../actions/auth";

// const onFinish = (values) => {
//   console.log("Success:", values);
// };
// const onFinishFailed = (errorInfo) => {
//   console.log("Failed:", errorInfo);
// };
const Login = () => {
  let navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log(values);
    //setTimeout()

    //console.log(values.username)
    dispatch(login(values.email.trim(), values.password.trim()))
      .then(() => {
        console.log(values);
        msg.success("Login Success");
        navigate("/profile");
        //window.location.reload();
      })
      .catch(() => {
        //msg.error(message);
      });
  };
  useEffect(() => {
    if (!isLoggedIn) {
      if (message !== "") {
        msg.error(message);
      }
    }
  });
  const onFinishFailed = (errorInfor) => {
    //console.log(errorInfor.values);
    //msg.error("Login Failed");
    //alert(message);
  };

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
        <Typography.Title>Welcom Back!</Typography.Title>
        <Form.Item
          rules={[
            { required: true, type: "email", message: "Please enter email" },
          ]}
          label="Email"
          name={"email"}
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
        <Button
          style={{
            marginBottom: 20,
          }}
          type="primary"
          htmlType="submit"
          block
        >
          Login
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
