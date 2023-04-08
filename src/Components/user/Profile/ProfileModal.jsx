import React, { useEffect, useState } from "react";
import { Space, Button, Modal, Form, Input, message as msg } from "antd";
import { useDispatch, useSelector } from "react-redux";

import ImageUpload from "../../Common/ImageUpload";
import { updateProfile } from "../../../actions/profile";

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: "${label} is required",
};
const ProfileModal = (props) => {
  const { openModal, setOpenModal, profile } = props;
  const { error } = useSelector((state) => state.brand);
  const [image, setImage] = useState("");

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    if (Object.keys(profile).length !== 0) {
      setImage(profile.imageUrl);
    }
  }, [profile]);

  useEffect(() => {
    if (Object.keys(profile).length !== 0) {
      form.setFieldsValue(profile);
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: `${image}`,
        },
      ]);
    } else if (image === "") {
      form.resetFields();
      setFileList([]);
    }
  }, [form, profile, image]);

  const handleSubmit = (values) => {
    const uProfile = { ...values, imageUrl: image };
    dispatch(updateProfile(values.userId, uProfile))
      .then(() => {
        setOpenModal(false);
        msg.success("Cập nhật thông tin cá nhân thành công");
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (error) {
      msg.error(error);
    }
  }, [error]);

  const [fileList, setFileList] = useState([]);

  return (
    <>
      <Modal
        title="Cập nhật thông tin"
        centered
        open={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => {
          setOpenModal(false);
        }}
        footer={null}
      >
        <Form
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
        </Form>
      </Modal>
    </>
  );
};
export default ProfileModal;
