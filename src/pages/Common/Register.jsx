import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message as msg } from "antd";

import { register } from "../../actions/auth";
import RegisterForm from "../../Components/Auth/RegisterForm";
import { clearMessage } from "../../actions/message";
const Register = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.message);

  const onFinish = (values) => {
    //dispatch(clearMessage()).then(()=>{}).catch(()=>{})
    values.password.trim() !== values.rePassword.trim()
      ? msg.warning("confirmation password does not match")
      : dispatch(register(values.username.trim(), values.password.trim()))
          .then(() => {
            msg.success("Đăng ký thành công");
            navigate("/login");
          })
          .catch(() => {
            msg.error('Đăng ký không thành công')
            
          });
  };
 
  const onFinishFailed = () => {};

  return (
    <div className="appBg">
      <RegisterForm onFinish={onFinish} onFinishFailed={onFinishFailed} />
    </div>
  );
};
export default Register;
