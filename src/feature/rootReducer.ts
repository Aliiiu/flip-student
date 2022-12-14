import { combineReducers } from '@reduxjs/toolkit';
import countReducer from './counter/counterSlice';
import timerReducer from './timer/timerSlice';

const rootReducer = combineReducers({
	questions: countReducer,
	timer: timerReducer,
});

export default rootReducer;
