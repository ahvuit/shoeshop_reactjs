import React, { useEffect, useState } from "react";
import {
  Space,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Rate,
} from "antd";
import { useDispatch, useSelector } from "react-redux";

import ImageUpload from "../ImageUpload";
import { getAllCategories } from "../../actions/category";

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: "${label} is required",
};
const ProductModal = (props) => {
  const { open, setOpen, product, action } = props;
  const { brand } = useSelector((state) => state.brand);
  const { categories } = useSelector((state) => state.category);
  const [image, setImage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories())
      .then(() => {})
      .catch(() => {});
  }, [dispatch]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (Object.keys(product).length !== 0) {
      setImage(product.image);
    }
  }, [product]);

  useEffect(() => {
    if (Object.keys(product).length !== 0) {
      form.setFieldsValue(product);
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: `${image}`,
        },
      ]);
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [form, product, image]);
  const handleSubmit = (values) => {
    console.log("value: ", { ...values, image: image });
  };

  const [fileList, setFileList] = useState([]);

  return (
    <>
      <Modal
        title="Modal 1000px width"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => {
          setOpen(false);
        }}
        footer={null}
        width={1000}
      >
        <Form
          disabled={action === "see"}
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          validateMessages={validateMessages}
        >
          <Form.Item name="productId" label="Product Id">
            <Input disabled />
          </Form.Item>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
          <Space>
            <Form.Item
              style={{ width: "30vw" }}
              name="brandId"
              label="Brand"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select brand">
                {brand?.map((brand) => (
                  <Select.Option key={brand.brandId} value={brand.brandId}>
                    {brand.brandName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              style={{ width: "30vw " }}
              name="categoryId"
              label="Category ID"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select category">
                {categories?.map((category) => (
                  <Select.Option
                    key={category.categoryId}
                    value={category.categoryId}
                  >
                    {category.categoryName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Space>

          <Space>
            <Form.Item
              name="purchase"
              label="Purchase"
              rules={[{ required: true }]}
            >
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item name="price" label="Price" rules={[{ required: true }]}>
              <InputNumber min={0} />
            </Form.Item>
          </Space>
          <Form.Item name="rate" label="Rate">
            <Rate disabled count={5} />
          </Form.Item>
          <Space>
            <Form.Item
              style={{ width: "30vw" }}
              name="productNew"
              label="Product New"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value={true}>New</Select.Option>
                <Select.Option value={false}>Old</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              style={{ width: "30vw" }}
              name="active"
              label="Active"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value={true}>Active</Select.Option>
                <Select.Option value={false}>Inactive</Select.Option>
              </Select>
            </Form.Item>
          </Space>

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
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ProductModal;
