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
  message as msg
} from "antd";
import { useDispatch, useSelector } from "react-redux";

import ImageUpload from "../ImageUpload";
import { insertBrand,updateBrand } from "../../actions/brand";

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: "${label} is required",
};
const BrandModal = (props) => {
  const { openModal, setOpenModal, brands,setBrands , action } = props;
//   const { brand } = useSelector((state) => state.brand);
  const { error} = useSelector((state) => state.brand);
  const [image, setImage] = useState("");
  const dispatch = useDispatch();

 
  const [form] = Form.useForm();

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
    } else if(image===''){
      form.resetFields();
      setFileList([]);
    }
  }, [form, brands, image]);
  const handleSubmit = (values) => {
    console.log("value: ", { ...values, logo: image });
    if (action === "add") {
        const iCategory = { ...values, brandId: null ,logo:image };
        dispatch(insertBrand(iCategory))
          .then(() => {
            setOpenModal(false);
            msg.success("Insert brand successful");
          })
          .catch(() => {});
      } else if (action === "edit") {
        const { brandId, ...rest } = values;
        const uBrand = {...values,logo:image}
        dispatch(updateBrand(brandId, uBrand))
          .then(() => {
            setOpenModal(false);
            msg.success("Update category successful");
          })
          .catch(() => {});
        console.log('heheheh');
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
        title="Modal 1000px width"
        centered
        open={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => {
            
            setImage('');
            setOpenModal(false);
            
          
        }}
        footer={null}
        // width={1000}
      >
        <Form
          disabled={action === "see"}
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          validateMessages={validateMessages}
        >
          <Form.Item name="brandId" label="Brand Id">
            <Input disabled />
          </Form.Item>
          <Form.Item name="brandName" label="Brand Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="information" label="Information" rules={[{ required: true }]}>
            <Input.TextArea />
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
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default BrandModal;
