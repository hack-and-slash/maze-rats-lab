import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import App from './App';

ReactDOM.render(
    <Router>
        <Route path="/" render={(props) => <App params={props} />
        } />
        
    </Router>
, document.getElementById('root'));
