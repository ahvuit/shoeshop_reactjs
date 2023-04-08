import { Button, Divider, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";
import { GoogleOutlined, FacebookFilled } from "@ant-design/icons";

const LoginForm = (props) => {
  const { onFinish, onFinishFailed } = props;
  return (
    <Form
      className="loginForm"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Typography.Title style={{ textAlign: "center" }}>
        Welcom Back!
      </Typography.Title>
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
        <GoogleOutlined className="socialIcon" />
        <FacebookFilled className="socialIcon" style={{ color: "blue" }} />
      </div>
    </Form>
  );
};
export default LoginForm;
