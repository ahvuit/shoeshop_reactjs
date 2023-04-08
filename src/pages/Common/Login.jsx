import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { message as msg } from "antd";

import { login } from "../../actions/auth";
import LoginForm from "../../Components/Auth/LoginForm";
import { clearMessage } from "../../actions/message";

const Login = () => {
  let navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(login(values.email.trim(), values.password.trim()))
      .then(() => {
        msg.success("Đăng nhập thành công");
        navigate("/");
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
    return <Navigate to="/" />;
  }

  return (
    <div className="appBg">
      <LoginForm onFinish={onFinish} onFinishFailed={onFinishFailed} />
    </div>
  );
};
export default Login;
