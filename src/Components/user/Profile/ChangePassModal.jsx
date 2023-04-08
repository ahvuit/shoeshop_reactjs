import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, message as msg, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";

//import ImageUpload from "../../Common/ImageUpload";
import { changePass } from "../../../actions/user";

const ChangePassModal = (props) => {
  const { openModal1, setOpenModal1, profile } = props;
  const { error } = useSelector((state) => state.brand);
  const { error: e } = useSelector((state) => state.user);
  const [image, setImage] = useState("");

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    if (Object.keys(profile).length !== 0) {
      setImage(profile.imageUrl);
    }
  }, [profile]);
  useEffect(() => {
    if (e !== null) {
      msg.error(e);
    }
  }, [e]);

  useEffect(() => {
    if (Object.keys(profile).length !== 0) {
      form.setFieldsValue(profile);
    } else if (image === "") {
      form.resetFields();
    }
  }, [form, profile, image]);

  const handleSubmit = (values) => {
    if (values.password.trim() !== values.rePassword.trim()) {
      msg.warning("Confirmation password does not match");
    } else {
      const uProfile = {
        oldPassword: values.oldPassword,
        newPassword: values.password,
      };
      dispatch(changePass(profile?.userId, uProfile))
        .then(() => {
          msg.success("Đổi mật khẩu thành công");

          setOpenModal1(false);
          form.resetFields();
        })
        .catch(() => {});
    }
    // dispatch(register(values.username.trim(), values.password.trim()))
    //     .then(() => {
    //       msg.success("Đăng ký thành công");
    //       navigate("/login");
    //     })
    //     .catch(() => {
    //       ///msg.error(message);
    //     });

    // dispatch(updateProfile(values.userId, uProfile))
    //   .then(() => {
    //     setOpenModal1(false);
    //     msg.success("Cập nhật thông tin cá nhân thành công");
    //   })
    //   .catch(() => {});
  };

  useEffect(() => {
    if (error) {
      msg.error(error);
    }
  }, [error]);

  return (
    <>
      <Modal
        title="Cập nhật thông tin"
        centered
        open={openModal1}
        onOk={() => setOpenModal1(false)}
        onCancel={() => {
          setOpenModal1(false);
          form.resetFields();
        }}
        footer={null}
      >
        <Form
          form={form}
          // className="loginForm"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Typography.Title>Đổi mật khẩu</Typography.Title>

          <Form.Item
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu hiện tại" },
            ]}
            label="Mật khẩu hiện tại"
            name={"oldPassword"}
          >
            <Input.Password placeholder="Enter your current password" />
          </Form.Item>
          <Form.Item
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu hiện mới" },
            ]}
            label="Mật khẩu mới"
            name={"password"}
          >
            <Input.Password placeholder="Enter your new password" />
          </Form.Item>
          <Form.Item
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu xác nhận" },
            ]}
            label="(Re) Mật khẩu"
            name={"rePassword"}
          >
            <Input.Password placeholder="Enter confirm new password" />
          </Form.Item>
          <Button
            style={{
              marginBottom: 20,
            }}
            type="primary"
            htmlType="submit"
            block
          >
            Đổi mật khẩu
          </Button>
        </Form>
        {/* <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          validateMessages={validateMessages}
        >
          <Form.Item name="profileId" label="Profile Id">
            <Input disabled />
          </Form.Item>
          <Space>
            <Form.Item name="firstName" label="Tên">
              <Input placeholder="Nhập tên của bạn ..." />
            </Form.Item>
            <Form.Item name="lastName" label="Họ">
              <Input placeholder="Nhập họ của bạn ..." />
            </Form.Item>
          </Space>
          <Form.Item name="address" label="Địa chỉ">
            <Input.TextArea placeholder="Nhập địa chỉ của bạn..." />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Điện thoại"
            rules={[
              {
                pattern: /^[0-9]{10,11}$/,
                message: "Vui lòng nhập số điện thoại!",
              },
            ]}
          >
            <Input placeholder="Nhập số điện thoại của bạn  ..." />
          </Form.Item>
          <Form.Item name="userId" hidden>
            <Input placeholder="Enter your phone ..." />
          </Form.Item>
          <ImageUpload
            setFileList={setFileList}
            fileList={fileList}
            image={image}
            setImage={setImage}
          />
          <Form.Item>
            <Button
              style={{ background: "var(--primary-color)" }}
              type="primary"
              htmlType="submit"
            >
              Cập nhật
            </Button>
          </Form.Item>
        </Form> */}
      </Modal>
    </>
  );
};
export default ChangePassModal;
