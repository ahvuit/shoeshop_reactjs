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
  message as msg,
} from "antd";
import { useDispatch, useSelector } from "react-redux";

import ImageUpload from "../../Common/ImageUpload";
import { getAllCategories } from "../../../actions/category";
import { getAllBrands } from "../../../actions/brand";
import { insertProduct, updateProduct } from "../../../actions/product";

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: "${label} is required",
};
const ProductModal = (props) => {
  const { open, setOpen, product, action } = props;
  const { categories } = useSelector((state) => state.category);
  const { brand } = useSelector((state) => state.brand);
  const { user } = useSelector((state) => state.auth);
  const [image, setImage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories())
      .then(() => {})
      .catch(() => {});
    dispatch(getAllBrands())
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
    } else if (image !== "") {
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [form, product, image]);

  const handleSubmit = (values) => {
    if (action === "add") {
      const b = {
        ...values,
        rate: 0,
        productId: null,
        image: image,
        createdDate: null,
        dateUpdated: null,
        updateBy: user.userId,
      };
      dispatch(insertProduct(b))
        .then(() => {
          setOpen(false);
          msg.success("Insert product successful");
        })
        .catch((e) => {});
    } else if (action === "edit") {
      const b = {
        ...values,
        rate: product.rate,
        image: image,
        createdDate: null,
        dateUpdated: null,
        updateBy: null,
      };
      dispatch(updateProduct(b.productId, b))
        .then(() => {
          setOpen(false);
          msg.success("Update product successful");
        })
        .catch(() => {});
    }
  };

  const [fileList, setFileList] = useState([]);

  return (
    <>
      <Modal
        title={
          action === "add"
            ? "Thêm sản phẩm"
            : action === "edit"
            ? "Chỉnh sửa sản phẩm"
            : "Thông tin sản phẩm"
        }
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => {
          setOpen(false);
          setImage("");
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
          <Form.Item name="productId" label="Mã sản phẩm">
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="name"
            label="Tên sản phẩm"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Mô tả  ">
            <Input.TextArea />
          </Form.Item>
          <Space>
            <Form.Item
              style={{ width: "30vw" }}
              name="brandId"
              label="Hãng"
              rules={[{ required: true }]}
            >
              <Select placeholder="Chọn hãng">
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
              label="Danh mục"
              rules={[{ required: true }]}
            >
              <Select placeholder="Chọn danh mục">
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
              label="Đã bán"
              rules={[{ required: true }]}
            >
              <InputNumber  min={0} />
            </Form.Item>
            <Form.Item
              name="stock"
              label="Tồn kho"
              rules={[{ required: true }]}
            >
              <InputNumber  min={0} />
            </Form.Item>
            <Form.Item name="price" label="Giá" rules={[{ required: true }]}>
              <InputNumber min={0} />
            </Form.Item>
          </Space>
          <Form.Item name="rate" label="Đánh giá">
            <Rate disabled count={5} />
          </Form.Item>
          <Space>
            <Form.Item
              style={{ width: "30vw" }}
              name="productNew"
              label="Sản phẩm mới?"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value={true}>Mới</Select.Option>
                <Select.Option value={false}>Cũ</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              style={{ width: "30vw" }}
              name="active"
              label="Tình trạng sản phẩm"
              rules={[{ required: true }]}
            >
              <Select placeholder="Chọn tình trạng sản phẩm">
                <Select.Option value={true}>Đang kinh doanh</Select.Option>
                <Select.Option value={false}>Ngừng kinh doanh</Select.Option>
              </Select>
            </Form.Item>
          </Space>
          <ImageUpload
            setFileList={setFileList}
            fileList={fileList}
            image={image}
            setImage={setImage}
          />
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
export default ProductModal;
