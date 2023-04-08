import React, { useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  message as msg,
  Space,
} from "antd";
import { useDispatch } from "react-redux";

import { updateSizeTable } from "../../../actions/sizetable";

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: "${label} is required",
};

const SizeTableModal = (props) => {
  const { openModal, setOpenModal, sizeTable, action } = props;
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    if (Object.keys(sizeTable).length !== 0) {
      form.setFieldsValue(sizeTable);
    } else {
      form.resetFields();
    }
  }, [sizeTable, form]);

  const handleSubmit = (values) => {
    if (action === "edit") {
      const { name, image, ...rest } = values;
      const uSizeTable = { ...rest };
      //const { , ...rest } = values;
      dispatch(updateSizeTable(uSizeTable.sizeTableId, uSizeTable))
        .then(() => {
          setOpenModal(false);
          msg.success("Cập nhật bảng size của sản phẩm thành công");
        })
        .catch(() => {
          msg.error("Đã xảy ra lỗi, vui lòng thử lại");
        });
    }
  };
  return (
    <>
      <Modal
        centered
        open={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        footer={null}
        title={action === "edit" ? `Chỉnh sử bằng size` : "Thông tin bảng size"}
        style={{ top: 20 }}
      >
        <Form
          disabled={action === "see"}
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          validateMessages={validateMessages}
        >
          <Form.Item name="sizeTableId" hidden>
            <Input disabled />
          </Form.Item>
          <Form.Item name="productId" label="Mã sản phẩm">
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="name"
            label="Tên sản phẩm"
            rules={[{ required: true }]}
          >
            <Input disabled />
          </Form.Item>
          <Space>
            <Form.Item
              name="s38"
              label="Size 38"
              rules={[{ required: true, type: "number" }]}
            >
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item
              name="s39"
              label="Size 39"
              rules={[{ required: true, type: "number" }]}
            >
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item
              name="s40"
              label="Size 40"
              rules={[{ required: true, type: "number" }]}
            >
              <InputNumber min={0} />
            </Form.Item>
          </Space>
          <Space>
            <Form.Item
              name="s41"
              label="Size 41"
              rules={[{ required: true, type: "number" }]}
            >
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item
              name="s42"
              label="Size 42"
              rules={[{ required: true, type: "number" }]}
            >
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item
              name="s43"
              label="Size 43"
              rules={[{ required: true, type: "number" }]}
            >
              <InputNumber min={0} />
            </Form.Item>
          </Space>
          <Space>
            <Form.Item
              name="s44"
              label="Size 44"
              rules={[{ required: true, type: "number" }]}
            >
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item
              name="s45"
              label="Size 45"
              rules={[{ required: true, type: "number" }]}
            >
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item
              name="s46"
              label="Size 46"
              rules={[{ required: true, type: "number" }]}
            >
              <InputNumber min={0} />
            </Form.Item>
          </Space>
          <Space>
            <Form.Item
              name="s47"
              label="Size 47"
              rules={[{ required: true, type: "number" }]}
            >
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item
              name="s48"
              label="Size 48"
              rules={[{ required: true, type: "number" }]}
            >
              <InputNumber />
            </Form.Item>
          </Space>
          <Form.Item hidden={action === "see"}>
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
export default SizeTableModal;
