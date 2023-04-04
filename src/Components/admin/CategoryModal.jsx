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
  const [form] = Form.useForm();
  const dispatch = useDispatch();

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
          msg.success("Thêm danh mục mới thành công!");
        })
        .catch(() => {});
    } else if (action === "edit") {
      const { categoryId, ...rest } = values;
      dispatch(updateCategory(categoryId, rest))
        .then(() => {
          setOpenModal(false);
          msg.success("Cập nhật danh mục thành công");
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
        title={
          action === "add"
            ? "Thêm mới danh mục"
            : action === "edit"
            ? `Chỉnh sửa danh mục "${category.categoryId}" `
            : `Thông tin danh mục "${category.categoryId}"`
        }
        style={{ top: 20 }}
      >
        <Form
          disabled={action === "see"}
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          validateMessages={validateMessages}
        >
          <Form.Item name="categoryId" label="Mã danh mục">
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="categoryName"
            rules={[{ required: true }]}
            label="Tên danh mục"
          >
            <Input />
          </Form.Item>
          {action === "see" ? (
            ""
          ) : (
            <Form.Item>
              <Button
                style={{ background: "var(--primary-color)" }}
                type="primary"
                htmlType="submit"
              >
                Lưu
              </Button>
            </Form.Item>
          )}
        </Form>
      </Modal>
    </>
  );
};
export default CategoryModal;
