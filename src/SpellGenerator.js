import React, { Component } from 'react';
import LangSelector from './components/LangSelector'
import './App.css';
import Generator from './services/generator.js'
import PrettyPrintJson from './PrettyPrintJson.js'

class SpellGenerator extends Component {
  render() {
    let searchParams = new URLSearchParams(this.props.params.location.search)
    let lang = searchParams.get("lang") || "en"
    return (
      <div className="App">
        <LangSelector />
        <PrettyPrintJson data={(new Generator(null, lang)).spell()}/>
      </div>
    );
  }
}

export default SpellGenerator;
