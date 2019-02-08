import { Component } from "react";
import { connect } from "react-redux";
import newOrientation from '../actionCreators/newOrientationActionCreator'

// Non-rendering component that reads the orientation and puts it into the store.
class OrientationReader extends Component { 
  constructor(props){
    super(props);
    this.deviceOrientationListener = this.deviceOrientationListener.bind(this); 
  }

  render() {
    return null
  }

  componentDidMount(){
    window.addEventListener("deviceorientation", this.deviceOrientationListener); 
  }

  componentWillUnmount() {
      window.removeEventListener("deviceorientation", this.deviceOrientationListener)
  }

  deviceOrientationListener(event) {
    const { newOrientation } = this.props;
    newOrientation(event.alpha, event.beta, event.gamma);
  }
}

const mapStateToProps = state => ({
    alpha: state.orientation.alpha,
    beta: state.orientation.beta,
    gamma: state.orientation.gamma
});

OrientationReader = connect(
    mapStateToProps, 
    {newOrientation})(OrientationReader);

export default OrientationReader;
