import React, { useEffect } from "react";
import { Button, Modal, Form, Input, message as msg } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { insertCategory, updateCategory } from "../../actions/category";

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: "${label} is required",
};

const CategoryModal = (props) => {
  const { openModal, setOpenModal, category, action } = props;
  const { error } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  useEffect(() => {
    if (Object.keys(category).length !== 0) {
      form.setFieldsValue(category);
    } else {
      form.resetFields();
    }
  }, [category, form]);
  const handleSubmit = (values) => {
    if (action === "add") {
      const iCategory = { ...values, categoryId: null };
      dispatch(insertCategory(iCategory))
        .then(() => {
          setOpenModal(false);
          msg.success("Insert category successful");
        })
        .catch(() => {});
    } else if (action === "edit") {
      const { categoryId, ...rest } = values;
      dispatch(updateCategory(categoryId, rest))
        .then(() => {
          setOpenModal(false);
          msg.success("Update category successful");
        })
        .catch(() => {});
    }
  };
  useEffect(() => {
    if (error) {
      msg.error(error);
    }
  }, [error]);
  return (
    <>
      <Modal
        centered
        open={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        footer={null}
        title="20px to Top"
        style={{ top: 20 }}
      >
        <Form
          disabled={action === "see"}
          form={form}
          layout="vertical"
          //   initialrest={product}
          onFinish={handleSubmit}
          validateMessages={validateMessages}
        >
          <Form.Item name="categoryId" label="Category Id">
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="categoryName"
            label="Category Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button
              style={{ background: "var(--primary-color)" }}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default CategoryModal;
