import './index.css';
import React from 'react';
import Headers from "../header/Header";
import GetData from "../FetchData/Fetch";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "id": 1
        };
        if (props.match.params.id) {
            this.setState({
                "id": props.match.params.id
            })
        }
    }

    render() {
        return (
            <div>
                <Headers />
                <div className="container">
                    <div className="intro">
                        Hello this is introduction
                    </div>
                    <div className="word_container" contentEditable={true} suppressContentEditableWarning={true} >
                        <GetData id={this.state.id}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;
