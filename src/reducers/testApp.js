import { combineReducers } from "redux";
import orientation from './orientationReducer';
import rgb from './rgbReducer'
import hsl from './hslReducer'

let testApp = combineReducers({
    orientation,
    rgb,
    hsl
});
  
export default testApp;