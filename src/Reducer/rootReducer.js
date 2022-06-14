import { combineReducers } from "redux";
import counterReducer from './counterReducer';
import groupReducer from './groupReducer'
const rootReducer = combineReducers({
	counter: counterReducer,
	group: groupReducer,
})

export default rootReducer;