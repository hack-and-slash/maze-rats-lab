import React, { Component } from 'react';
import './PrettyPrintJson.css'

class PrettyPrintJson extends Component {
    render() {
         return (<div className="pretty-json"><pre>{JSON.stringify(this.props.data, null, 2) }</pre></div>);
    }
}

export default PrettyPrintJson