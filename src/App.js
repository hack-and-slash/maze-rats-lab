import React, { Component } from 'react';
import './App.css';
import Generator from './services/generator.js'
import PrettyPrintJson from './PrettyPrintJson.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <PrettyPrintJson data={(new Generator()).character()}/>
      </div>
    );
  }
}

export default App;
