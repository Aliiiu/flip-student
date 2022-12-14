import { createSlice } from '@reduxjs/toolkit';

export interface TimerState {
	timer: string;
}

let initialState: TimerState = {
	timer: '',
};

export const timerSlice = createSlice({
	name: 'timer',
	initialState,
	reducers: {
		updateTimer: (state: TimerState, { payload }) => {
			state.timer = payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { updateTimer } = timerSlice.actions;

export default timerSlice.reducer;
