import './index.css';
import React from 'react';
import Headers from "../header/Header";
import GetData from "../FetchData/Fetch";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "id": 1,
            "text_input":"",
            res: []
        };
        if (props.match.params.id) {
            this.setState({
                "id": props.match.params.id
            })
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleChange(e) {
        // record changes in textbox to state
        this.setState({"text_input":e.currentTarget.textContent});
        //console.log(this.state.text_input);
    }
    
    handleClick() {
        // send the text to backend!
        //alert(this.state.text_input);
        const axios = require('axios');
        axios.get('http://127.0.0.1:5000/textarea/', {
            params: {
                "text": this.state.text_input
            }
        }).then(res => {
            this.setState({
                res: res.data.res
            });
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <Headers />
                <div className="container">
                    <div className="intro">
                        {this.state.res.map(words => (
                            <SwitchWord key={words.word} {...words} />
                        ))}
                    </div>
                    <div className="word_container" contentEditable={true} suppressContentEditableWarning={true}  onKeyDown={this.handleChange}>
                        <GetData id={this.state.id}/>
                    </div>
                    <button type="button" className="ant-btn" onClick={this.handleClick}><span>Highlight my text!</span></button>
                </div>
            </div>
        )
    }
}

const SwitchWord = props => {
    var type = props.type;
    var word = props.word;

    switch (type) {
        case (type.match(/^VB*/) || {}).input:
            return (<font className="Verb">{word} </font>);
        case (type.match(/^NN*/) || {}).input:
            return (<font className="Noun">{word} </font> );
        case (type.match(/^RB*/) || {}).input:
            return (<font className="Adverb">{word} </font>);
        case (type.match(/^DT/) || {}).input:
            return (<font className="Determiner">{word} </font>);
        case (type.match(/^UH/) || {}).input:
            return (<font className="Interjection">{word} </font>);
        case (type.match(/^RP/) || {}).input:
            return (<font className="Particle">{word} </font>);
        case (type.match(/^CC/) || {}).input:
            return (<font className="Conjunction">{word} </font>);
        case (type.match(/^JJ*/) || {}).input:
            return (<font className="Adjective">{word} </font>);
        default:
            return (<font className="Unknown">{word} </font>)
    }
};

export default Home;
