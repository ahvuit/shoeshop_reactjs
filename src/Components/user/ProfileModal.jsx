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
import { updateProfile } from "../../actions/profile";

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: "${label} is required",
};
const ProfileModal = (props) => {
  const { openModal, setOpenModal, profile} = props;
//   const { brand } = useSelector((state) => state.brand);
  const { error} = useSelector((state) => state.brand);
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
    } else if(image===''){
      form.resetFields();
      setFileList([]);
    }
  }, [form, profile, image]);
  const handleSubmit = (values) => {
    console.log("value: ", { ...values, imageUrl: image });
    const uProfile = {...values,imageUrl:image}
        // const { brandId, ...rest } = values;
        // const uBrand = {...values,logo:image}
        dispatch(updateProfile(values.profileId, uProfile))
          .then(() => {
            setOpenModal(false);
            msg.success("Update profile successful");
          })
          .catch(() => {});
        //console.log('heheheh');
      
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
            
            
            setOpenModal(false);
            
          
        }}
        footer={null}
        // width={1000}
      >
        <Form
          //disabled={action === "see"}
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          validateMessages={validateMessages}
        >
          <Form.Item name="profileId" label="Profile Id">
            <Input disabled />
          </Form.Item>
          <Space>
            
          <Form.Item name="firstName" label="First Name" >
            <Input placeholder="Enter your first name ..."/>
          </Form.Item>
          <Form.Item name="lastName" label="Last Name"  >
            <Input placeholder="Enter your last name ..."/>
          </Form.Item>
          </Space>
          <Form.Item name="address" label="Address"  >
            <Input.TextArea placeholder="Enter your address ..."/>
          </Form.Item>
          <Form.Item name="phone" label="Phone"  rules={[
            
              {
                pattern: /^[0-9]{10,11}$/,
                message: "Please type a valid phone number!",
              },
            ]}  >
            <Input placeholder="Enter your phone ..."/>
          </Form.Item>
          <Form.Item name="userId" hidden>
            <Input  placeholder="Enter your phone ..."/>
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
export default ProfileModal;