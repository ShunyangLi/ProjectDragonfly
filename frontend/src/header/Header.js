import React from 'react';
import { Menu, Icon } from 'antd';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { withRouter } from "react-router-dom"

const { Header} = Layout;

class Headers extends React.Component{
    // current states
    state = {
        current: 'home'
    };
    constructor(props) {
        super(props);
        if (props.state) {
            this.state = {
                current: props.state
            }
        }
    }

    handClick = e => {
        this.setState({
            current: e.key
        });
        if (e.key === 'home') {
            this.props.history.push("/");
        } else {
            this.props.history.push("/" + e.key);

        }
    };


    render() {
        return(
            <Layout className="layout">
                <Header>
                    <Menu onClick={this.handClick} selectedKeys={[this.state.current]} mode="horizontal" theme="dark" style={{ lineHeight: '64px' }}>
                        <Menu.Item key="home">
                            <Icon type="home" />
                            Home
                        </Menu.Item>

                        <Menu.Item key="upload">
                            <Icon type="upload" />
                            Upload File
                        </Menu.Item>
                    </Menu>
                </Header>
            </Layout>
        )
    }
}


export default withRouter(Headers);

