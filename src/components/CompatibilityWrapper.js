import React from "react";
import OrientationReader from "./OrientationReader";

// Holds a component for checking orientation if it is possible to supply one,
// or a error message if it isn't possible.
const CompatibilityWrapper = () => 
  {
    if (window.DeviceOrientationEvent) {
      return (<OrientationReader></OrientationReader>)
    }
    return (<div>This device does not support orientation and will not work on this site.</div>);
  }
  
;

export default CompatibilityWrapper;
