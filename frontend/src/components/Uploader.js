import React, { useState } from "react";
import reqwest from "reqwest";
import { Button, Modal, Select, Upload, Icon, message } from "antd";
const { Dragger } = Upload;
const { Option } = Select;

export const Uploader = prop => {
  const [visible, setVisible] = useState(false);
  const handleCloseModal = () => setVisible(false);
  const [confirmLoading, setconfirmLoading] = useState(false);
  const [select_value, setSelectValue] = useState("english");
  const [fileList, setfileList] = useState([]);
  const [uploading, setUploading] = useState(true);
  const [res, setRes] = useState([]);
  const props = {
    onRemove: file => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setfileList(newFileList);
    },
    beforeUpload: file => {
      setfileList([...fileList, file]);
      return false;
    },
    fileList
  };
  const handleUpload = () => {
    // handle the upload file
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append("file", file);
    });
    formData.append("language", select_value.toString());
    setUploading(true);
    // You can use any AJAX library you like
    reqwest({
      url: "http://127.0.0.1:5000/upload/",
      method: "POST",
      data: formData,
      contentType: false,
      cache: false,
      processData: false,
      mimeTypes: "multipart/form-data",
      success: res => {
        console.log(res);
        setfileList([]);
        setUploading(false);
        setVisible(false);
        props.handleRes(res.res);
        message.success("Your file upload success");
      },
      error: () => {
        setUploading(false);
        message.error("Your file upload failed.");
      }
    });
  };
  const handleSelect = value => {
    setSelectValue(value);
  };

  const showModal = () => {
    setVisible(true);
  };

  return (
    <Modal
      title="Title"
      visible={visible}
      onOk={handleCloseModal}
      confirmLoading={confirmLoading}
      onCancel={handleCloseModal}
    >
      <Select
        defaultValue="english"
        style={{ width: "100%", marginBottom: "2%" }}
        onChange={handleSelect}
      >
        <Option value="english">english</Option>
        <Option value="chinese">chinese</Option>
      </Select>

      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>
      <Button
        size={"large"}
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16, width: "100%" }}
      >
        {uploading ? "Uploading" : "Start Upload"}
      </Button>
    </Modal>
  );
};
