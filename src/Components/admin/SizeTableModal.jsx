import React, { useEffect } from "react";
import { Button, Modal, Form, Input,InputNumber, message as msg, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { updateSizeTable } from "../../actions/sizetable";

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: "${label} is required",
};

const SizeTableModal = (props) => {
  const { openModal, setOpenModal, sizeTable, action } = props;
  //const { error } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  useEffect(() => {
    if (Object.keys(sizeTable).length !== 0) {
        console.log('data: ',sizeTable);
      form.setFieldsValue(sizeTable);
    } else {
      form.resetFields();
    }
  }, [sizeTable, form]);
  const handleSubmit = (values) => {
    // if (action === "add") {
    //   const iCategory = { ...values, categoryId: null };
    //   dispatch(insertCategory(iCategory))
    //     .then(() => {
    //       setOpenModal(false);
    //       msg.success("Insert category successful");
    //     })
    //     .catch(() => {});
    // } else 
    if (action === "edit") {
      const {name, image,...rest}= values;
    const uSizeTable ={...rest}
    console.log('v: ',uSizeTable );
      //const { , ...rest } = values;
      dispatch(updateSizeTable(uSizeTable.sizeTableId, uSizeTable))
        .then(() => {
          setOpenModal(false);
          msg.success("Update sizeTable successful");
        })
        .catch(() => {});
    }
    
  };
//   useEffect(() => {
//     if (error) {
//       msg.error(error);
//     }
//   }, [error]);
  return (
    <>
      <Modal
        centered
        open={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        footer={null}
        title="SizeTable"
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
            
          <Form.Item name="sizeTableId" hidden>
            <Input disabled/>
         </Form.Item>
          <Form.Item name="productId" label="Product Id">
            <Input disabled />
          </Form.Item>
          <Form.Item 
            name="name"
            label="Name"
            rules={[{ required: true }]}
          >
            <Input disabled />
          </Form.Item>
          <Space>

          <Form.Item 
            name="s38"
            label="S38"
            rules={[{ required: true , type:"number" }]} 
            >
            <InputNumber />
          </Form.Item>
          <Form.Item 
            name="s39"
            label="S39"
            rules={[{ required: true , type:"number" }]}
            >
            <InputNumber />
          </Form.Item>

          <Form.Item 
            name="s40"
            label="S40"
            rules={[{ required: true , type:"number" }]}
            >
            <InputNumber />
          </Form.Item>
                </Space>
          <Space>
          <Form.Item 
            name="s41"
            label="S41"
            rules={[{ required: true , type:"number" }]}
            >
            <InputNumber />
          </Form.Item>
              
          <Form.Item 
            name="s42"
            label="S42"
            rules={[{ required: true , type:"number" }]}
            >
            <InputNumber />
          </Form.Item>
          <Form.Item 
            name="s43"
            label="S43"
            rules={[{ required: true , type:"number" }]}
            >
            <InputNumber />
          </Form.Item>
              </Space>
              <Space>

          <Form.Item 
            name="s44"
            label="S44"
            rules={[{ required: true , type:"number" }]}
            >
            <InputNumber />
          </Form.Item>
          <Form.Item 
            name="s45"
            label="S45"
            rules={[{ required: true , type:"number" }]}
            >
            <InputNumber />
          </Form.Item>
          <Form.Item 
            name="s46"
            label="S46"
            rules={[{ required: true , type:"number" }]}
            >
            <InputNumber />
          </Form.Item>
              </Space>
              <Space>

          <Form.Item 
            name="s47"
            label="S47"
            rules={[{ required: true , type:"number" }]}
            >
            <InputNumber />
          </Form.Item>
          <Form.Item 
            name="s48"
            label="S48"
            rules={[{ required: true , type:"number" }]}
            >
            <InputNumber />
          </Form.Item>
              </Space>

          <Form.Item hidden ={action==='see'}>
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
export default SizeTableModal;