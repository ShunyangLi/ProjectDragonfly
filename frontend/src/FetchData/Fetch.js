
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
        }).catch(function (error) {
            console.log(error);
        });
    }
    render() {
        return(
            <div>
                {this.state.res.map(words => (
                    <Switch_word key={words.id}{...words} />
                ))}
            </div>
        );
    }
}


const Switch_word = props => {
    var type = props.type;
    var word = props.word;

    switch (type) {
        case (type.match(/^VB*/) || {}).input:
            return (<font class="Verb">{word} </font>);
        case (type.match(/^NN*/) || {}).input:
            return (<font class="Noun">{word} </font> );
        case (type.match(/^RB*/) || {}).input:
            return (<font class="Adverb">{word} </font>);
        case (type.match(/^DT/) || {}).input:
            return (<font class="Determiner">{word} </font>);
        case (type.match(/^UH/) || {}).input:
            return (<font class="Interjection">{word} </font>);
        case (type.match(/^RP/) || {}).input:
            return (<font class="Particle">{word} </font>);
        case (type.match(/^CC/) || {}).input:
            return (<font class="Conjunction">{word} </font>);
        case (type.match(/^JJ*/) || {}).input:
            return (<font class="Adjective">{word} </font>);
        default:
            return (<font class="Unknown">{word} </font>)
    }
};


export default GetData;
