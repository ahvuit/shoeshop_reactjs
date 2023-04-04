import React, { useEffect, useState } from "react";
import {
  Space,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
  message as msg,
} from "antd";
import { useDispatch, useSelector } from "react-redux";

import ImageUpload from "../ImageUpload";
import moment from "moment";
import { updateSale, insertSale } from "../../actions/sale";

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: "${label} is required",
};

const SaleModal = (props) => {
  const { openModal, setOpenModal, sale, action } = props;
  const [startDay, setStartDay] = useState(moment(sale.startDay));
  const [endDay, setEndDay] = useState(moment(sale.endDay));
  const [createdDate, setCreatedDate] = useState(null);
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.sale);
  const [form] = Form.useForm();

  useEffect(() => {
    setStartDay(moment(sale.startDay));
    setEndDay(moment(sale.endDay));
    if (sale.createdDate !== null) {
      setCreatedDate(moment(sale.createdDate));
    } else {
      setCreatedDate(null);
    }
  }, [sale]);

  useEffect(() => {
    if (Object.keys(sale).length !== 0) {
      setImage(sale.banner);
    }
  }, [sale]);

  useEffect(() => {
    if (Object.keys(sale).length !== 0) {
      form.setFieldsValue(sale);
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: `${image}`,
        },
      ]);
    } else if (image === "") {
      setStartDay(null);
      setEndDay(null);
      setCreatedDate(null);
      form.resetFields();
      setFileList([]);
    }
  }, [form, sale, image]);

  const handleSubmit = (values) => {
    if (action === "edit") {
      const eSale = {
        ...values,
        banner: image,
        startDay: startDay.format("YYYY-MM-DD"),
        endDay: endDay.format("YYYY-MM-DD"),
        createdDate: sale.createdDate,
      };
      const { salesId } = eSale;

      dispatch(updateSale(salesId, eSale))
        .then(() => {
          setOpenModal(false);
          msg.success("Cập nhật chương trình thành công");
        })
        .catch(() => {
          msg.error("Đã xảy ra lỗi, vui lòng thử lại sau");
        });
    } else if (action === "add") {
      const iSale = {
        ...values,
        banner: image,
        salesId: null,
        startDay: startDay.format("YYYY-MM-DD"),
        endDay: endDay.format("YYYY-MM-DD"),
        createdDate: null,
      };
      dispatch(insertSale(iSale))
        .then(() => {
          setOpenModal(false);
          msg.success("Thêm mới chương trình thành công");
        })
        .catch(() => {});
    }
  };

  const handleStartDayChange = (date) => {
    setStartDay(date);
  };

  const handleEndDayChange = (date) => {
    setEndDay(date);
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
            ? "Thêm chương trình khuyến mãi"
            : action === "edit"
            ? `Chỉnh sửa chương trình "${sale.salesId}"`
            : `Thông tin chuoinwg trình khuyến mãi`
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
          <Form.Item name="salesId" label="Mã chương trình">
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="salesName"
            label="Tên chương trình"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="content"
            label="Nội dung chương trình"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Space>
            <Form.Item
              name="percent"
              label="Phần trăm khuyến mãi (%)"
              rules={[{ required: true }]}
            >
              <InputNumber step={0.01} />
            </Form.Item>
            <Form.Item label="Ngày tạo">
              <DatePicker disabled value={createdDate} />
            </Form.Item>
          </Space>
          <Space>
            <Form.Item label="Ngày bắt đầu" rules={[{ required: true }]}>
              <DatePicker value={startDay} onChange={handleStartDayChange} />
            </Form.Item>
            <Form.Item label="Ngày kết thúc" rules={[{ required: true }]}>
              <DatePicker value={endDay} onChange={handleEndDayChange} />
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
            <Form.Item hidden={action === "see"}>
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
export default SaleModal;
