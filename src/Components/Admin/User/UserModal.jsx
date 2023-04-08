import React, { useEffect, useState } from "react";
import { Space, Button, Modal, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";

import ImageUpload from "../../Common/ImageUpload";
import { getProfile } from "../../../actions/profile";

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: "${label} is required",
};

const UserModal = (props) => {
  const { openModal, setOpenModal, action1, user } = props;
  const { profile } = useSelector((state) => state.profile);
  const [image, setImage] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      dispatch(getProfile(user?.userId))
        .then(() => {})
        .catch(() => {});
    }
  }, [dispatch, user, user?.userId]);

  const [form] = Form.useForm();

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      if (Object.keys(profile).length !== 0) {
        setImage(profile.imageUrl);
      }
    }
  }, [profile, user]);

  useEffect(() => {
    if (Object.keys(profile).length !== 0) {
      if (Object.keys(user).length !== 0) {
        form.setFieldsValue(profile);
        setFileList([
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: `${image}`,
          },
        ]);
      }
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [form, profile, image, user]);

  const [fileList, setFileList] = useState([]);

  return (
    <>
      <Modal
        title="Thông tin tài khoản"
        centered
        open={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => {
          setOpenModal(false);
        }}
        footer={null}
      >
        <Form
          disabled
          form={form}
          layout="vertical"
          validateMessages={validateMessages}
        >
          <Form.Item name="userId" label="Mã tài khoản">
            <Input disabled />
          </Form.Item>
          <Form.Item name="profileId" label="Profile Id">
            <Input disabled />
          </Form.Item>
          <Space>
            <Form.Item
              name="firstName"
              label=" Tên"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="lastName" label=" Họ" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Space>
          <Form.Item name="address" label="Địa chỉ">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="phone" label="Số điện thoại">
            <Input />
          </Form.Item>
          <Form.Item disabled={action1 === "see"}>
            <ImageUpload
              setFileList={setFileList}
              fileList={fileList}
              image={image}
              setImage={setImage}
            />
          </Form.Item>
          {action1 !== "see" ? (
            <Form.Item>
              <Button
                style={{ background: "var(--primary-color)" }}
                type="primary"
                htmlType="submit"
              >
                Lưu
              </Button>
            </Form.Item>
          ) : (
            ""
          )}
        </Form>
      </Modal>
    </>
  );
};
export default UserModal;
