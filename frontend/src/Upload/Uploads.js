import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Upload, message, Icon } from 'antd';
import Headers from "../Header/Header";


const { Content} = Layout;
const { Dragger } = Upload;


const props = {
    name: 'file',
    multiple: false,
    action: 'http://127.0.0.1:5000/upload/',
    accept: 'application/pdf image/png text/plain',
    onChange(info) {
        const { status } = info.file;
        // check whether uploading
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        // check whether done
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }
};


class Uploads extends React.Component{
    render() {
        return (
            <Layout>
                <Headers />
                <Content style={{ padding: '100px',marginLeft: '350px', width: '700px'}}>
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            We only support one file and the size should smaller than 1MB
                        </p>
                    </Dragger>
                </Content>
            </Layout>
        )
    }
}

export default Uploads;
