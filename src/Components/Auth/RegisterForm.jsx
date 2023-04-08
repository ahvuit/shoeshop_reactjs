import { Button, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";

const RegisterForm = (props) => {
  const { onFinish, onFinishFailed } = props;
  return (
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
  );
};
export default RegisterForm;
