
// We have two type
// 1. Get default value
// 2. get correct value

// this is fetch the text data
import React from "react";

class GetData extends React.Component{
    static id = 1;

    constructor(props) {
        super(props);
        if (props.id) {
            GetData.id = props.id;
        }
        this.state = {
            res: []
        };
    }

    async componentDidMount() {
        const axios = require('axios');
        axios.get('http://127.0.0.1:5000/info/', {
            params: {
                "id": GetData.id
            }
        }).then(res => {
            this.setState({
                res: res.data.res
            });
            console.log(this.state.res[0]);
        }).catch(function (error) {
            console.log(error);
        });
        
    }
    
    render() {
        return(
            <div>
                {this.state.res.map(words => (
                    <SwitchWord key={words.word} {...words} />
                ))}
            </div>
        );
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


export default GetData;
