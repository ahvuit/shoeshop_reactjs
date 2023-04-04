import { useState } from "react";
import axios from "axios";
import {
  Modal,
  Upload,
} from "antd";
import {
  PlusOutlined,
} from "@ant-design/icons";
const ImageUpload = (props)=>{
  const {setFileList,fileList,setImage,image} = props;
  const [previewOpen, setPreviewOpen] = useState(false);
  
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    setPreviewImage(file.url || image);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: File }) => {
    setFileList(File);
    // const File=newFileList;
    // const data1 = upload(File[0].originFileObj);
    upload(File[0].originFileObj);
   // setImage(data1);

    // setImage( URL.createObjectURL(File[0].originFileObj))
  };
  const upload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "itv6446o");
    formData.append("folder", "ShoesShop_Reactjs");
    let data = "";
    await axios
      .post("https://api.cloudinary.com/v1_1/dmzfbmf2b/image/upload", formData)
      .then((response) => {
        data = response.data["secure_url"];
      });
    setImage(data);
    //return data;
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Tải hình ảnh
      </div>
    </div>
  );
  return(
    <><Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      listType="picture-card"
      fileList={fileList}
      onPreview={handlePreview}
      onChange={handleChange}
    >
      {fileList?.length >= 1 ? null : uploadButton}
    </Upload><Modal
      open={previewOpen}
      title={previewTitle}
      footer={null}
      onCancel={handleCancel}
    >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage} />
      </Modal></>
  )
}
export default ImageUpload