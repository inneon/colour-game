import React, { Component } from 'react';
import { connect } from "react-redux";
import './App.css';

import CompatibilityWrapper from './components/CompatibilityWrapper'

const round = (number, dp) => {
  const power = Math.pow(10, dp);
  return Math.round(number * power) / power;
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header" 
          style={{backgroundColor: 'rgb(' + this.props.red + ',' + this.props.green + ',' + this.props.blue + ')'}}>
          <CompatibilityWrapper/>
          <p>ABG: {round(this.props.alpha, 0)}, {round(this.props.beta, 0)}, {round(this.props.gamma, 0)}</p>
          <p>HSL: {round(this.props.hue, 2)}, {round(this.props.saturation, 2)}, {round(this.props.lightness, 2)}</p>
          <p>RGB: {round(this.props.red, 0)}, {round(this.props.green, 0)}, {round(this.props.blue, 0)}</p>
        </header>
      </div>
    );
  }

}

const mapStateToProps = state => (
  {
    red: state.rgb.red,
    green: state.rgb.green,
    blue: state.rgb.blue,
    hue: state.hsl.hue,
    saturation: state.hsl.saturation,
    lightness: state.hsl.lightness,
    alpha: state.orientation.alpha,
    beta: state.orientation.beta,
    gamma: state.orientation.gamma
  }
)

App = connect(mapStateToProps)(App);
export default App;
