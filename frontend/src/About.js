import React from 'react';

// function About() {
//     return (
//         <div className="App">
//             <h1>Hello this is me</h1>
//         </div>
//     );
// }

class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    componentDidMount() {
        console.log(this.props.match.params.id);
    }

    render() {
        return (
            <div className="App">
                <h1>Hello this is me {this.props.match.params.id}</h1>
            </div>
        )
    }
}

export default About;
