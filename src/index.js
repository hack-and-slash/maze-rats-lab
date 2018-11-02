import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import SpellGenerator from './SpellGenerator';

ReactDOM.render(
    <Router>
        <div>
            <Route path="/" exact render={(props) => <App params={props} />} />
            <Route path="/spell" render={(props) => <SpellGenerator params={props} />} />
        </div>

    </Router>
, document.getElementById('root'));
