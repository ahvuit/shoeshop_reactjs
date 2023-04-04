import React, { useEffect } from "react";
import { Button, Modal, Form, Input, Select, message as msg } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { insertUser } from "../../actions/user";

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: "${label} is required",
};
const ProductModal = (props) => {
  const { openModal1, setOpenModal1 } = props;
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);

  const [form] = Form.useForm();
  const handleSubmit = (values) => {
    const iUser = { ...values, userId: null, password: "000000" };
    dispatch(insertUser(iUser))
      .then(() => {
        setOpenModal1(false);
        msg.success("Thêm mới nhân viên thành công");
      })
      .catch(() => {});
  };
  useEffect(() => {
    if (error) {
      msg.error(error);
    }
  }, [error]);

  return (
    <>
      <Modal
        title="Thêm mới nhân viên"
        centered
        open={openModal1}
        onOk={() => setOpenModal1(false)}
        onCancel={() => {
          setOpenModal1(false);
        }}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          validateMessages={validateMessages}
        >
          <Form.Item hidden name="userId">
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, type: "email", message: "Vui lòng nhập email" },
            ]}
          >
            <Input placeholder="Email..." />
          </Form.Item>
          <Form.Item
            style={{ width: "30vw" }}
            name="utype"
            label="Phân quyền"
            rules={[{ required: true }]}
          >
            <Select placeholder="Chọn phân quyền cho tìa khoản">
              <Select.Option value={"ADM"}>Admin</Select.Option>
              <Select.Option value={"STF"}>Staff</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              style={{ background: "var(--primary-color)" }}
              type="primary"
              htmlType="submit"
            >
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ProductModal;
