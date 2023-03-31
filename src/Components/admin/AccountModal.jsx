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

// import ImageUpload from "../ImageUpload";
import { insertUser } from "../../actions/user";

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: "${label} is required",
};
const ProductModal = (props) => {
  const { openModal1, setOpenModal1 } = props;
//   const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);

  
  const [form] = Form.useForm();

//   useEffect(() => {
//     if (Object.keys(product).length !== 0) {
//       setImage(product.image);
//     }
//   }, [product]);

//   useEffect(() => {
//     // console.log('imgg: ', image);
//     if (Object.keys(product).length !== 0) {
//       form.setFieldsValue(product);
//       setFileList([
//         {
//           uid: "-1",
//           name: "image.png",
//           status: "done",
//           url: `${image}`,
//         },
//       ]);
//     }else if(image!==''){} else {
      
//     //  console.log('imgg: ',image);
//       form.resetFields();
//       setFileList([]);
//     }
//   }, [form, product, image]);
  const handleSubmit = (values) => {
    const iUser={ ...values,userId:null,password:'000000'};
    console.log("value: ", { ...values,userId:null,password:'000000'});
    dispatch(insertUser(iUser))
        .then(() => {
          setOpenModal1(false);
          msg.success("Insert User successful");
        })
        .catch(() => {});
  };
  useEffect(() => {
    if (error) {
      msg.error(error);
    }
  }, [error]);
  // const [fileList, setFileList] = useState([]);

  return (
    <>
      <Modal
        title="Modal 1000px width"
        centered
        open={openModal1}
        onOk={() => setOpenModal1(false)}
        onCancel={() => {
          setOpenModal1(false);
          //setImage('')
        }}
        footer={null}
        //width={1000}
      >
        <Form
          //disabled={action === "see"}
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          validateMessages={validateMessages}
        >
          <Form.Item hidden name="userId" >
            <Input disabled />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true,type: "email", message: "Please enter email" }]}>
            <Input placeholder='Enter your email...'/>
          </Form.Item>
          
    
         
            <Form.Item
              style={{ width: "30vw" }}
              name="utype"
              label="Role"
              rules={[{ required: true }]}
            >
              <Select placeholder='Choose the role'>
                <Select.Option value={'ADM'}>Admin</Select.Option>
                <Select.Option value={'STF'}>Staff</Select.Option>
              </Select>
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
export default ProductModal;