import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import React from "react";
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Uploads from "./upload/Uploads"
import Home from "./Home/Home";
import UploadText from "./UploadText/UploadText";

const routing = (
    <Router>
        <div>
            <Route exact path="/" component={Home}/>
            <Route path="/info/:id" component={UploadText}/>
            <Route path="/upload" component={Uploads}/>
        </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
