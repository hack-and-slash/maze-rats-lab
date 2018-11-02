import React, {Fragment} from 'react';
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import GlobalStyles from './assets/global-styles.js'

ReactDOM.render(
    <Fragment>
        <GlobalStyles/>
        <Router basename="/maze-rats-lab">
            <Fragment>
                <Route exact path="/" render={() => <Redirect to="/character"/>}/>
                <App/>
            </Fragment>
        </Router>
    </Fragment>
, document.getElementById('root'));
