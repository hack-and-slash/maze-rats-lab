import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import "./i18n";

ReactDOM.render(
    <Router basename="/maze-rats-lab">
        <Fragment>
            <Route exact path="/" render={() => <Redirect to="/character"/>}/>
            <App/>
        </Fragment>
    </Router>
, document.getElementById('root'));
