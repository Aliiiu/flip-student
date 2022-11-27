import { createSlice, current } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface QuestionSummary {
	candidate_answer: string;
	question: string;
	question_image: string;
	options: [];
	question_no: string;
	type: string;
	_id: string;
	revise_later: boolean;
}
export interface CounterState {
	questions: QuestionSummary[];
}

let initialState: CounterState = {
	questions: [],
};

export const counterSlice = createSlice({
	name: 'questions',
	initialState,
	reducers: {
		questionAnswered: (state: CounterState, { payload }) => {
			state.questions = [...state.questions, payload];
		},
		revision: (state: CounterState, { payload }) => {
			// const currentState = JSON.parse(JSON.stringify(current(state)));
			// const questionIndex = currentState.questions.findIndex(
			// 	(q: any) => q.id === payload.id
			// );
			// currentState.questions[questionIndex] = payload;

			// console.log(typeof questionIndex);
			const questionIndex = state.questions.findIndex(
				(q: QuestionSummary) => q._id === payload._id
			);
			const currentState: QuestionSummary[] = [...state.questions];
			currentState[questionIndex] = payload;

			state.questions = currentState;
			// state.questions = [...state.questions, ...currentState.questions];
		},
		loadDefaultQuestionState: (state: CounterState, { payload }) => {
			state.questions = payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { questionAnswered, revision, loadDefaultQuestionState } =
	counterSlice.actions;

export default counterSlice.reducer;
