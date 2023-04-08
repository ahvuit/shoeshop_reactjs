import React, { useEffect } from "react";
import {
  Space,
  Button,
  Modal,
  Form,
  Input,
  Select,
  message as msg,
} from "antd";
import { useDispatch, useSelector } from "react-redux";

import { getAllStatus } from "../../../actions/status";
import { updateOrder } from "../../../actions/order";

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: "${label} is required",
};
const OrderModal = (props) => {
  const { openModal, setOpenModal, order, action } = props;
  const { status } = useSelector((state) => state.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStatus())
      .then(() => {})
      .catch(() => {});
  }, [dispatch]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (Object.keys(order).length !== 0) {
      form.setFieldsValue(order);
    }
  }, [form, order]);

  const handleSubmit = (values) => {
    const { bookingDate, key, statusId, statusName, ...rest } = order;
    const eOrder = { ...rest, statusId: values.statusId };
    dispatch(updateOrder(eOrder.orderId, eOrder))
      .then(() => {
        setOpenModal(false);
        msg.success("Cập nhật đơn hàng thành công");
      })
      .catch(() => {
        msg.error("Đã xảy ra lỗi, vui lòng thử lại");
      });
  };

  return (
    <>
      <Modal
        title="Cập nhật đơn hàng"
        centered
        open={openModal}
        onOk={() => setOpenModal(false)}
        onCancel={() => {
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
          <Form.Item name="orderId" label="Mã đơn hàng">
            <Input disabled />
          </Form.Item>
          <Space>
            <Form.Item
              style={{ width: "30vw" }}
              name="statusId"
              label="Trạng thái"
              rules={[{ required: true }]}
            >
              <Select placeholder="Chọn trạng thái đơn hàng">
                {status?.map((s) => (
                  <Select.Option key={s.statusId} value={s.statusId}>
                    {s.statusName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Space>
          <Form.Item>
            <Button
              style={{ background: "var(--primary-color)" }}
              type="primary"
              htmlType="submit"
            >
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default OrderModal;
