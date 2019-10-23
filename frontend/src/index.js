import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import React from "react";
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Headers from "./Header/Header";
import Uploads from "./Upload/Uploads"

const routing = (
    <Router>
        <div>
            <Route exact path="/" component={Headers}/>
            <Route path="/upload" component={Uploads}/>
        </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
