import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Upload, message, Icon } from 'antd';
import Headers from "../header/Header";


const { Content} = Layout;
const { Dragger } = Upload;

let upload_id = 1;
const props = {
    name: 'file',
    multiple: false,
    action: 'http://127.0.0.1:5000/upload/',
    onChange(info){
        console.log(info);
        const { status } = info.file;
        // check whether uploading
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        // check whether done
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
            upload_id = info.file.response.id;
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed. Type not allowed or file more than 1MB`);
        }
    }
};


class Uploads extends React.Component{

    handClick = () => {
        if (upload_id === 1) {
            message.error("You have not upload files");
            return;
        }
        this.props.history.push('/info/'+upload_id);
    };

    render() {
        return (
            <Layout>
                <Headers state="upload"/>
                <Content style={{marginTop: '20%', marginBottom: '20%', marginLeft: '25%', marginRight: '25%'}}>
                    <button onClick={this.handClick}>Check text</button>
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
