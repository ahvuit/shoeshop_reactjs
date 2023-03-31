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
import { getProfile } from "../../actions/profile";

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: "${label} is required",
};
const UserModal = (props) => {
  const { openModal, setOpenModal,action1, user } = props;
  console.log('u: ',user);
  const { profile } = useSelector((state) => state.profile);
//   const { categories } = useSelector((state) => state.category);
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if(Object.keys(user).length!==0){
    dispatch(getProfile(user?.userId))
      .then(() => {})
      .catch(() => {});}
  }, [dispatch, user?.userId])
  const [form] = Form.useForm();

  useEffect(() => {
    if(Object.keys(user).length!==0){
    if (Object.keys(profile).length !== 0) {
      setImage(profile.imageUrl);
    }}
  }, [profile]);

  useEffect(() => {
    // console.log('imgg: ', image);
    if (Object.keys(profile).length !== 0 ) {
      if(Object.keys(user).length!==0){
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
      
    }else {
      
    //  console.log('imgg: ',image);
      form.resetFields();
      setFileList([]);
    }
  }, [form, profile, image]);
//   const handleSubmit = (values) => {
//     console.log("value: ", { ...values, imageUrl: image });
//   };

  const [fileList, setFileList] = useState([]);

  return (
    <>
      <Modal
        title="Modal 1000px width"
        centered
       
        open={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => {
          //profile=[]
          setOpenModal(false);
          //setImage('')
        }}
        footer={null}
        // width={1000}
      >
        <Form
        disabled
          //disabled={action === "see"}
          form={form}
          layout="vertical"
          //onFinish={handleSubmit}
          validateMessages={validateMessages}
        >
          <Form.Item name="userId" label="User Id">
            <Input disabled />
          </Form.Item>
          <Form.Item name="profileId" label="Profile Id">
            <Input disabled />
          </Form.Item>
          <Space>

          <Form.Item name="firstName" label=" First Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="lastName" label=" Last Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          </Space>
          <Form.Item name="address" label="Address">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input />
          </Form.Item>
            <Form.Item
            disabled={action1==='see'}>
          <ImageUpload

setFileList={setFileList}
fileList={fileList}
image={image}
setImage={setImage}
/>
</Form.Item>
        {action1!=="see"?(<Form.Item>
            <Button
              style={{ background: "var(--primary-color)" }}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item> ):('')}
          
        </Form>
      </Modal>
    </>
  );
}; 
export default UserModal;
