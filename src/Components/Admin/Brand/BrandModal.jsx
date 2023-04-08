import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, message as msg } from "antd";
import { useDispatch, useSelector } from "react-redux";

import ImageUpload from "../../Common/ImageUpload";
import { insertBrand, updateBrand } from "../../../actions/brand";

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: "${label} is required",
};
const BrandModal = (props) => {
  const { openModal, setOpenModal, brands, action } = props;
  const { error } = useSelector((state) => state.brand);
  const [image, setImage] = useState("");
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    if (Object.keys(brands).length !== 0) {
      setImage(brands.logo);
    }
  }, [brands]);

  useEffect(() => {
    if (Object.keys(brands).length !== 0) {
      form.setFieldsValue(brands);
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
  }, [form, brands, image]);
  const handleSubmit = (values) => {
    if (action === "add") {
      const iCategory = { ...values, brandId: null, logo: image };
      dispatch(insertBrand(iCategory))
        .then(() => {
          setOpenModal(false);
          msg.success("Thêm hãng mới thành công");
        })
        .catch(() => {
          msg.error("Đã xảy ra lỗi, vui lòng thử lại sau");
        });
    } else if (action === "edit") {
      const { brandId } = values;
      const uBrand = { ...values, logo: image };
      dispatch(updateBrand(brandId, uBrand))
        .then(() => {
          setOpenModal(false);
          msg.success("Cập nhật hãng thành công");
        })
        .catch(() => {
          msg.error("Đã xảy ra lỗi, vui lòng thử lại sau");
        });
    }
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
        title={
          action === "add"
            ? `Thêm hãng mới`
            : action === "edit"
            ? `Chỉnh sửa hãng "${brands.brandId}"`
            : `Thông tin hãng "${brands.brandId}"`
        }
        centered
        open={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => {
          setImage("");
          setOpenModal(false);
        }}
        footer={null}
      >
        <Form
          disabled={action === "see"}
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          validateMessages={validateMessages}
        >
          <Form.Item name="brandId" label="Mã hãng">
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="brandName"
            label="Tên hãng"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="information"
            label="Thông tin hãng"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>

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
export default BrandModal;
