import { combineReducers } from '@reduxjs/toolkit';
import countReducer from './counter/counterSlice';

const rootReducer = combineReducers({ questions: countReducer });

export default rootReducer;
